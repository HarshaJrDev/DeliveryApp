import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

const CategoryButton = ({ label, icon, image, badge, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.active]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <Ionicons name={icon || 'fast-food-outline'} size={28} color={active ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY} />
        )}
        {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: COLORS.PRIMARY + '10',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1.2,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TEXT_PRIMARY,
  },
  activeLabel: {
    color: COLORS.PRIMARY,
    fontFamily: FONTS.SEMI_BOLD,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.TEXT_INVERSE,
    fontFamily: FONTS.SEMI_BOLD,
  },
});

export default CategoryButton;
