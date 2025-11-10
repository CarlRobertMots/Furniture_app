import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  getProductById,
  addFavourite,
  removeFavourite,
  getFavourites,
  ProductType,
} from "@/api/productService";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";

const ProductDetail = () => {
  const router = useRouter();
  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);

  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchProductAndStatus = async () => {
      setLoading(true);
      setError(null);

      if (!id) {
        setError("No product ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundProduct = await getProductById(id);

        if (foundProduct) {
          setProduct(foundProduct);

          // Check if the current product is in the user's favorites
          try {
            const favorites = await getFavourites();
            const isFav = favorites.some((fav) => fav._id === id);
            setIsFavorited(isFav);
          } catch (e) {
            // This usually happens if the user is not logged in
            console.warn(
              "Could not fetch favorite status (user possibly not logged in).",
              e
            );
            setIsFavorited(false);
          }
        } else {
          setError("Live product not found for ID: " + id);
        }
      } catch (e) {
        console.error("API Fetch Error:", e);
        setError("Failed to connect to the server or fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndStatus();
  }, [id]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      contentOffset / event.nativeEvent.layoutMeasurement.width
    );
    setActiveImageIndex(index);
  };

  const handleBookmark = async () => {
    if (!product) return;

    try {
      if (isFavorited) {
        await removeFavourite(product._id);
        setIsFavorited(false);
        Alert.alert("Removed", `${product.name} removed from favorites.`);
      } else {
        await addFavourite(product._id);
        setIsFavorited(true);
        Alert.alert("Added", `${product.name} added to favorites!`);
      }
    } catch (e: any) {
      const errorMessage =
        e.message || "Failed to update favorites. Are you logged in?";
      Alert.alert("Error", errorMessage);
    }
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text
          style={{ color: colors.primary, fontSize: 16, fontWeight: "bold" }}
        >
          Error: Could not load product.
        </Text>
        <Text style={{ color: colors.text, fontSize: 14, marginTop: 5 }}>
          {error || "Product data is missing."}
        </Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.secondary, fontWeight: "bold" }}>
            ← Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const {
    productDetail,
    imageScrollView,
    carouselImage,
    backButton,
    paginationContainer,
    dot,
    activeDot,
    inactiveDot,
    contentContainer,
    productName,
    priceContainer,
    currencySymbol,
    productPrice,
    productDescription,
    actionButtonFooter,
    bookmarkButton,
    contactButton,
    contactButtonText,
  } = styles;

  return (
    <View style={styles.productDetailContainer}>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerShown: false,
          headerTintColor: "#fff",
        }}
      />
      {/* Back Button Overlay */}
      <Pressable onPress={() => router.back()} style={backButton}>
        <Text
          style={{ color: colors.primary, fontSize: 24, fontWeight: "bold" }}
        >
          ←
        </Text>
      </Pressable>
      <ScrollView style={styles.contentScrollView}>
        {/* Product Images Carousel Area */}
        <View style={productDetail}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={imageScrollView}
          >
            {product.images.map((imgUrl: string, index: number) => (
              <Image
                key={index}
                source={{ uri: imgUrl }}
                style={carouselImage}
              />
            ))}
          </ScrollView>
          {/* Pagination Dots */}
          <View style={paginationContainer}>
            {product.images.map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  dot,
                  index === activeImageIndex ? activeDot : inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>
        {/* Product Description and Details */}
        <View style={contentContainer}>
          <Text style={productName}>{product.name}</Text>
          <View style={priceContainer}>
            <Text style={currencySymbol}>$</Text>
            <Text style={productPrice}>{product.price.toFixed(2)}</Text>
          </View>
          <Text style={productDescription}>
            {product.description ||
              "No detailed description available for this product."}
          </Text>
        </View>
      </ScrollView>
      {/* Action Buttons Footer */}
      <View style={actionButtonFooter}>
        <Pressable
          onPress={handleBookmark}
          style={[
            bookmarkButton,
            {
              backgroundColor: isFavorited
                ? colors.secondary
                : colors.background,
            },
          ]}
        >
          <Text
            style={{
              color: isFavorited ? colors.background : colors.secondary,
            }}
          >
            {isFavorited ? "★" : "⭐"}
          </Text>
        </Pressable>
        <Pressable style={contactButton}>
          <Text style={contactButtonText}>Contact Seller</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetail;
