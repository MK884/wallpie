import { Platform, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/helpers";
import { theme } from "@/constants";
import { Router } from "expo-router";

const ImageCard = ({
  item,
  index,
  columns,
  router,
}: {
  item: IPixabay;
  index: number;
  columns: number;
  router: Router;
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
    <>
      <Pressable
        style={[styles.wrapper, !isLastColumn() && styles.spacing]}
        onPress={() =>
          router.push({ pathname: "/home/ImageScreen", params: { ...item } })
        }
      >
        <Image
          style={[styles.image, getSize()]}
          source={{
            uri: item?.previewURL,
          }}
          transition={100}
        />
      </Pressable>
    </>
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
    marginBottom: wp(Platform.OS === "web" ? 1 : 2),
  },
  spacing: {
    marginRight: wp(Platform.OS === "web" ? 1 : 2),
  },
});

export default ImageCard;
