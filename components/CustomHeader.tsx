import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CustomHeader({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#272757" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 16 }}>
        {title}
      </Text>
    </View>
  );
}
