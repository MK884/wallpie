import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants";
import { hp, wp } from "@/helpers";
import { Categories, ImageGrid, ModalSheet } from "@/components";
import { getImages } from "@/service";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

var page = 1;
const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [query, setQuery] = React.useState<string>("");
  const [filters, setFilters] = React.useState<Object | null>(null);
  const [images, setImages] = React.useState<Array<IPixabay>>([]);
  const [ActiveCategory, setActiveCategory] = React.useState<string | null>(
    null
  );
  const queryRef = React.useRef<TextInput>(null);
  const modalSheetRef = React.useRef<BottomSheetModal>(null);

  const handleCategory = (cat: string | null) => {
    setActiveCategory(cat);
    queryRef.current?.clear();
    page = 1;
    const params: { [key: string]: any } = {
      page,
      ...filters,
    };

    if (cat) params.category = cat;
    fetchImages(params);
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params: unknown = { page: 1 }, append = false) => {
    const data = await getImages(params);

    if (data?.hits) {
      if (append) {
        setImages((prev) => [...prev, ...data.hits]);
      } else {
        setImages(data.hits);
      }
    }
  };

  const handleSearch = (text: string) => {
    if (text?.length > 2) {
      // make search query
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters });
    }

    if (text === "") {
      // reset images
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters });
    }
  };

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearch(query);
    }, 400);

    return () => clearTimeout(timerId);
  }, [query]);

  const clearSerach = () => {
    setQuery("");
  };

  const openFilterModal = () => modalSheetRef?.current?.present();
  const closeFilterModal = () => modalSheetRef?.current?.close();

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);

      let params: { [key: string]: any } = {
        page,
        ...filters,
      };
      if (ActiveCategory) params.category = ActiveCategory;
      if (query) params.q = query;
      fetchImages(params);
    }
    closeFilterModal();
  };

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      setFilters(null);
      let params: { [key: string]: any } = {
        page,
      };
      if (ActiveCategory) params.category = ActiveCategory;
      if (query) params.q = query;
      fetchImages(params);
    }
    closeFilterModal();
  };

  const clearFilter = (key: string) => {
    let filtersz = { ...filters };
    // @ts-ignore
    delete filtersz[key];
    // @ts-ignore
    setFilters({ ...filtersz });
    page = 1;
    setImages([]);
    let params: { [key: string]: any } = {
      page,
      ...filtersz,
    };
    if (ActiveCategory) params.category = ActiveCategory;
    if (query) params.q = query;
    fetchImages(params);
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={[styles.title, { fontWeight: 600 }]}>WallPie</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
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
            <Pressable style={styles.closeIcon} onPress={clearSerach}>
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

        {/* filters */}
        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key, index) => (
                <View key={key} style={styles.filterItem}>
                  {key == "colors" ? (
                    <View
                      style={{
                        height: 20,
                        width: 30,
                        borderRadius: 7,
                        // @ts-ignore
                        backgroundColor: filters[key],
                      }}
                    />
                  ) : (
                    // @ts-ignore
                    <Text style={styles.filterItemText}>{filters[key]}</Text>
                  )}
                  <Pressable
                    style={styles.filterCloseIcon}
                    onPress={() => clearFilter(key)}
                  >
                    <Ionicons
                      name="close"
                      size={14}
                      color={theme.colors.neutral(0.9)}
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* images  */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>

        {/* laoder */}
        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>

      {/* modal sheet */}
      <ModalSheet
        ref={modalSheetRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onClose={closeFilterModal}
        onReset={resetFilters}
      />
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
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 8,
    flexDirection: "row",
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  filterItemText: {
    textTransform: "capitalize",
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,
  },
});

export default Home;
