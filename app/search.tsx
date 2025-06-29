import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/Search/SearchBar";
import CommonHeader from "@/components/Header/CommonHeader";
import FilterModal from "@/components/Modal/FilterModal";
import { useRouter } from "expo-router";
import COLORS from "@/constants/Colors";

const SearchScreen = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchData, setSearchData] = useState("");

  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <CommonHeader title="Search" />

        <SearchBar

          value={searchData}
          onChange={(text) => setSearchData(text)}
          onFilterPress={() => setFilterModalVisible(true)}
        />

        {/* Main content can go here */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.infoText}>
            {searchData ? `Results for "${searchData}"` : "Start typing to search..."}
          </Text>
          {/* Add your search result list/cards here */}
        </ScrollView>

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onSelect={(option) => setSelectedFilter(option)}
        />
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
    marginTop: 20,
  },
});
