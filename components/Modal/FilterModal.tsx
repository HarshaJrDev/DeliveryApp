import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';
// Adjust the path

const filterOptions = [
  { label: 'Top Rated', icon: 'star-outline' },
  { label: 'Price: High to Low', icon: 'trending-down-outline' },
  { label: 'Price: Low to High', icon: 'trending-up-outline' },
  { label: 'Most Relevant', icon: 'thumbs-up-outline' },
  { label: 'Fastest Delivery', icon: 'bicycle-outline' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
};

export default function FilterModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modal}>
          <Text style={styles.title}>Filter Options</Text>

          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={styles.option}
              onPress={() => {
                onSelect(option.label);
                onClose();
              }}
            >
              <Ionicons
                name={option.icon}
                size={22}
                color={COLORS.PRIMARY}
                style={styles.icon}
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: COLORS.BACKGROUND_DARK,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
    fontFamily: FONTS.SEMI_BOLD,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
