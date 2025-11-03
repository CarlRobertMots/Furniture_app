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
import { registerUser } from "@/api/authService";

export default function SignUp() {
  const router = useRouter();
  const colors = Colors.light; // Colors.dark for dark mode
  const styles = createStyles(colors);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    // 1. Client-side validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms and Service.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const userData = { name, email, password };
      //  Call the backend API
      const response = await registerUser(userData);

      Alert.alert(
        "Success",
        `Account created successfully for ${response.user.name}!`
      );
      router.replace("/(tabs)/home");
    } catch (err: any) {
      console.error("Registration Error:", err);

      // Handle errors from the backend or network
      let errorMessage =
        "Network Error: Cannot connect to server. Is your backend running?";

      if (err.response && err.response.data && err.response.data.message) {
        // Handle common HTTP error messages (like 'User already exists')
        errorMessage = err.response.data.message;
      } else if (
        err.message &&
        err.message.includes("Password must be at least 8 characters long")
      ) {
        // NEW: Handle Mongoose validation errors directly
        errorMessage = "Password must be at least 8 characters long.";
      } else if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.errors
      ) {
        // NEW: Handle Mongoose validation errors if passed via 400 status
        // This attempts to extract the first validation message (e.g., password, email format)
        const validationErrors = err.response.data.errors;
        const firstKey = Object.keys(validationErrors)[0];
        errorMessage =
          validationErrors[firstKey].message ||
          `Validation failed for ${firstKey}.`;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    Alert.alert("Google Sign Up", "Google sign-up logic not yet implemented.");
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
          keyboardType="default"
        />

        {/* Email */}
        <Text style={styles.signUpheaderText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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

        {/* Terms and service */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checked]}>
            {termsAccepted && (
              <MaterialCommunityIcons name="check" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the Terms and Service
          </Text>
        </TouchableOpacity>
        {/* Error Display */}
        {error ? (
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              marginVertical: 10,
              width: "80%",
            }}
          >
            {error}
          </Text>
        ) : null}
        {/* Sign Up button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or sign up with</Text>
        <View style={styles.line} />
      </View>

      {/* Google button */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("@/assets/images/GoogleIcon.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Text */}
      <Text style={styles.bottomText}>
        Already have an account?{" "}
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
