import React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/api/authService";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

export const unstable_settings = {
  initialRouteName: "settings",
};

export const options = {
  headerShown: false,
};

export default function SettingsScreen() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await getProfile();
        setUserName(profileData.name);
        setUserEmail(profileData.email);
      } catch (error) {
        console.error("Failed to fetch user profile in settings:", error);
        Alert.alert("Error", "Could not load profile data.");
        router.replace("/signIn");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveName = async () => {
    if (!userName.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }
    setIsEditingName(false);

    try {
      await updateProfile({ name: userName });
      Alert.alert("Success", "Name updated successfully!");
    } catch (error) {
      console.error("Failed to update name:", error);
      Alert.alert("Error", "Failed to update name. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.settingsContainer}>
      {/* Header */}
      <View style={styles.settingsHeader}>
        <Pressable
          onPress={() => router.back()}
          style={styles.settingsbackButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text}
          />
        </Pressable>
        <Text style={styles.settingsTitle}>Settings</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.infoSectionContainer}>
        <View style={styles.infoSectionHeader}>
          <Text style={styles.infoSectionTitle}>Personal Information</Text>
          <Pressable onPress={() => setIsEditingName(true)}>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.settingsInputGroup}>
          <Text style={styles.settingsLabel}>Name</Text>
          {isEditingName ? (
            <View style={styles.editableInputContainer}>
              <TextInput
                style={styles.settingsInput}
                value={userName}
                onChangeText={setUserName}
                onBlur={handleSaveName}
                autoFocus={true}
              />
              <Pressable onPress={handleSaveName} style={styles.saveButton}>
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => setIsEditingName(true)}>
              <Text style={styles.settingsInputValue}>{userName}</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.settingsInputGroup}>
          <Text style={styles.settingsLabel}>Email</Text>
          <Text style={styles.settingsInputValue}>{userEmail}</Text>
        </View>
      </View>

      {/* Help Center Section */}
      <View style={styles.infoSectionContainer}>
        <Text style={styles.infoSectionTitle}>Help Center</Text>

        <Pressable style={styles.helpLinkItem}>
          <Text style={styles.helpLinkText}>FAQ</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.secondary}
          />
        </Pressable>
        <Pressable style={styles.helpLinkItem}>
          <Text style={styles.helpLinkText}>Contact Us</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.secondary}
          />
        </Pressable>
        <Pressable style={styles.helpLinkItem}>
          <Text style={styles.helpLinkText}>Privacy & Terms</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.secondary}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}
