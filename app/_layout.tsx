import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RooteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RooteLayout;