import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createProduct, CreateProductInput } from "@/api";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";

const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function CreateProductScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "chairs",
    images: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => ["chairs", "tables", "armchairs", "beds", "other"],
    []
  );
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): string | null => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      return "Please fill all required fields.";
    }
    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return "Price must be a valid positive number.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const productData: CreateProductInput = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        images: [
          formData.images[0] ||
            "https://placehold.co/400x400/6B8E23/FFFFFF?text=New+Product",
        ],
      };

      await createProduct(productData);

      Alert.alert("Success", `${formData.name} added successfully!`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.message ||
          "Failed to submit product. Check login status and server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.createProductHeader}>List New Furniture</Text>

      <Text style={styles.createProductLabel}>Product Name</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="E.g., Vintage Leather Armchair"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <Text style={styles.createProductLabel}>Price ($)</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="199.99"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(text) => handleChange("price", text)}
      />

      <Text style={styles.createProductLabel}>Category</Text>
      <Pressable
        style={styles.createProductDropdown}
        onPress={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
        disabled={isLoading}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.dropdownText}>
            {formData.category.charAt(0).toUpperCase() +
              formData.category.slice(1) || "Select Category"}
          </Text>
          <MaterialCommunityIcons
            name={isCategoryDropdownOpen ? "menu-up" : "menu-down"}
            size={20}
            color={colors.text}
          />
        </View>
      </Pressable>

      {isCategoryDropdownOpen && (
        <View style={styles.createProductCategoryList}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={styles.createProductCategoryItem}
              onPress={() => {
                handleChange("category", cat);
                setIsCategoryDropdownOpen(false);
              }}
            >
              <Text>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.createProductLabel}>Description</Text>
      <TextInput
        style={[styles.createProductInput, styles.createProductTextArea]}
        placeholder="Detailed description of the item, condition, and dimensions."
        multiline
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      <Text style={styles.createProductLabel}>Image URL (1st Image)</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="https://example.com/image.jpg"
        value={formData.images[0]}
        onChangeText={(text) => handleChange("images", [text] as any)}
      />

      {error && <Text style={styles.createProductErrorText}>{error}</Text>}

      <Pressable
        onPress={handleSubmit}
        style={styles.createProductButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialCommunityIcons name="upload" size={20} color="#fff" />
            <Text style={styles.createProductButtonText}>Publish Listing</Text>
          </>
        )}
      </Pressable>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
