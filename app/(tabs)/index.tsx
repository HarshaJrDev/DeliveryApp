import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import SearchBar from "@/components/Search/SearchBar";
import FilterModal from "@/components/Modal/FilterModal";
import COLORS from "@/constants/Colors";
import { useRouter } from "expo-router";

import categories from "@/Mock/categories";
import CategoryGrid from "@/components/CategoryGrid";
import CategoryCarousel from "@/components/Carousel/CategoryCarousel";
import FoodItemCard from "@/components/Cards/FoodItemCard";
import foodData from "@/Mock/foodData";

const Index = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchData, setSearchData] = useState("");

  const router = useRouter();

  const onpressSearch = () => {
    router.push("search");
  };

  const handleAddToCart = (id: string) => {
    console.log("Add to cart:", id);
  };

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <Header />

      <TouchableOpacity onPress={onpressSearch} activeOpacity={0.8}>
        <SearchBar
          disabled
          value={searchData}
          onChange={(text) => setSearchData(text)}
          onFilterPress={() => setFilterModalVisible(true)}
        />
      </TouchableOpacity>

      <CategoryCarousel categories={categories} />
      <CategoryGrid categories={categories} />

      <Text style={styles.sectionTitle}>Recommended for you</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItemCard data={item}  onPress={() => router.push('FoodDetailScreen', { item })} onAddToCart={() => handleAddToCart(item.id)} />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onSelect={(option) => setSelectedFilter(option)}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    bottom:40
  },
  headerWrapper: {

    paddingTop: 12,
    gap: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 16,
  },
});
