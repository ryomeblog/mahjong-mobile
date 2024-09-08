import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "react-native";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  const tintColorLight = "#0a7ea4";
  const tintColorDark = "#fff";

  const Colors = {
    light: {
      text: "#11181C",
      background: "#fff",
      tint: tintColorLight,
      icon: "#687076",
      tabIconDefault: "#687076",
      tabIconSelected: tintColorLight,
    },
    dark: {
      text: "#ECEDEE",
      background: "#151718",
      tint: tintColorDark,
      icon: "#9BA1A6",
      tabIconDefault: "#9BA1A6",
      tabIconSelected: tintColorDark,
    },
  };

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
