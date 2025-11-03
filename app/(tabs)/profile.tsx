import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { getMyProducts } from "@/api/productService";
// NOTE: You must replace this MOCK with your actual AuthContext hook
// import { useAuth } from "@/context/AuthContext";

// --- MOCK for dependencies ---
const useAuth = () => ({
  user: { id: "mockId123", name: "Elina Hovakimyan", email: "hello@gmail.com" },
  logout: () => {
    Alert.alert("Logged Out", "Mock logout successful.");
    // router.replace('/login'); // Uncomment for real implementation
  },
});
// Get styles using the imported theme
const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);
// --- END MOCK ---

interface ProfileLink {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  path?: string;
  action?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  // Function to fetch the number of products listed by the current user
  const fetchListingCount = useCallback(async () => {
    if (!user) return;
    setIsLoadingCount(true);
    try {
      // This relies on the getMyProducts service function we added earlier
      const products = await getMyProducts();
      setListingCount(products.length);
    } catch (error) {
      console.error("Could not fetch listing count.");
      setListingCount(0); // Assume 0 on error or if user is mock/not fully logged in
    } finally {
      setIsLoadingCount(false);
    }
  }, [user]);

  useEffect(() => {
    fetchListingCount();
  }, [fetchListingCount]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  // Navigation links for the main profile section
  const profileLinks: ProfileLink[] = [
    {
      title: "My Listings",
      subtitle: isLoadingCount
        ? "Loading your items..."
        : listingCount !== null
        ? `Selling ${listingCount} item${listingCount === 1 ? "" : "s"}`
        : "Check your listings",
      icon: "view-list-outline",
      path: "/my-listings",
    },
    {
      title: "Settings",
      subtitle: "Personal info, Contact, Security",
      icon: "cog-outline",
      path: "/settings",
    },
  ];

  return (
    <View style={styles.profileContainer}>
      {/* Header / User Info */}
      <View style={styles.profileHeader}>
        <View>
          <Text style={styles.profileName}>{user?.name || "Guest User"}</Text>
          <Text style={styles.profileEmail}>{user?.email || "N/A"}</Text>
        </View>
        {/* Edit Icon for profile info, links to settings */}
        <Pressable onPress={() => router.push("/settings")}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={colors.primary}
          />
        </Pressable>
      </View>

      {/* Links Section */}
      <View style={styles.profileLinksSection}>
        {profileLinks.map((link) => (
          <Pressable
            key={link.title}
            style={styles.profileLinkItem}
            onPress={() =>
              link.path
                ? router.push(link.path as `/${string}`)
                : link.action?.()
            }
          >
            <MaterialCommunityIcons
              name={link.icon}
              size={24}
              color={colors.text}
              style={styles.profileLinkIcon}
            />
            <View style={styles.profileLinkTextContainer}>
              <Text style={styles.profileLinkTitle}>{link.title}</Text>
              <Text style={styles.profileLinkSubtitle}>{link.subtitle}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.secondary}
            />
          </Pressable>
        ))}
      </View>

      {/* Add New Listing Button */}
      <Pressable
        style={styles.profileAddListingButton}
        onPress={() => router.push("/create-product")}
      >
        <Text style={styles.profileAddListingButtonText}>
          Add a new listing
        </Text>
      </Pressable>

      {/* Logout Link */}
      <Pressable style={styles.profileLogoutLink} onPress={handleLogout}>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color={colors.primary}
          style={styles.profileLinkIcon}
        />
        <Text style={[styles.profileLinkTitle, { color: colors.primary }]}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
