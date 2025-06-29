import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  value: string;
  onChange: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export default function SearchBar({
  value,
  onChange,
  onFilterPress,
  placeholder = "Search...",
  disabled = false,
  style,
  inputStyle,
}: Props) {
  return (
    <View style={[styles.container, disabled && styles.disabledContainer, style]}>
      <Ionicons
        name="search-outline"
        size={20}
        color={disabled ? "#bbb" : "#bbb"}
        style={styles.icon}
      />

      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={disabled ? "#ccc" : "#bbb"}
        editable={!disabled}
      />

      <TouchableOpacity
        onPress={onFilterPress}
        style={styles.filterButton}
        disabled={disabled}
      >
        <Ionicons
          name="filter-outline"
          size={22}
          color={disabled ? "#bbb" : "#555"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 10,
  },
  disabledContainer: {
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    marginLeft: 8,
    padding: 4,
  },
});
