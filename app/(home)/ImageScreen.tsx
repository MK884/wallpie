import { theme } from "@/constants";
import { hp, wp } from "@/helpers";
import { Entypo, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast, {
  ToastConfigParams,
  ToastType,
} from "react-native-toast-message";

const ImageScreen = () => {
  const router = useRouter();
  const { width: DeviceWidth } = Dimensions.get("window");

  const item = useLocalSearchParams();

  const [status, setStatus] = React.useState<string>("loading");

  const uri = item.webformatURL as string;
  const fileName = item?.previewURL?.toString()?.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}/${fileName}`;
  const imageUri = uri;
  const onLoad = () => {
    setStatus("");
  };

  const getSize = () => {
    const aspectRatio = Number(item.imageWidth) / Number(item.imageHeight);

    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      // portrait
      calculatedWidth = calculatedHeight * aspectRatio;
      // calculatedHeight =
      //   Platform.OS === "web" && DeviceWidth > 900 ? hp(90) : calculatedHeight;
    }

    return {
      height: calculatedHeight,
      width: calculatedWidth,
      maxHeight: Platform.OS === "web" ? hp(90) : calculatedHeight,
    };
  };

  const handleDownloadImage = async () => {
    if (Platform.OS === "web") {
      // NOTE: direct uri will open in new window, so convert it into an blob then download

      setStatus("downloading");
      const response = await fetch(imageUri);
      if (response) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = fileName || "image.jpg";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setStatus("");
        showToast("downloaded image successfully");
      } else {
        showToast("somthing went wrong");
      }
    } else {
      let uri = await downloadFile();
      if (uri) {
        showToast("downloaded image successfully");
      }
    }
  };
  const handleSharedImage = async () => {
    if (Platform.OS === "web") {
      navigator.clipboard.writeText(item.pageURL.toString());
      showToast("link copied");
    } else {
      setStatus("sharing");
      let uri = await downloadFile();
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUri, filePath);
      setStatus("");
      return uri;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error in downloadImage", error.message);
        Alert.alert(
          "Image could not be downloaded. Please try again.",
          error.message
        );
        return null;
      }
    }
  };

  const showToast = (message: string, type: ToastType = "success") => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1 }: ToastConfigParams<any>): React.ReactNode => (
      <>
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      </>
    ),
  };
  return (
    <>
      <BlurView
        tint="dark"
        intensity={60}
        // experimentalBlurMethod="dimezisBlurView"  //! blur view not supported on android perfectly
        style={styles.container}
      >
        <View style={[getSize()]}>
          <View style={styles.loading}>
            {status === "loading" && (
              <ActivityIndicator size="large" color="white" />
            )}
          </View>
          <Image
            transition={100}
            style={[styles.image, getSize()]}
            source={{ uri }}
            onLoad={onLoad}
          />
        </View>
        <View style={styles.buttons}>
          <Animated.View entering={FadeInDown.springify()}>
            <Pressable style={styles.button} onPress={() => router.back()}>
              <Octicons name="x" size={24} color="white" />
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(100)}>
            {status === "downloading" ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Pressable style={styles.button} onPress={handleDownloadImage}>
                <Octicons name="download" size={24} color="white" />
              </Pressable>
            )}
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(200)}>
            {status === "sharing" ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Pressable style={styles.button} onPress={handleSharedImage}>
                <Entypo name="share" size={22} color="white" />
              </Pressable>
            )}
          </Animated.View>
        </View>
        <Toast visibilityTime={2500} config={toastConfig} />
      </BlurView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "white",
  },
});

export default ImageScreen;
