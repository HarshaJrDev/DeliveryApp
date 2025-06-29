import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

const ProfileOptionCard = ({
  icon = 'person-outline',
  iconColor = COLORS.PRIMARY,
  title = 'Title',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}1A` }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color={COLORS.TEXT_SECONDARY} />
    </TouchableOpacity>
  );
};

export default ProfileOptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },

    // Shadow for Android
    elevation: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
});
