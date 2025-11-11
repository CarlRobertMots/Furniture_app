import { ThemeColors } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const IMAGE_CONTAINER_HEIGHT = height * 0.55;
const PADDING_HORIZONTAL = 20;

export default (colors: ThemeColors) =>
  StyleSheet.create({
    //Signup Page
    container: {
      flex: 1,
      alignContent: "center",
      backgroundColor: colors.background,
    },
    inputContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
      backgroundColor: colors.background,
    },
    input: {
      backgroundColor: colors.background,
      paddingVertical: 20,
      borderRadius: 10,
      borderWidth: 2,
      marginBottom: 15,
      color: colors.text,
      width: "80%",
      borderColor: colors.border,
      paddingHorizontal: 16,
    },

    signUpheaderText: {
      fontSize: 14,
      color: colors.primary,
      marginBottom: 12,
      alignItems: "flex-start",
      width: "80%",
    },

    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",

      borderColor: colors.border,
      borderRadius: 8,
    },

    eyeButton: {
      padding: 5,
    },

    // checkbox
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderRadius: 4,
      marginRight: 10,
      borderColor: colors.secondary,
    },
    checked: {
      backgroundColor: colors.secondary,
    },
    checkboxText: {
      fontSize: 16,
      color: colors.text,
    },

    // Divider
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.secondary,
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 14,
    },

    // Google SignUp button
    googleButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15,
      alignItems: "center",
      width: "40%",
    },

    bottomText: {
      fontSize: 14,
      color: colors.secondary,
      textAlign: "center",
    },
    // Splashscreen aka index
    Splashcontainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 15,
      alignItems: "center",
      width: "80%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    signupButton: {
      borderColor: colors.primary,
      borderWidth: 2,
      backgroundColor: colors.background,
    },
    signUpText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    slogan: {
      fontSize: 40,
      color: colors.text,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
    },
    // Home page

    homeContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      height: 60,
      marginLeft: 12,
    },
    buttonContainer: {
      flexDirection: "column",
      alignItems: "center",
      marginRight: 20,
    },
    filterIconImage: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
    filterButton: {
      backgroundColor: colors.background,
      width: 50,
      height: 50,
      padding: 12,
      borderRadius: 10,
      marginBottom: 4,
      alignItems: "center",
      justifyContent: "center",
    },

    filterButtonText: {
      color: colors.primary,
      marginTop: 4,
      fontWeight: "500",
      textAlign: "center",
    },

    productContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
    },

    product: {
      width: "48%",
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 20,
    },
    productInfo: {
      alignContent: "flex-start",
      width: "100%",
      paddingHorizontal: 16,
    },
    productNameText: {
      fontSize: 16,
      color: colors.primary,
    },

    productPriceText: {
      fontWeight: "bold",
      fontSize: 14,
      color: colors.secondary,
    },
    productImageThumbnail: {
      height: 180,
      width: "100%",
      marginBottom: 20,
      resizeMode: "cover",
      borderRadius: 12,
    },
    // Product Detailed view
    productDetailContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    productDetail: {
      width: "100%",
      height: IMAGE_CONTAINER_HEIGHT,
      position: "relative",
    },
    imageScrollView: {
      width: width,
      height: IMAGE_CONTAINER_HEIGHT,
    },
    carouselImage: {
      width: width,
      height: IMAGE_CONTAINER_HEIGHT,
      resizeMode: "cover",
    },
    pageHeader: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingVertical: 15,
      backgroundColor: colors.background,
    },
    // Back Button
    backButton: {
      position: "absolute",
      top: 40,
      left: 20,
      zIndex: 10,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 10,
      width: 45,
      height: 45,

      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    // Pagination
    paginationContainer: {
      position: "absolute",
      bottom: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      zIndex: 5,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: "#000",
      width: 25,
    },
    inactiveDot: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },

    contentScrollView: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      paddingBottom: 40,
      flex: 1,
    },
    productName: {
      fontSize: 28,
      fontWeight: "600",
      marginBottom: 10,
      color: colors.text,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    currencySymbol: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.secondary,
      marginRight: 2,
    },
    productPrice: {
      fontSize: 40,
      fontWeight: "bold",
      color: colors.secondary,
      lineHeight: 40,
    },
    productDescription: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
    },

    // Action Buttons Footer
    actionButtonFooter: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#eee",
    },
    bookmarkButton: {
      backgroundColor: "#eee",
      borderRadius: 10,
      padding: 12,
      marginRight: 16,
    },
    contactButton: {
      flex: 1,
      backgroundColor: "#607d8b",
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    contactButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    // Profile
    profileContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 50,
    },
    profileHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: PADDING_HORIZONTAL,
      paddingBottom: 30,
    },
    profileName: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
    },
    profileEmail: {
      fontSize: 16,
      color: colors.secondary,
      marginTop: 4,
    },
    profileLinksSection: {
      marginHorizontal: PADDING_HORIZONTAL,
      marginBottom: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      elevation: 1,
    },
    profileLinkItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    profileLinkIcon: {
      marginRight: 15,
    },
    profileLinkTextContainer: {
      flex: 1,
    },
    profileLinkTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    profileLinkSubtitle: {
      fontSize: 12,
      color: "#666",
      marginTop: 2,
    },
    profileAddListingButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      marginHorizontal: PADDING_HORIZONTAL,
      marginTop: 20,
    },
    profileAddListingButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    profileLogoutLink: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: PADDING_HORIZONTAL + 15,
      marginTop: 30,
    },

    // Settings
    settingsSection: {
      marginHorizontal: PADDING_HORIZONTAL,
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      elevation: 1,
    },
    settingsSectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 10,
    },
    settingsSectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    settingsInfoBlock: {
      marginBottom: 10,
      paddingVertical: 8,
    },
    settingsInfoLabel: {
      fontSize: 12,
      color: colors.secondary,
      fontWeight: "500",
    },
    settingsInfoValue: {
      fontSize: 16,
      color: colors.text,
      marginTop: 2,
    },
    settingsLinkItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    settingsLinkText: {
      flex: 1,
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
    },

    // Listings
    listingItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 10,
      marginHorizontal: PADDING_HORIZONTAL,
      padding: 10,
      marginBottom: 12,
      elevation: 1,
    },
    listingThumbnail: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
      resizeMode: "cover",
    },
    listingInfo: {
      flex: 1,
      justifyContent: "center",
    },
    listingTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    listingPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
      marginTop: 4,
    },
    listingDeleteButton: {
      padding: 8,
    },

    // Create product
    createProductHeader: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
      color: colors.text,
      textAlign: "center",
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    createProductLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 5,
      marginTop: 15,
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    createProductInput: {
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#ddd",
      color: colors.text,
      marginHorizontal: PADDING_HORIZONTAL,
    },
    createProductTextArea: {
      height: 100,
      textAlignVertical: "top",
    },
    createProductDropdown: {
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      marginBottom: 10,
      marginHorizontal: PADDING_HORIZONTAL,
    },
    createProductCategoryList: {
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      marginTop: 5,
      marginHorizontal: PADDING_HORIZONTAL,
    },
    createProductCategoryItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    createProductButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: PADDING_HORIZONTAL,
    },
    createProductButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
    },
    createProductErrorText: {
      color: colors.primary,
      textAlign: "center",
      marginTop: 10,
      fontWeight: "500",
    },
    createProductImagePlaceholder: {
      borderRadius: 10,
      borderWidth: 1.5,
      borderStyle: "dashed",
      left: 20,

      borderColor: colors.border,
      backgroundColor: colors.background,

      justifyContent: "center",
      alignItems: "center",
    },
    // NEW UTILITY STYLES
    fullScreenCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    dropdownText: {
      // Used in createProduct.tsx
      fontSize: 16,
      color: colors.text,
    },
    // Settings page
    settingsContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    settingsHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      paddingTop: 40,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingsbackButton: {
      paddingRight: 10,
    },
    settingsTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      flex: 1,
      textAlign: "center",
      paddingRight: 34,
    },
    infoSectionContainer: {
      marginHorizontal: PADDING_HORIZONTAL,
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      elevation: 1,
    },
    infoSectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
      paddingBottom: 5,
    },
    infoSectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    settingsInputGroup: {
      marginBottom: 20,
    },
    settingsLabel: {
      fontSize: 14,
      color: colors.secondary,
      marginBottom: 4,
    },
    settingsInputValue: {
      fontSize: 16,
      color: colors.text,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    editableInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingsInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      paddingVertical: 5,
    },
    saveButton: {
      paddingLeft: 10,
      paddingRight: 5,
    },
    helpLinkItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    helpLinkText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      color: colors.text,
      marginTop: 10,
    },
  });
