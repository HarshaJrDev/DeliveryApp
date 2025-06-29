import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={18} color="#888" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry={hidePassword}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? "eye-slash" : "eye"}
            size={18}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: 50,
    width: "100%",
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.REGULAR,
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
});

export default InputField;
