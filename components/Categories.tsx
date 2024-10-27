import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { data, theme } from "@/constants";
import { hp, wp } from "@/helpers";
import Animated, { FadeInRight } from "react-native-reanimated";

const Categories = ({
  activeCategory,
  handleCategory,
}: {
  activeCategory: string | null;
  handleCategory: (cat: string | null) => void;
}) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatList}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          key={index}
          index={index}
          isActive={activeCategory === item}
          onPress={handleCategory}
        />
      )}
    />
  );
};

const CategoryItem = ({
  title,
  index,
  isActive,
  onPress,
}: {
  title: string;
  index: number;
  isActive: boolean;
  onPress: (item: string | null) => void;
}) => {
  const color = isActive ? "#fff" : theme.colors.neutral(0.8);
  const backgroundColor = isActive ? theme.colors.neutral(0.8) : "#fff";

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.category, { backgroundColor }]}
        onPress={() => onPress(isActive ? null : title)}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: wp(4),
    gap: 15,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: 500,
  },
});

export default Categories;
