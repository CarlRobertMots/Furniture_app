import React from "react";
import HomeScreen from "./home";
import FavouritesScreen from "./Favourite";
import ProfileScreen from "./profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import { Colors } from "@/constants/theme";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.light.background },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: Colors.light.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/Home.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused
                  ? Colors.light.primary
                  : Colors.light.placeholder,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          // @ts-ignore
          tabBarTestID: "nav-tab-Favourites", // TypeScript will now ignore this error
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/Favourite.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused
                  ? Colors.light.primary
                  : Colors.light.placeholder,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/Profile.png")}
              style={{
                width: 24,
                height: 25,
                tintColor: focused
                  ? Colors.light.primary
                  : Colors.light.placeholder,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
