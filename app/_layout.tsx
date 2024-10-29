import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RooteLayout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
            <Stack.Screen
              name="home/ImageScreen"
              options={{
                headerShown: false,
                presentation: "transparentModal",
                animation: "fade",
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default RooteLayout;
