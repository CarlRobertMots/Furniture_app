import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getProducts, ProductType } from "@/api/productService";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

// Note: Ensure your ProductType includes a 'category: string' field from your API for filtering to work.
interface FilterableProduct extends ProductType {
  category: string;
}

export default function HomeScreen() {
  const router = useRouter();

  const [allProducts, setAllProducts] = useState<FilterableProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<
    FilterableProduct[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<string>("popular");
  const [loading, setLoading] = useState(true);

  // --- API FETCH & HANDLERS ---

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data: FilterableProduct[] = await getProducts();
      setAllProducts(data);
      // Initialize with 'popular' products on load
      applyFilter("popular", data);
    } catch (error) {
      console.error("Home Screen Fetch Error:", error);
      Alert.alert("Error", "Failed to load products. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (category: string, productsToFilter = allProducts) => {
    setActiveCategory(category);
    const filtered = productsToFilter.filter((p) => p.category === category);
    setDisplayedProducts(filtered);
  };

  const handlePress = (category: string) => {
    applyFilter(category);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllProducts();
      return () => {};
    }, [])
  );

  // --- FILTER DATA ---

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

  // --- RENDER ---

  if (loading) {
    return (
      <View style={styles.fullScreenCenter}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    // Root View container (Correct for fixed header)
    <View style={styles.homeContainer}>
      {/* Search bar */}
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

      {/* Filter ScrollView */}
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
            // 💡 The parent is now the Pressable
            <Pressable
              key={filter.category}
              style={styles.buttonContainer}
              onPress={() => handlePress(filter.category)} // 👈 onPress is here
              testID={`category-${filter.name}`} // 👈 testID is here
            >
              <View
                style={[
                  styles.filterButton,
                  { backgroundColor: isActive ? colors.secondary : "#fff" },
                ]}
              >
                <Image
                  source={filter.image}
                  style={[
                    styles.filterIconImage,
                    { tintColor: isActive ? "#fff" : colors.primary },
                  ]}
                />
              </View>
              <Text style={styles.filterButtonText}>{filter.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Product Listings ScrollView (Allows scrolling of the grid) */}
      <ScrollView>
        <View style={styles.productContainer}>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Pressable
                key={product._id}
                onPress={() => router.push(`../product/${product._id}`)}
                style={styles.product}
                testID="product-card"
              >
                <Image
                  // Use URI source for live images
                  source={
                    product.images && product.images[0]
                      ? { uri: product.images[0] }
                      : require("@/assets/images/Simple_Desk.png") // Use a guaranteed local fallback
                  }
                  style={styles.productImageThumbnail}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productNameText}>{product.name}</Text>
                  <Text style={styles.productPriceText}>
                    ${product.price.toFixed(2)}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={{ padding: 20, width: "100%" }}>
              <Text style={{ textAlign: "center", color: colors.secondary }}>
                No products found in the '{activeCategory}' category.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
