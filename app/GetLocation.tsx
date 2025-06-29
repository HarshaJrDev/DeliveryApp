import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const GetLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);
  const navigation = useNavigation();

  const handleLocationAccess = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });

      const addr = await getReverseGeocode(latitude, longitude);
      setAddress(addr);

      await AsyncStorage.setItem(
        "userLocation",
        JSON.stringify({ latitude, longitude, address: addr })
      );

      navigation.replace("(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location");
    } finally {
      setLoading(false);
    }
  };

  const getReverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        {
          headers: { "User-Agent": "MyApp/1.0 (youremail@example.com)" },
        }
      );
      const json = await response.json();
      return json?.display_name ?? "Address not available";
    } catch (e) {
      console.error("Reverse geocode error:", e);
      return "Unable to retrieve address";
    }
  };

  const searchPincode = async () => {
    if (!pincode) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`,
        {
          headers: { "User-Agent": "MyApp/1.0 (youremail@example.com)" },
        }
      );
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        setAddress(display_name);
        setShowMapModal(true);
      } else {
        Alert.alert("Not Found", "Pincode location not found");
      }
    } catch {
      Alert.alert("Error", "Failed to search pincode");
    } finally {
      setLoading(false);
    }
  };

  const renderMapModal = () => {
    if (!location) return null;
    const { latitude, longitude } = location;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <style> html, body, #map { height: 100%; margin: 0; } </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([${latitude}, ${longitude}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([${latitude}, ${longitude}]).addTo(map)
              .bindPopup('${address}').openPopup();
          </script>
        </body>
      </html>
    `;

    return (
      <Modal visible={showMapModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <WebView source={{ html }} style={styles.map} />
            <Pressable
              onPress={() => setShowMapModal(false)}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      )}

      <Image
        source={require("../assets/images/map.png")}
        style={styles.headerImage}
      />

      <Text style={styles.title}>Allow Location Access</Text>
      <Text style={styles.subtext}>
        We use your location to show services and providers near you.
      </Text>

      <Text style={styles.inputLabel}>Or enter your Pincode</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="e.g., 110001"
          value={pincode}
          onChangeText={setPincode}
          style={styles.pincodeInput}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={searchPincode}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      {address ? <Text style={styles.addressText}> {address}</Text> : null}

      <View style={styles.bottomAccess}>
        <TouchableOpacity
          style={styles.allowButton}
          onPress={handleLocationAccess}
        >
          <Text style={styles.allowText}>Allow Location Access</Text>
        </TouchableOpacity>
      </View>

      {renderMapModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.BACKGROUND_WHITE,

  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerImage: {
    width: "100%",
    height: 340,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.TEXT_SECONDARY,
    fontFamily: Fonts.POPPINS_REGULAR,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 10,
    color: Colors.TEXT_PRIMARY,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pincodeInput: {
    flex: 1,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchBtn: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    color: Colors.TEXT_INVERSE,
    fontWeight: "700",
    fontSize: 14,
  },
  allowButton: {
    backgroundColor: Colors.SECONDARY,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  allowText: {
    color: Colors.TEXT_INVERSE,
    fontSize: 16,
    fontWeight: "700",
  },
  addressText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.TEXT_PRIMARY,
    paddingHorizontal: 12,
  },
  bottomAccess: {
    marginTop: "auto",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "92%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    zIndex: 1,
  },
  closeText: {
    color: Colors.TEXT_INVERSE,
    fontWeight: "600",
  },
  map: {
    flex: 1,
  },
});

export default GetLocation;
