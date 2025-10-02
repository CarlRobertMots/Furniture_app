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

  const handleSignUp = () => {
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
