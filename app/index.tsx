import { View, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { hp, wp } from "@/helpers";
import { theme } from "@/constants";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0)",
              "rgba(255, 255, 255, .5)",
              "white",
              "white",
            ]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
          />
          <View style={styles.contentContainer}>
            <Animated.Text
              style={styles.title}
              entering={FadeInDown.duration(400).springify()}
            >
              WallPie
            </Animated.Text>
            <Animated.Text
              style={styles.punchLine}
              entering={FadeInDown.duration(500).springify()}
            >
              Make a good choice with WallPie
            </Animated.Text>
            <Animated.View entering={FadeInDown.duration(600).springify()}>
              <Pressable
                style={styles.startBtn}
                onPress={() => router.push("/(home)/")}
              >
                <Animated.Text style={styles.startText}>
                  Start Explore
                </Animated.Text>
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    height: hp(65),
    width: wp(100),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(6),
    color: theme.colors.neutral(0.9),
    fontWeight: 700,
  },
  punchLine: {
    fontSize: hp(2),
    fontWeight: 500,
    letterSpacing: 1,
    marginBottom: 10,
  },
  startBtn: {
    backgroundColor: "black",
    padding: 15,
    marginBottom: 50,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: "white",
    letterSpacing: 1,
    fontSize: hp(2),
    fontWeight: 500,
  },
});

export default index;
