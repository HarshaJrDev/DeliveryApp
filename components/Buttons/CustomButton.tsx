import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.ACCENT,
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.BOLD,
  },
});

export default CustomButton;
