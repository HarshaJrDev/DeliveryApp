import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import FONTS from "@/constants/Fonts";

const FoodDetailScreen = ({ route }) => {
  const [quantity, setQuantity] = useState(1);
  const item = route?.params?.item;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.image} />
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Feather name="bookmark" size={22} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.location}>📍 Florida, USA</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFA500" />
            <Text style={styles.ratingText}>{item?.rating}</Text>
            <Text style={styles.reviewCount}>(2k Reviews)</Text>
          </View>
        </View>

        <View style={styles.priceVolumeRow}>
          <Text style={styles.price}>₹ {item?.price}</Text>
          <Text style={styles.volume}>450 gr</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item?.description} Read more...
        </Text>

        <Text style={styles.sectionTitle}>Nutritional value</Text>
        <View style={styles.nutritionRow}>
          <View style={styles.nutritionBox}>
            <Text style={styles.nutritionValue}>80 g</Text>
            <Text style={styles.nutritionLabel}>Proteins</Text>
          </View>
          <View style={styles.nutritionBox}>
            <Text style={styles.nutritionValue}>25 g</Text>
            <Text style={styles.nutritionLabel}>Fats</Text>
          </View>
          <View style={styles.nutritionBox}>
            <Text style={styles.nutritionValue}>32 g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={handleDecrease}>
            <Ionicons name="remove-circle-outline" size={24} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease}>
            <Ionicons name="add-circle-outline" size={24} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 24,
    elevation: 5,
  },
  bookmarkButton: {
    position: "absolute",
    top: 40,
    right: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 24,
    elevation: 5,
  },
  detailContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  location: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  reviewCount: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  priceVolumeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  price: {
    fontSize: 22,
    color: COLORS.PRIMARY,
    fontWeight: "bold",
  },
  volume: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.TEXT_PRIMARY,
  },
  description: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  nutritionBox: {
    alignItems: "center",
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  nutritionLabel: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  addToCart: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addToCartText: {
    color: "white",
    fontSize: 15,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
