import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "./styles";

export default function SplashScreen() {
  const router = useRouter();

  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);

  return (
    <View style={styles.Splashcontainer}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={{ width: "90%", height: 250, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.slogan}>
        <Text style={{ color: colors.accent }}>Everything</Text> You Will Ever
        Need!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/signIn" })}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/signUp")}
      >
        <Text style={[styles.signUpText]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
