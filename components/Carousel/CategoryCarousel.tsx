import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import CategoryCard from '../Buttons/CategoryButton';
import COLORS from '@/constants/Colors';

const { width } = Dimensions.get('window');

const AUTO_SCROLL_INTERVAL = 2000;

const CategoryCarousel = ({ categories = [], onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const isPaused = useRef(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
    onSelect?.(categories[index]?.id);
  };
  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        const nextIndex = (activeIndex + 1) % categories.length;
        scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        setActiveIndex(nextIndex);
        onSelect?.(categories[nextIndex]?.id);
      }
    }, AUTO_SCROLL_INTERVAL);
  };

  useEffect(() => {
    if (categories.length > 1) {
      startAutoScroll();
    }
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, categories.length]);

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPressIn={() => { isPaused.current = true; }}
        onPressOut={() => { isPaused.current = false; }}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          contentContainerStyle={styles.scrollContainer}
        >
          {categories.map((item, index) => (
            <View style={styles.cardContainer} key={item.id}>
              <CategoryCard
                label={item.label}
                image={item.image}
                active={index === activeIndex}
                onPress={() => {
                  scrollRef.current?.scrollTo({ x: index * width, animated: true });
                  setActiveIndex(index);
                  onSelect?.(item.id);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.pagination}>
        {categories.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryCarousel;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    width,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARY,
    width: 12,
  },
  inactiveDot: {
    backgroundColor: COLORS.BORDER,
  },
});
