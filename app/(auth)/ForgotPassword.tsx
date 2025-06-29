import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import InputField from "../../components/TextInputs/InputField";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    // TODO: integrate with backend logic
    console.log("Reset link sent to:", email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.instructions}>
        Enter your email to receive a password reset link.
      </Text>

      <InputField
        iconName="envelope"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <CustomButton label="Send Reset Link" onPress={handleResetPassword} />

      <View style={styles.backToLoginRow}>
        <Text style={styles.backPrompt}>Remember your password? </Text>
        <TouchableOpacity onPress={() => router.push("LogOut")}>
          <Text style={styles.backLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 32,
    fontFamily: Fonts.BOLD,
    color: Colors.TEXT_INVERSE,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: Colors.TEXT_INVERSE,
    fontFamily: Fonts.REGULAR,
    textAlign: "center",
    marginBottom: 30,
  },
  backToLoginRow: {
    flexDirection: "row",
    marginTop: 25,
  },
  backPrompt: {
    color: Colors.TEXT_INVERSE,
    fontFamily: Fonts.REGULAR,
  },
  backLink: {
    color: Colors.ACCENT,
    fontFamily: Fonts.BOLD,
  },
});
