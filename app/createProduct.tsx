import React, { useState, useMemo, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { createProduct, CreateProductInput } from "@/api";
import { uploadImage } from "@/api/uploadService";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");
const IMAGE_PREVIEW_SIZE = width * 0.25;
const MAX_IMAGES = 5;

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
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "chairs",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => ["chairs", "tables", "armchairs", "beds", "other"],
    []
  );

  // HEADER CONFIGURATION
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text}
          />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerShadowVisible: false,
    });
  }, [navigation, colors.text, colors.background, router]);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // IMAGE URLS/Uploads
  const addImageToForm = (url: string = "") => {
    if (formData.images.length >= MAX_IMAGES) {
      Alert.alert(
        "Limit Reached",
        `You can only add up to ${MAX_IMAGES} images.`
      );
      return;
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
  };

  const updateExistingImageUrl = (text: string, index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages[index] = text;
      return { ...prev, images: newImages };
    });
  };

  const handlePickImageAndUpload = async () => {
    if (isUploading) return;

    if (formData.images.length >= MAX_IMAGES) {
      Alert.alert(
        "Limit Reached",
        `You can only upload up to ${MAX_IMAGES} images.`
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;

    setIsUploading(true);
    try {
      Alert.alert(
        "Uploading...",
        "Please wait while the image is being transferred.",
        [{ text: "OK" }]
      );
      const publicUrl = await uploadImage(localUri);

      addImageToForm(publicUrl);

      Alert.alert("Success", "Image uploaded and added to the list!");
    } catch (err: any) {
      Alert.alert(
        "Upload Failed",
        err.message || "Failed to upload the image."
      );
    } finally {
      setIsUploading(false);
    }
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

    const validImageUrls = formData.images.filter((url) => url.trim() !== "");
    if (validImageUrls.length === 0) {
      return "You must provide at least one image.";
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
      const validImages = formData.images.filter((url) => url.trim() !== "");

      const productData: CreateProductInput = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        images: validImages,
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

  const ImagePreviewItem = ({ uri, index }: { uri: string; index: number }) => (
    <View
      key={index}
      style={{
        width: IMAGE_PREVIEW_SIZE,
        height: IMAGE_PREVIEW_SIZE,
        borderRadius: 10,
        marginRight: 10,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Image source={{ uri }} style={{ flex: 1, resizeMode: "cover" }} />
      <Pressable
        onPress={() =>
          setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
          }))
        }
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 3,
        }}
      >
        <MaterialCommunityIcons name="close" size={14} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.createProductHeader, { textAlign: "left" }]}>
        New Listing
      </Text>

      {/* IMAGE SECTION */}
      <Text style={styles.createProductLabel}>Photos (Max {MAX_IMAGES})</Text>
      <View style={{ marginBottom: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row" }}
        >
          {formData.images.map((url, index) =>
            url.trim() ? (
              <ImagePreviewItem key={index} uri={url} index={index} />
            ) : null
          )}

          {/* Add Photo from Device Button */}
          {formData.images.length < MAX_IMAGES && (
            <Pressable
              onPress={handlePickImageAndUpload}
              style={[
                styles.createProductImagePlaceholder,
                {
                  width: IMAGE_PREVIEW_SIZE,
                  height: IMAGE_PREVIEW_SIZE,
                  marginRight: 10,
                },
              ]}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color={colors.secondary} size="small" />
              ) : (
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={30}
                  color={colors.secondary}
                />
              )}
              <Text
                style={{ fontSize: 10, color: colors.secondary, marginTop: 5 }}
              >
                Add Photo
              </Text>
            </Pressable>
          )}

          {/* Add URL Button (Icon only) */}
          {formData.images.length < MAX_IMAGES && (
            <Pressable
              onPress={() => {
                addImageToForm("https://");
              }}
              style={[
                styles.createProductImagePlaceholder,
                {
                  width: IMAGE_PREVIEW_SIZE,
                  height: IMAGE_PREVIEW_SIZE,
                  borderStyle: "dashed",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="link-plus"
                size={30}
                color={colors.primary}
              />
              <Text
                style={{ fontSize: 10, color: colors.primary, marginTop: 5 }}
              >
                Add URL
              </Text>
            </Pressable>
          )}
        </ScrollView>

        {/* URL Input Area */}
        {formData.images.map((url, index) =>
          url === "https://" || !url.trim() ? (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                backgroundColor: colors.background,
                borderRadius: 8,
              }}
            >
              <TextInput
                style={[
                  styles.createProductInput,
                  { flex: 1, marginVertical: 0 },
                ]}
                placeholder={`Paste Image URL ${index + 1}`}
                placeholderTextColor={colors.placeholder}
                value={url === "https://" ? "" : url}
                onChangeText={(text) => updateExistingImageUrl(text, index)}
              />
              <TouchableOpacity
                onPress={() =>
                  setFormData((prev) => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index),
                  }))
                }
                style={{ paddingHorizontal: 15 }}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </View>

      {/* PRODUCT NAME */}
      <Text style={styles.createProductLabel}>Product Name</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="E.g., Vintage Leather Armchair"
        placeholderTextColor={colors.placeholder}
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      {/* CATEGORY DROPDOWN */}
      <Text style={styles.createProductLabel}>Category</Text>
      <View style={styles.createProductDropdown}>
        <Picker
          selectedValue={formData.category}
          onValueChange={(itemValue) => {
            handleChange("category", itemValue);
          }}
          style={{ width: "100%", color: colors.text }}
          itemStyle={{ color: colors.text }}
          dropdownIconColor={colors.text}
        >
          {categories.map((cat) => (
            <Picker.Item
              key={cat}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              value={cat}
              style={{ color: colors.text }}
            />
          ))}
        </Picker>
      </View>

      {/* PRICE INPUT */}
      <Text style={styles.createProductLabel}>Price (€)</Text>
      <TextInput
        style={styles.createProductInput}
        placeholder="0.00"
        placeholderTextColor={colors.placeholder}
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(text) => handleChange("price", text)}
      />

      {/* DESCRIPTION */}
      <Text style={styles.createProductLabel}>Description</Text>
      <TextInput
        style={[styles.createProductInput, styles.createProductTextArea]}
        placeholder="Describe your item, condition, dimensions, etc."
        placeholderTextColor={colors.placeholder}
        multiline
        numberOfLines={4}
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      {error && <Text style={styles.createProductErrorText}>{error}</Text>}

      {/* Submit Button */}
      <Pressable
        onPress={handleSubmit}
        style={styles.createProductButton}
        disabled={isLoading || isUploading}
      >
        {isLoading || isUploading ? (
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
