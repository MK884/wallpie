import { Dimensions } from "react-native";

const { width: DeviceWidth, height: DeviceHeight } = Dimensions.get("window");

export const wp = (percentage: number) => {
  return (percentage * DeviceWidth) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * DeviceHeight) / 100;
};

export const getColumsNum = () => {
  if (DeviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (DeviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (width: number, height: number) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};
