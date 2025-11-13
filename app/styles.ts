import { ThemeColors } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const IMAGE_CONTAINER_HEIGHT = height * 0.55;

export default (colors: ThemeColors) =>
  StyleSheet.create({
    //Signup Page
    container: {
      flex: 1,
      alignContent: "center",
      backgroundColor: colors.background,
    },
    inputContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
      backgroundColor: colors.background,
    },
    input: {
      backgroundColor: colors.background,
      paddingVertical: 20,
      borderRadius: 10,
      borderWidth: 2,
      marginBottom: 15,
      color: colors.text,
      width: "80%",
      borderColor: colors.border,
      paddingHorizontal: 16,
    },

    signUpheaderText: {
      fontSize: 14,
      color: colors.primary,
      marginBottom: 12,
      alignItems: "flex-start",
      width: "80%",
    },

    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",

      borderColor: colors.border,
      borderRadius: 8,
    },

    eyeButton: {
      padding: 5,
    },

    // checkbox
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderRadius: 4,
      marginRight: 10,
      borderColor: colors.secondary,
    },
    checked: {
      backgroundColor: colors.secondary,
    },
    checkboxText: {
      fontSize: 16,
      color: colors.text,
    },

    // Divider
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.secondary,
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 14,
    },

    // Google SignUp button
    googleButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15,
      alignItems: "center",
      width: "40%",
    },

    bottomText: {
      fontSize: 14,
      color: colors.secondary,
      textAlign: "center",
    },
    // Splashscreen aka index
    Splashcontainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 15,
      alignItems: "center",
      width: "80%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    signupButton: {
      borderColor: colors.primary,
      borderWidth: 2,
      backgroundColor: colors.background,
    },
    signUpText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    slogan: {
      fontSize: 40,
      color: colors.text,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
    },
    // Home page

    homeContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      height: 60,
      marginLeft: 12,
    },
    buttonContainer: {
      flexDirection: "column",
      alignItems: "center",
      marginRight: 20,
    },
    filterIconImage: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
    filterButton: {
      backgroundColor: colors.background,
      width: 50,
      height: 50,
      padding: 12,
      borderRadius: 10,
      marginBottom: 4,
      alignItems: "center",
      justifyContent: "center",
    },

    filterButtonText: {
      color: colors.primary,
      marginTop: 4,
      fontWeight: "500",
      textAlign: "center",
    },

    productContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
    },

    product: {
      width: "48%",
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 20,
    },
    productInfo: {
      alignContent: "flex-start",
      width: "100%",
      paddingHorizontal: 16,
    },
    productNameText: {
      fontSize: 16,
      color: colors.primary,
    },

    productPriceText: {
      fontWeight: "bold",
      fontSize: 14,
      color: colors.secondary,
    },
    productImageThumbnail: {
      height: 180,
      marginBottom: 20,
      resizeMode: "cover",
      borderRadius: 12,
    },
    // Product Detailed view
    productDetailContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    productDetail: {
      width: "100%",
      height: IMAGE_CONTAINER_HEIGHT,
      position: "relative",
    },
    imageScrollView: {
      width: width,
      height: IMAGE_CONTAINER_HEIGHT,
    },
    carouselImage: {
      width: width,
      height: IMAGE_CONTAINER_HEIGHT,
      resizeMode: "cover",
    },
    // Back Button
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      zIndex: 10,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 50,
      padding: 10,
    },

    // Pagination
    paginationContainer: {
      position: "absolute",
      bottom: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      zIndex: 5,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: "#000",
      width: 25,
    },
    inactiveDot: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },

    contentScrollView: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      paddingBottom: 40,
      flex: 1,
    },
    productName: {
      fontSize: 28,
      fontWeight: "600",
      marginBottom: 10,
      color: colors.text,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    currencySymbol: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.secondary,
      marginRight: 2,
    },
    productPrice: {
      fontSize: 40,
      fontWeight: "bold",
      color: colors.secondary,
      lineHeight: 40,
    },
    productDescription: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
    },

    // Product detail Footer
    actionButtonFooter: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#eee",
    },
    bookmarkButton: {
      backgroundColor: "#eee",
      borderRadius: 10,
      padding: 12,
      marginRight: 16,
    },
    contactButton: {
      flex: 1, 
      backgroundColor: "#607d8b",
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    contactButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
  });
