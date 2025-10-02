import React, { useState } from "react";
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

export default function SignUp() {
  const router = useRouter();
  const colors = Colors.light; // Colors.dark for dark mode
  const styles = createStyles(colors);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const handleSignIn = () => {
    if (!termsAccepted) {
      Alert.alert("Error", "You must accept the Terms and Service.");
      return;
    }
    Alert.alert("Success", "Account created!");
    router.replace({ pathname: "/(tabs)/home" });
  };

  const handleGoogleSignUp = () => {
    Alert.alert("Google Sign Up", "Google login clicked");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Name */}
        <Text style={styles.signUpheaderText}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={colors.placeholder}
          value={name}
          onChangeText={setName}
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
              tintColor="colors.primary"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Sign in button */}
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
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
          onPress={handleGoogleSignUp}
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
          onPress={() => router.push("/signIn")}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}
