import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/helpers";
import { theme } from "@/constants";

const ImageCard = ({
  item,
  index,
  columns,
}: {
  item: IPixabay;
  index: number;
  columns: number;
}) => {
  const getSize = () => {
    const { imageWidth: width, imageHeight: height } = item;

    return {
      height: getImageSize(width, height),
    };
  };

  const isLastColumn = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Pressable style={[styles.wrapper, !isLastColumn() && styles.spacing]}>
      <Image
        style={[styles.image, getSize()]}
        source={{
          uri: item?.previewURL,
        }}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  wrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;
