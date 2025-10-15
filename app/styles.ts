import { ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

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
    image: {
      width: "90%",
      height: 250,
      marginBottom: 20,
      resizeMode: "contain",
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

    filterButton: {
      backgroundColor: colors.background,
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
      paddingHorizontal: 16,
    },

    product: {
      width: "48%",
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 10,
      marginBottom: 16,
      alignItems: "center",
    },

    productImage: {
      borderRadius: 12,
    },
  });
