import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import createStyles from "./styles";
import { Colors } from "@/constants/theme";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const router = useRouter();
  const colors = Colors.light; // Colors.dark for dark mode
  const styles = createStyles(colors);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  // Google Sign-In
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    webClientId:
      "Y808420482499-6dnqcoda1qdmu1640j6ibhjud25moaeb.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      scheme: "furnitureapp", // match your app.json "scheme"
    }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google Access Token:", authentication?.accessToken);
      // Optionally, fetch user info from Google API here
      Alert.alert("Success", "Signed in with Google!");
      router.push("/(tabs)/home");
    }
  }, [response]);

  const handleSignIn = () => {
    console.log("Email sign in pressed");
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Email */}
        <Text style={styles.signUpheaderText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password with eye icon */}
        <Text style={styles.signUpheaderText}>Password</Text>
        <View style={[styles.passwordContainer, { width: "80%" }]}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={isPasswordSecure}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 16,
              padding: 5,
            }}
            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
          >
            <Image
              source={require("@/assets/images/eye.png")}
              style={{ width: 24, height: 24 }}
              tintColor={colors.primary}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Sign in button */}
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>

      {/* Google button */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.googleButton}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Image
            source={require("@/assets/images/GoogleIcon.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Text */}
      <Text style={styles.bottomText}>
        Don't have an account?{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={() => router.push("/signUp")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
}
