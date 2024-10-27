import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants";
import { hp, wp } from "@/helpers";
import { Categories, ImageGrid } from "@/components";
import { getImages } from "@/service";

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [query, setQuery] = React.useState<string>("");
  const [images, setImages] = React.useState<Array<IPixabay>>([]);
  const [ActiveCategory, setActiveCategory] = React.useState<string | null>(
    null
  );
  const queryRef = React.useRef<TextInput>(null);

  const handleCategory = (cat: string | null) => {
    setActiveCategory(cat);
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = false) => {
    const data = await getImages(params);

    if (data?.hits) {
      if (append) {
        setImages((prev) => [...prev, ...data.hits]);
      } else {
        setImages(data.hits);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={[styles.title, { fontWeight: 600 }]}>WallPie</Text>
        </Pressable>
        <FontAwesome6
          name="bars-staggered"
          size={22}
          color={theme.colors.neutral(0.7)}
        />
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* search bar*/}
        <View style={styles.sreachBar}>
          <View style={styles.serachIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            value={query}
            onChangeText={(text) => setQuery(text)}
            ref={queryRef}
          />
          {query && (
            <Pressable style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={ActiveCategory}
            handleCategory={handleCategory}
          />
        </View>

        {/* images  */}
        {images.length > 0 && <ImageGrid images={images} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.neutral(0.9),
  },
  sreachBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: "white",
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  serachIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});

export default Home;
