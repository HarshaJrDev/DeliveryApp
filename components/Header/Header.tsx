import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import FONTS from "@/constants/Fonts";

const Header = ({ onPressLocation, onPressProfile, profileImage }) => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    try {
      const locationData = await AsyncStorage.getItem("userLocation");
      if (locationData) {
        const parsed = JSON.parse(locationData);
        setLocation(parsed?.address || "Your Location");
      } else {
        setLocation("Select Location");
      }
    } catch (error) {
      console.warn("Error loading user location:", error);
      setLocation("Select Location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Location Section */}
        <TouchableOpacity onPress={onPressLocation} style={styles.leftSection}>
          <Ionicons name="location-outline" size={20} color={COLORS.PRIMARY} />
          {loading ? (
            <ActivityIndicator
              size="small"
              color={COLORS.TEXT_PRIMARY}
              style={{ marginLeft: 4 }}
            />
          ) : (
            <Text numberOfLines={1} style={styles.locationText}>
              {location}
            </Text>
          )}
          <Ionicons name="chevron-down" size={18} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>

        {/* Profile Section */}
        <TouchableOpacity
          onPress={onPressProfile}
          style={styles.profileSection}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={COLORS.TEXT_PRIMARY}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:Platform.OS === "ios"?10:40

  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "75%",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: FONTS.SEMI_BOLD,
    maxWidth: "80%",
  },
  profileSection: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
