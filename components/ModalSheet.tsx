import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { hp } from "@/helpers";
import { data, theme } from "@/constants";
import SectionView, { ColorFilters, FilterRows } from "./SectionView";

interface BottomSheetInterface extends Partial<BottomSheetModal> {
  snapPoints?: Array<number | string>;
  handleSheetChanges?: (index: number) => void;
  index?: number;
  filters: unknown;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

const ModalSheet = React.forwardRef<BottomSheetModal, BottomSheetInterface>(
  (
    {
      snapPoints = ["75%"],
      handleSheetChanges,
      index = 0,
      filters,
      onApply,
      onClose,
      onReset,
      setFilters,
    },
    ref
  ) => {
    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={CustomeBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={[styles.filterText, { fontWeight: 600 }]}>
              Filters
            </Text>
            {Object.keys(sections).map((sectionName, index) => {
              // @ts-ignore
              let sectionView = sections[sectionName];
              // @ts-ignore
              let sectionData = data.filters[sectionName];
              return (
                <Animated.View
                  entering={FadeInDown.delay(index * 100 + 100)
                    .springify()
                    .damping(11)}
                  key={sectionName}
                >
                  <SectionView
                    title={sectionName}
                    content={sectionView({
                      data: sectionData,
                      filters,
                      setFilters,
                      filterName: sectionName,
                    })}
                  />
                </Animated.View>
              );
            })}

            {/* actions */}
            <Animated.View
              style={styles.buttons}
              entering={FadeInDown.delay(500).springify().damping(11)}
            >
              <Pressable style={styles.resetButton} onPress={onReset}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: theme.colors.neutral(0.7) },
                  ]}
                >
                  Reset
                </Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={onApply}>
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Apply
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const sections = {
  order: (props: any) => <FilterRows {...props} />,
  orientation: (props: any) => <FilterRows {...props} />,
  type: (props: any) => <FilterRows {...props} />,
  colors: (props: any) => <ColorFilters {...props} />,
};

const CustomeBackdrop = ({
  animatedIndex,
  style,
}: {
  animatedIndex: SharedValue<number>;
  style?: unknown;
}) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyles = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    animatedContainerStyle,
  ];
  return (
    // @ts-ignore
    <Animated.View style={containerStyles}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="dark"
        intensity={25}
        experimentalBlurMethod="dimezisBlurView"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    width: "100%",
    // flex: 1,
    // backgroundColor: "red",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  buttonText: {
    fontSize: hp(2.2),
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
});

export default ModalSheet;
