import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { hp } from "@/helpers";
import { theme } from "@/constants";

const SectionView = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const FilterRows = ({
  data,
  filterName,
  filters,
  setFilters,
}: {
  data: Array<string>;
  filterName: string;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const onSelecet = (item: string) => {
    // @ts-ignore
    setFilters((prev) => ({ ...prev, [filterName]: item }));
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item) => {
          let isActive = filters && filters[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          let color = isActive ? "white" : theme.colors.neutral(0.7);
          return (
            <Pressable
              key={item}
              style={[styles.outlineButton, { backgroundColor }]}
              onPress={() => onSelecet(item)}
            >
              <Text style={[styles.outlineButtonText, { color }]}>{item}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};
export const ColorFilters = ({
  data,
  filterName,
  filters,
  setFilters,
}: {
  data: Array<string>;
  filterName: string;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const onSelecet = (item: string) => {
    // @ts-ignore
    setFilters((prev) => ({ ...prev, [filterName]: item }));
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item) => {
          let isActive = filters && filters[filterName] == item;
          //   let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          //   let color = isActive ? "white" : theme.colors.neutral(0.7);
          let borderColor = isActive ? theme.colors.neutral(0.7) : "white";
          return (
            <Pressable
              key={item}
              //   style={[styles.outlineButton, { backgroundColor }]}
              onPress={() => onSelecet(item)}
            >
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: hp(2.4),
    fontWeight: "600",
    color: theme.colors.neutral(0.8),
    textTransform: "capitalize",
  },
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlineButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlineButtonText: {
    textTransform: "capitalize",
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: "continuous",
  },
});

export default SectionView;
