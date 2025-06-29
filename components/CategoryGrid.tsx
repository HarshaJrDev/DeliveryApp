import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';

import COLORS from '@/constants/Colors';
import CategoryButton from './Buttons/CategoryButton';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemSpacing = 16;
const itemSize = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const CategoryGrid = ({ categories = [], onSelect }) => {
  const [activeId, setActiveId] = useState(null);

  const handlePress = (id) => {
    setActiveId(id);
    onSelect?.(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CategoryButton
        label={item.label}
        image={item.image}
        icon={item.icon}
        badge={item.badge}
        active={item.id === activeId}
        onPress={() => handlePress(item.id)}
      />
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      scrollEnabled={false}
    />
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: itemSpacing,
    paddingVertical: 20,
  },
  itemContainer: {
    width: itemSize,
    marginBottom: itemSpacing,
    marginRight: itemSpacing,
  },
});

