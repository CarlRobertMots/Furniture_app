import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Platform } from "react-native";
import "react-native-reanimated";
import CustomHeader from "@/components/CustomHeader";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
          paddingTop: Platform.OS === "android" ? 0 : 0,
        }}
      >
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={
            isDark ? Colors.dark.background : Colors.light.background
          }
          translucent={false}
        />
        <Stack
          screenOptions={{
            animation: "fade", // or "fade"
            // if using custom headers
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="signUp"
            options={{
              header: () => <CustomHeader title="Create Account" />,
            }}
          />
          <Stack.Screen
            name="signIn"
            options={{
              header: () => <CustomHeader title="Log in" />,
            }}
          />
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
