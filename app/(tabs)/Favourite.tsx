import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

// Mock data matching the design image
const mockFavorites = [
  {
    id: "1",
    name: "Coffee Table",
    price: 50.0,
    imageUrl: "https://placehold.co/80x80/6B8E23/FFFFFF?text=CT",
  },
  {
    id: "2",
    name: "Coffee Chair",
    price: 20.0,
    imageUrl: "https://placehold.co/80x80/A0522D/FFFFFF?text=CC",
  },
  {
    id: "3",
    name: "Minimal Stand",
    price: 25.0,
    imageUrl: "https://placehold.co/80x80/333/FFFFFF?text=MS",
  },
  {
    id: "4",
    name: "Minimal Desk",
    price: 50.0,
    imageUrl: "https://placehold.co/80x80/6B8E23/FFFFFF?text=MD",
  },
  {
    id: "5",
    name: "Minimal Lamp",
    price: 12.0,
    imageUrl: "https://placehold.co/80x80/A0522D/FFFFFF?text=ML",
  },
];

export default function FavouritesScreen() {
  const router = useRouter();

  const renderFavoriteItem = ({
    item,
  }: {
    item: (typeof mockFavorites)[0];
  }) => (
    <Pressable
      style={styles.listingItem} // Reusing the style from MyListings
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.listingThumbnail} />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle}>{item.name}</Text>
        <Text style={styles.listingPrice}>${item.price.toFixed(2)}</Text>
      </View>
      {/* Close/Remove from favorites button */}
      <Pressable
        style={styles.listingDeleteButton}
        onPress={() => console.log(`Remove ${item.name} from favorites`)}
      >
        <MaterialCommunityIcons
          name="close"
          size={24}
          color={colors.secondary}
        />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text>Favorites</Text>

      <FlatList
        data={mockFavorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
