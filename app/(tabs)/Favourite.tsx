import React from "react";
import { useRouter } from "expo-router";
import { Colors, ThemeColors } from "@/constants/theme";
import createStyles from "@/app/styles";
import { View, Text, Image } from "react-native";

export default function FavouritesScreen() {
  const router = useRouter();
  const colors: ThemeColors = Colors.light;
  const styles = createStyles(colors);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.searchContainer}>
        <Text>Find All You Need</Text>
      </View>
    </View>
  );
}
