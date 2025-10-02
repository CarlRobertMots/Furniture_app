/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const midnightBlue = "#272757";
const palette = {
  lightBlue: "#8686AC",
  darkBlue: "#505081",
  navy: "#0F0E47",
};
export interface ThemeColors {
  background: string;
  text: string;
  accent: string;
  primary: string;
  secondary: string;
  border: string;
  placeholder: string;
}

export const Colors = {
  light: {
    background: "#FFFFFF",
    text: "#11181C",
    primary: "#272757", // Midnight Blue
    secondary: "#8686AC",
    accent: "#505081",
    buttonText: "#FFFFFF",
    placeholder: "#888888",
    border: "#CCCCCC",
  } as ThemeColors,
  dark: {
    background: "#151718",
    text: "#ECEDEE",
    primary: "#272757",
    secondary: "#505081",
    accent: "#8686AC",
    buttonText: "#FFFFFF",
    placeholder: "#AAAAAA",
    border: "#333333",
  } as ThemeColors,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
