import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

type FoodItemType = {
  image: any;
  name: string;
  description: string;
  rating: number;
  isVeg: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  deliveryTime: string;
  price: string;
};

type Props = {
  data: FoodItemType;
  onPress: () => void;
};

const FoodItemCard: React.FC<Props> = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={data.image} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
          {data.isVeg ? (
            <MaterialCommunityIcons name="leaf" size={16} color="green" />
          ) : (
            <MaterialCommunityIcons name="food-drumstick" size={16} color="red" />
          )}
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{data.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.time}>⏱ {data.deliveryTime}</Text>
        </View>

        <View style={styles.labelRow}>
          {data.isNew && <Text style={styles.new}>NEW</Text>}
          {data.isPopular && <Text style={styles.popular}>Popular</Text>}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹ {data.price}</Text>
          <Ionicons name="chevron-forward-circle" size={24} color={COLORS.PRIMARY} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginVertical: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: COLORS.TEXT_PRIMARY,
  },
  time: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  labelRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  new: {
    backgroundColor: '#e0f7fa',
    color: '#00796b',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  popular: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
});
