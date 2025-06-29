import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import InputField from "../../components/TextInputs/InputField";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import api from "@/hooks/api";
import FONTS from "@/constants/Fonts";
import useAuthStore from "../Store/authStore";
import CustomLoader from "@/components/Loader/CustomLoader";

const LogOut = () => {
  const [email, setEmail] = useState("Harsha01@gmail.com");
  const [password, setPassword] = useState("Qazxcqazxc@01");
    const loginToStore = useAuthStore((state) => state.login);

  const router = useRouter();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { email, password };
      console.log("Sending login data:", payload);
      const response = await api.post("/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
loginToStore({
        name: data.name || "User",
        email: data.email,
      });
      router.push("/GetLocation"); // Replace with your home screen
    },
    onError: (error: any) => {
      console.error("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", error?.response?.data?.message || "Invalid credentials");
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password");
      return;
    }
 loginUser({ email, password }); // <-- payload passed here
  };

  return (
    <View style={styles.container}>

       {isPending && <CustomLoader />}
      <Text style={styles.headerText}>Login</Text>



      <InputField
        iconName="envelope"
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        iconName="lock"
        placeholder="Password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsRow}>
        <TouchableOpacity>
          <Text style={styles.rememberText}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        label={isPending ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isPending}
      />

      <View style={styles.registerRow}>
        <Text style={styles.registerPrompt}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/Signup")}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialTitle}>Or login with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="google" size={22} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="facebook" size={22} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialIcons name="apple" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogOut;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 32,
    fontFamily: FONTS.SEMI_BOLD,
    color: Colors.TEXT_INVERSE,
    marginBottom: 30,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  rememberText: {
    color: Colors.TEXT_INVERSE,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  forgotText: {
    color: Colors.ACCENT,
    fontFamily: FONTS.SEMI_BOLD,
  },
  registerRow: {
    flexDirection: "row",
    marginTop: 30,
  },
  registerPrompt: {
    color: Colors.TEXT_INVERSE,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  registerLink: {
    color: Colors.ACCENT,
    fontFamily: FONTS.SEMI_BOLD,
  },
  socialLoginContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  socialTitle: {
    color: Colors.TEXT_INVERSE,
    fontFamily: FONTS.MEDIUM,
    marginBottom: 12,
  },
  socialIcons: {
    flexDirection: "row",
  },
  iconCircle: {
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: 28,
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
  },
});
