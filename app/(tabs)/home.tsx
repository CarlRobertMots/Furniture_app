import React from "react";
import { useRouter } from "expo-router";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { products } from "@/app/products";
import { getProducts, ProductType } from "@/api/productService";

export default function HomeScreen() {
  const router = useRouter();
  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);

  const [displayedProducts, setDisplayedProducts] = useState(products);

  const showPopular = () => {
    setDisplayedProducts(products.filter((p) => p.category === "popular"));
  };
  const [activeCategory, setActiveCategory] = useState<string>("popular");

  const handlePress = (category: string) => {
    setActiveCategory(category);
    setDisplayedProducts(products.filter((p) => p.category === category));
  };

  const filterData = [
    {
      name: "Popular",
      category: "popular",
      image: require("@/assets/images/Star.png"),
    },
    {
      name: "Chair",
      category: "chairs",
      image: require("@/assets/images/Chair.png"),
    },
    {
      name: "Table",
      category: "tables",
      image: require("@/assets/images/Table.png"),
    },
    {
      name: "Armchair",
      category: "armchairs",
      image: require("@/assets/images/Armchair.png"),
    },
    {
      name: "Bed",
      category: "beds",
      image: require("@/assets/images/Bed.png"),
    },
    {
      name: "Other",
      category: "other",
      image: require("@/assets/images/Table.png"),
    },
  ];

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
        {filterData.map((filter) => {
          const isActive = activeCategory === filter.category;

          return (
            <View key={filter.category} style={styles.buttonContainer}>
              <Pressable
                onPress={() => handlePress(filter.category)}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: isActive ? colors.secondary : "#fff",
                  },
                ]}
              >
                <Image
                  source={filter.image}
                  style={[
                    styles.filterIconImage,
                    {
                      tintColor: isActive ? "#fff" : colors.primary,
                    },
                  ]}
                />
              </Pressable>
              <Text style={styles.filterButtonText}>{filter.name}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Products */}
      <View style={styles.productContainer}>
        {displayedProducts.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => router.push(`/${product.id}`)}
            style={styles.product}
          >
            <Image
              source={product.images[0]}
              style={styles.productImageThumbnail}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productNameText}>{product.name}</Text>
              <Text style={styles.productPriceText}>
                ${product.price.toFixed(2)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
