import React from "react";
import { useRouter } from "expo-router";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);

  const products = [
    { id: 1, name: "Coffee Chair", category: "chairs", price: 49.99 },
    { id: 2, name: "Coffee Table ", category: "tables", price: 50.99 },
    { id: 3, name: "Black Lamp", category: "popular", price: 15.99 },
    { id: 4, name: "Minimal Stand", category: "popular", price: 59.99 },
  ];

  const [displayedProducts, setDisplayedProducts] = useState(products);

  const handlePress = (category: string) => {
    setDisplayedProducts(products.filter((p) => p.category === category));
  };
  const showPopular = () => {
    setDisplayedProducts(products.filter((p) => p.category === "popular"));
  };

  return (
    <View style={styles.homeContainer}>
      {/* Search bar*/}
      <View style={styles.searchContainer}>
        <Image
          source={require("@/assets/images/Search.png")}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
        <Text style={{ flex: 1, textAlign: "center", fontWeight: "500" }}>
          Find All You Need
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 20,
        }}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("popular")}
            style={({ pressed }) => [
              styles.filterButton,
              pressed && { backgroundColor: colors.secondary },
            ]}
          >
            <Image
              source={require("@/assets/images/Star.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.buttonText}>Popular</Text>
        </View>
      </ScrollView>
    </View>
  );
}
