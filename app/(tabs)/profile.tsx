import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { getMyProducts } from "@/api";
import { getProfile, logout } from "@/api/authService";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

interface ProfileLink {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  path?: string;
  action?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsProfileLoading(true);
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        setUser(null);
        router.replace("/signIn");
      } finally {
        setIsProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const fetchListingCount = useCallback(async () => {
    if (!user) return;
    setIsLoadingCount(true);
    try {
      const products = await getMyProducts();
      setListingCount(products.length);
    } catch (error) {
      setListingCount(0);
    } finally {
      setIsLoadingCount(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchListingCount();
    }
  }, [user, fetchListingCount]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          setUser(null);
          router.replace("/signIn");
        },
        style: "destructive",
      },
    ]);
  };

  const handleAddListing = () => {
    router.push("/createProduct");
  };

  const profileLinks: ProfileLink[] = [
    {
      title: "My Listings",
      subtitle: isLoadingCount
        ? "Loading your items..."
        : listingCount !== null
        ? `Selling ${listingCount} item${listingCount === 1 ? "" : "s"}`
        : "Check your listings",
      icon: "view-list-outline",
      path: "/product/my-listings",
    },
    {
      title: "Settings",
      subtitle: "Personal info, Contact, Security",
      icon: "cog-outline",
      path: "/settings",
    },
  ];

  if (isProfileLoading) {
    return (
      <View
        style={[
          styles.profileContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.secondary, marginTop: 10 }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <View>
          <Text style={styles.profileName}>{user?.name || "Guest User"}</Text>
          <Text style={styles.profileEmail}>{user?.email || "N/A"}</Text>
        </View>
        <Pressable onPress={() => router.push("/settings")}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <View style={styles.profileLinksSection}>
        {profileLinks.map((link) => (
          <Pressable
            key={link.title}
            style={styles.profileLinkItem}
            onPress={() =>
              link.path ? router.push(link.path as any) : link.action?.()
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

      <Pressable
        style={styles.profileAddListingButton}
        onPress={handleAddListing}
      >
        <Text style={styles.profileAddListingButtonText}>
          Add a new listing
        </Text>
      </Pressable>

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
