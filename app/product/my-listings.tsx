import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable, // Import Pressable for navigation
} from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router"; // Import useRouter
import { Feather } from "@expo/vector-icons";
import { ProductType } from "@/api/productService";
import { getMyProducts, deleteProduct } from "@/api";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

export const options = {
  headerShown: false,
};

// --- Listing Item Component ---
const ListingItem = ({
  product,
  onDelete,
}: {
  product: ProductType;
  onDelete: (id: string) => void;
}) => {
  const router = useRouter();

  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(product._id),
        },
      ],
      { cancelable: true }
    );
  };

  const handlePress = () => {
    // Navigate to the product detail screen for editing/viewing
    router.push(`/product/${product._id}`);
  };

  return (
    // Use Pressable to allow tapping the listing to view details
    <Pressable style={styles.listingItem} onPress={handlePress}>
      <Image
        // Updated placeholder for better visibility
        source={{
          uri:
            product.images[0] ||
            "https://placehold.co/80x80/D3D3D3/000000?text=NO+IMG",
        }}
        style={styles.listingThumbnail}
      />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.listingPrice}>${product.price.toFixed(2)}</Text>
        {/* Optional: Add Sold/Active status text here */}
      </View>
      <TouchableOpacity
        style={styles.listingDeleteButton}
        onPress={handleDeleteConfirmation}
        accessibilityLabel={`Delete ${product.name}`}
      >
        <Feather name="trash-2" size={20} color={colors.primary} />
      </TouchableOpacity>
    </Pressable>
  );
};

// --- My Listings Screen Component ---
export default function MyListingsScreen() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyProducts();
      setProducts(data);
    } catch (err: any) {
      setError(
        err.message ||
          "Could not load your listings. Please ensure you are logged in."
      );
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means it's created once

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
      // Cleanup function is not strictly needed for this simple fetch,
      // but is kept for pattern completeness: return () => {};
    }, [fetchMyProducts]) // Depend on fetchMyProducts to avoid infinite loop
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      // Optimistic update: remove item from state immediately
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
      Alert.alert("Success", "Product successfully deleted.");
    } catch (err) {
      Alert.alert(
        "Deletion Failed",
        "There was an error deleting the product. Check login/permissions."
      );
      // Re-fetch data in case the local state is out of sync after a failure
      fetchMyProducts();
    }
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <View style={styles.fullScreenCenter}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text style={{ color: colors.primary, marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity onPress={fetchMyProducts} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text style={styles.listingTitle}>You have no products listed.</Text>
        <Text style={{ color: colors.secondary, marginTop: 10 }}>
          Go to the 'Sell' tab to add your first item!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>My Listings</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ListingItem product={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
