import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"; // Added Ionicons for clarity
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { getFavourites, removeFavourite, ProductType } from "@/api";
import { useRouter } from "expo-router"; // Added useRouter to navigate to product details

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

const FavoriteItem = ({
  item,
  onRemove,
}: {
  item: ProductType;
  onRemove: (id: string) => void;
}) => {
  const router = useRouter();

  // Navigate to product detail on press
  const handlePress = () => {
    router.push(`../product/${item._id}`);
  };

  return (
    <Pressable style={styles.listingItem} onPress={handlePress}>
      <Image
        source={{
          uri:
            item.images[0] ||
            "https://placehold.co/80x80/6B8E23/FFFFFF?text=CT",
        }}
        style={styles.listingThumbnail}
      />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle}>{item.name}</Text>
        <Text style={styles.listingPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Pressable
        style={styles.listingDeleteButton}
        onPress={() => onRemove(item._id)}
        accessibilityLabel="Remove from favorites"
      >
        {/* Changed to heart-minus to indicate removal from favorites */}
        <MaterialCommunityIcons
          name="heart-minus-outline"
          size={24}
          color={colors.secondary}
        />
      </Pressable>
    </Pressable>
  );
};

export default function FavouritesScreen() {
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using the live getFavourites call from '@/api'
      const data = await getFavourites();
      setFavorites(data);
    } catch (err: any) {
      // Error handling for when the API call fails
      setError(
        err.message || "Could not load your favorites. Check server connection."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const handleRemoveFavorite = async (productId: string) => {
    try {
      // Using the live removeFavourite call from '@/api'
      await removeFavourite(productId);
      setFavorites((prev) => prev.filter((p) => p._id !== productId));
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.message || "Failed to remove favorite. Check login status."
      );
      fetchFavorites(); // Refresh in case of failure
    }
  };

  if (isLoading) {
    return (
      <View style={styles.fullScreenCenter}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.secondary, marginTop: 10 }}>
          Loading favorites...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text style={{ color: colors.primary, margin: 20 }}>{error}</Text>
        <Pressable onPress={fetchFavorites}>
          <Text
            style={{ color: colors.primary, marginTop: 10, fontWeight: "bold" }}
          >
            Retry Loading
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.fullScreenCenter}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={60}
            color={colors.secondary}
          />
          <Text style={{ ...styles.listingTitle, marginTop: 20 }}>
            Your favorites list is empty.
          </Text>
          <Text style={{ color: colors.secondary, marginTop: 5 }}>
            Explore the marketplace to find items you love!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FavoriteItem item={item} onRemove={handleRemoveFavorite} />
          )}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 0 }}
        />
      )}
    </View>
  );
}
