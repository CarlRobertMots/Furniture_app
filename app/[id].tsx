import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { products } from "@/app/products";
import createStyles from "@/app/styles";
import { Colors, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleReturn = () => {
    router.back();
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  if (!product) {
    return (
      <View
        style={[
          styles.productDetailContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Product not found.</Text>
      </View>
    );
  }
  const ImageCarousel = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.imageScrollView}
      contentContainerStyle={styles.imageScrollView}
    >
      {(product.images || [product.images]).map((imageSource, index) => (
        <Image
          key={index}
          source={imageSource}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      ))}
    </ScrollView>
  );

  const PaginationDots = () => (
    <View style={styles.paginationContainer}>
      {(product.images || [product.images]).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
  return (
    <View style={styles.productDetailContainer}>
      {/*  Product Image */}
      <View style={styles.productDetail}>
        <ImageCarousel />
        <PaginationDots />

        {/* Back Button */}
        <Pressable onPress={handleReturn} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
      </View>

      {/* Text Content*/}

      <ScrollView style={styles.contentScrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              $ {product.price.toFixed(0)}
            </Text>
          </View>

          <Text style={styles.productDescription}>
            Minimal Stand is made of by natural wood. The design that is very
            simple and minimal. This is truly one of the best furnitures in any
            family for now. With 3 different colors, you can easily select the
            best match for your home.
          </Text>
        </View>
      </ScrollView>

      {/*Buttons Footer */}
      <View style={styles.actionButtonFooter}>
        <Pressable style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={28} color={colors.primary} />
        </Pressable>
        <Pressable style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </Pressable>
      </View>
    </View>
  );
}
