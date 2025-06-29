import COLORS from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import InputField from "../../components/TextInputs/InputField";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import api from "@/hooks/api";
import FONTS from "@/constants/Fonts";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = { name, email, password };
      console.log("Sending signup data:", payload);
      const response = await api.post("/register", payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup success:", data);
      Alert.alert("Success", "Registered successfully!");
      router.push("/login"); // redirect after signup
    },
    onError: (error: any) => {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Signup failed.");
    },
  });

  const handleSubmit = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    registerUser(); // triggers mutation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>

      <InputField
        iconName="user"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <InputField
        iconName="envelope"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        iconName="lock"
        placeholder="Create a password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton
        label={isLoading ? "Signing Up..." : "Sign Up"}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      <View style={styles.loginRow}>
        <Text style={styles.loginPrompt}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialTitle}>Or sign up with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="mic-external-off" size={20} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="facebook" size={20} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="apple" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 32,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_INVERSE,
    marginBottom: 30,
  },
  loginRow: {
    flexDirection: "row",
    marginTop: 25,
  },
  loginPrompt: {
    color: COLORS.TEXT_INVERSE,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  loginLink: {
    color: COLORS.ACCENT,
    fontFamily: Fonts.SEMI_BOLD,
  },
  socialLoginContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  socialTitle: {
    color: COLORS.TEXT_INVERSE,
    fontFamily: Fonts.SEMI_BOLD,
    marginBottom: 12,
  },
  socialIcons: {
    flexDirection: "row",
  },
  iconCircle: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 2,
  },
});
