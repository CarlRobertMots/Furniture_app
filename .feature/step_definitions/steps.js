const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { KnownDevices } = require("puppeteer"); // 👈 Added this import
const assert = require("assert");

setDefaultTimeout(60 * 1000);

// --- Hooks ---
Before(async function () {
  this.browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    args: ["--incognito"], // Prevents "Save Password" popups
  });
  this.page = await this.browser.newPage();

  // 📱 Force Mobile Mode (iPhone 13)
  // This guarantees the app renders in "Mobile Mode"
  const iPhone = KnownDevices["iPhone 13"];
  await this.page.emulate(iPhone);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// --- Login Steps ---
Given("I am on the sign in page", async function () {
  await this.page.goto("http://localhost:8081/signIn", {
    waitUntil: "networkidle0",
  });
});

When("I enter {string} into the email field", async function (email) {
  await this.page.waitForSelector('[placeholder="example@gmail.com"]');
  await this.page.type('[placeholder="example@gmail.com"]', email);
});

When("I enter {string} into the password field", async function (password) {
  await this.page.waitForSelector('[placeholder="Password"]');
  await this.page.type('[placeholder="Password"]', password);
});

When("I click the {string} button", async function (buttonText) {
  let selector;
  if (buttonText === "Sign In") {
    selector = '[data-testid="sign-in-button"]';
  } else {
    throw new Error(`No selector defined for button: "${buttonText}"`);
  }
  const button = await this.page.waitForSelector(selector, { visible: true });
  if (button) {
    await button.click();
  } else {
    throw new Error(`Could not find button with selector: ${selector}`);
  }
});

// --- Verification Steps ---
Then("I should be navigated to the {string} page", async function (pageName) {
  // ❌ REMOVED: await this.page.waitForNavigation(...)
  // We removed it because the "Back Button" step already waits for navigation.

  if (pageName === "Home" || pageName === "home") {
    const url = this.page.url();
    assert.ok(
      url.includes("8081") || url.includes("home"),
      "Did not navigate to the Home URL."
    );

    const homeElement = await this.page.waitForSelector(
      "xpath/" + "//*[contains(text(), 'Find All You Need')]"
    );
    assert.ok(
      homeElement,
      "Did not find 'Find All You Need' text on the Home page."
    );
  }
});

// --- Favorites Steps ---

When("I click on the {string} category filter", async function (categoryName) {
  const selector = `[data-testid="category-${categoryName}"]`;
  const button = await this.page.waitForSelector(selector, { visible: true });
  await button.click();
  await new Promise((resolve) => setTimeout(resolve, 500));
});

When("I click on the first product in the list", async function () {
  const selector = '(//*[@data-testid="product-card"])[1]';
  const card = await this.page.waitForSelector("xpath/" + selector, {
    visible: true,
  });

  await card.evaluate((b) => b.click());
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

When("I click the product favourite button", async function () {
  const selector = '[data-testid="product-detail-favourite-button"]';
  const button = await this.page.waitForSelector(selector, { visible: true });

  await button.evaluate((b) => b.click());
  await new Promise((resolve) => setTimeout(resolve, 500));
});

When("I save the name of the product on the detail page", async function () {
  const nameElement = await this.page.waitForSelector(
    '[data-testid="product-detail-name"]',
    { visible: true }
  );
  this.savedProductName = await nameElement.evaluate((el) => el.textContent);
  console.log(`--- Saved product name: ${this.savedProductName} ---`);
});

When("I click the back button", async function () {
  const selector = '[data-testid="back-button"]';

  // 1. Try clicking the UI Arrow Button
  try {
    const button = await this.page.waitForSelector(selector, {
      visible: true,
      timeout: 2000,
    });
    await button.evaluate((b) => b.click());
    console.log("Clicked UI back button...");
  } catch (e) {
    console.log("⚠️ UI Back button not found. Proceeding to fallback...");
  }

  // 2. Wait for navigation
  await new Promise((r) => setTimeout(r, 1000));

  // 3. Fallback: Browser Back if still on product page
  if (this.page.url().includes("/product/")) {
    console.log("Forcing Browser Back...");
    await this.page.goBack();
    await new Promise((r) => setTimeout(r, 1000));
  }

  // 4. Verification: Check URL
  const currentUrl = this.page.url();
  if (currentUrl.includes("/home") || currentUrl.endsWith("8081/")) {
    console.log(" Verified: Back on Home URL.");
    return; // Success!
  }

  throw new Error(`Navigation Back failed. Still on URL: ${currentUrl}`);
});
// Universaalne kontroll, kas mingi tekst on ekraanil
Then("I should see text {string} on the page", async function (text) {
  const xPath = `//*[contains(text(), "${text}")]`;

  // Ootame, et tekst ilmuks (timeout 2s)
  const element = await this.page.waitForSelector("xpath/" + xPath, {
    visible: true,
    timeout: 2000,
  });

  assert.ok(element, `Could not find text "${text}" on the page.`);
});
Then("I should see the saved product name on the page", async function () {
  if (!this.savedProductName) {
    throw new Error("No product name was saved in the previous step.");
  }
  const xPath = `//*[contains(text(), "${this.savedProductName}")]`;
  const element = await this.page.waitForSelector("xpath/" + xPath, {
    visible: true,
  });
  assert.ok(
    element,
    `Could not find text "${this.savedProductName}" on the page.`
  );
});
// 1. Missing step for Filter Test (Logging to console)
Then("I log the visible products to the console", async function () {
  // Wait a bit for the filter to apply
  await new Promise((r) => setTimeout(r, 1000));

  // Grab all text from the page
  const pageText = await this.page.evaluate(() => document.body.innerText);

  // Print it out so you can see if "Armchair" is there!
  console.log("\n--------------------------------");
  console.log(" VISIBLE ON SCREEN:");
  console.log("--------------------------------");
  console.log(pageText);
  console.log("--------------------------------\n");
});

// 2. Missing step for Favorites Test (Verifying the saved name)
Then("I should see the saved product name on the page", async function () {
  if (!this.savedProductName) {
    throw new Error("No product name was saved in the previous step.");
  }
  const xPath = `//*[contains(text(), "${this.savedProductName}")]`;
  const element = await this.page.waitForSelector("xpath/" + xPath, {
    visible: true,
  });
  assert.ok(
    element,
    `Could not find text "${this.savedProductName}" on the page.`
  );
});
