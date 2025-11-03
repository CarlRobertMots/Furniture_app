import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { createProduct, ProductType } from "@/api/productService";
import { Picker } from "@react-native-picker/picker";

// --- MOCK for dependencies ---
const colors: ThemeColors = Colors.light;
const styles = createStyles(colors);
// Assume categories are loaded from a central place or hardcoded
const CATEGORIES = ["Chairs", "Tables", "Sofas", "Lamps", "Storage", "Other"];
// --- END MOCK ---

// Define the shape of the data needed to create a product (excluding server-side fields like _id)
interface NewProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function CreateProductScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewProductData>({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    // Mocking a placeholder image URL for initial submission
    images: ["https://placehold.co/600x400?text=Placeholder+Image"],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: keyof NewProductData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Product name is required.";
    if (!formData.description.trim()) return "Description is required.";
    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0)
      return "Valid price is required.";
    if (!formData.category) return "Category must be selected.";
    // In a real app, you would validate the images array length here

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
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      } as unknown as ProductType;

      // Call the API service to create the product
      await createProduct(productData);

      Alert.alert("Success", `${formData.name} has been listed!`, [
        { text: "OK", onPress: () => router.replace("/home") },
      ]);
    } catch (err: any) {
      console.error("Product Creation Error:", err);
      setError(err.message || "Failed to create listing. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.createProductHeader}>Create New Listing</Text>

      {/* Name Input */}
      <Text style={styles.createProductLabel}>Product Name</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="Vintage Armchair, Minimalist Desk"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      {/* Price Input */}
      <Text style={styles.createProductLabel}>Price ($)</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="50.00"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(text) => handleChange("price", text)}
      />

      {/* Category Dropdown */}
      <Text style={styles.createProductLabel}>Category</Text>
      <View style={styles.createProductDropdown}>
        <Picker
          selectedValue={formData.category}
          onValueChange={(itemValue) =>
            handleChange("category", itemValue as string)
          }
          // Additional styling might be needed for the Picker component
          style={{ color: colors.text }}
        >
          {CATEGORIES.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {/* Description Input */}
      <Text style={styles.createProductLabel}>Description</Text>
      <TextInput
        style={[styles.createProductInput, styles.createProductTextArea]}
        placeholder="Describe your item: condition, dimensions, material..."
        multiline
        numberOfLines={4}
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      {/* Image Upload Placeholder (Simple Button) */}
      <Text style={styles.createProductLabel}>Images (Max 5)</Text>
      <Pressable
        style={styles.createProductDropdown}
        onPress={() =>
          Alert.alert("Upload", "Image picker functionality coming soon!")
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={24}
            color={colors.secondary}
          />
          <Text style={{ color: colors.secondary, marginLeft: 10 }}>
            Add Photos
          </Text>
        </View>
      </Pressable>

      {/* Error Message */}
      {error && <Text style={styles.createProductErrorText}>{error}</Text>}

      {/* Submit Button */}
      <Pressable
        style={styles.createProductButton}
        onPress={handleSubmit}
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
    </ScrollView>
  );
}
