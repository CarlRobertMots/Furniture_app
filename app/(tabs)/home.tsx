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

  const showPopular = () => {
    setDisplayedProducts(products.filter((p) => p.category === "popular"));
  };
  const [activeCategory, setActiveCategory] = useState<string>("popular");

  const handlePress = (category: string) => {
    setActiveCategory(category);
    setDisplayedProducts(products.filter((p) => p.category === category));
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
      {/* Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 20,
        }}
        style={{ maxHeight: 120 }}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("popular")}
            style={() => [
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "popular" ? colors.secondary : "white",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Star.png")}
              style={{
                width: 24,
                height: 24,
                tintColor:
                  activeCategory === "popular" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Popular</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("chair")}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "chair" ? colors.secondary : "#fff",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Chair.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: activeCategory === "chair" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Chair</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("table")}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "table" ? colors.secondary : "#fff",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Table.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: activeCategory === "table" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Table</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("armchair")}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "armchair" ? colors.secondary : "#fff",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Armchair.png")}
              style={{
                width: 24,
                height: 24,
                tintColor:
                  activeCategory === "armchair" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Armchair</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("bed")}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "bed" ? colors.secondary : "#fff",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Bed.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: activeCategory === "bed" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Bed</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => handlePress("other")}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeCategory === "other" ? colors.secondary : "#fff",
              },
            ]}
          >
            <Image
              source={require("@/assets/images/Armchair.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: activeCategory === "other" ? "#fff" : colors.primary,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.filterButtonText}>Other</Text>
        </View>
      </ScrollView>

      {/* Products */}
      <View style={styles.productContainer}>
        <View style={styles.product}>
          <Image
            source={require("@/assets/images/Black_Lamp.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text>Black Simple Lamp</Text>
          <Text>$ 12.00</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={require("@/assets/images/Simple_Desk.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text>Simple Desk</Text>
          <Text>$ 50.00</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={require("@/assets/images/Minimal_Stand.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text>Minimal Stand</Text>
          <Text>$ 12.00</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={require("@/assets/images/Coffee_Chair.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text>Coffee Chair</Text>
          <Text>$ 12.00</Text>
        </View>
      </View>
    </View>
  );
}
