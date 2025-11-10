import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductType } from "@/api/productService";
import { getMyProducts, deleteProduct } from "@/api";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

const ListingItem = ({
  product,
  onDelete,
}: {
  product: ProductType;
  onDelete: (id: string) => void;
}) => {
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

  return (
    <View style={styles.listingItem}>
      <Image
        source={{ uri: product.images[0] || "https://placehold.co/80x80" }}
        style={styles.listingThumbnail}
      />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.listingPrice}>${product.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.listingDeleteButton}
        onPress={handleDeleteConfirmation}
        accessibilityLabel={`Delete ${product.name}`}
      >
        <Feather name="trash-2" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default function MyListingsScreen() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyProducts();
      setProducts(data);
    } catch (err) {
      setError(
        "Could not load your listings. Please ensure you are logged in."
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
      return () => {};
    }, [])
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (err) {
      Alert.alert(
        "Deletion Failed",
        "There was an error deleting the product. Check login/permissions."
      );
    }
  };

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
        <Text style={{ color: colors.primary }}>{error}</Text>
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
      <Stack.Screen options={{ title: "My Listings" }} />
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
