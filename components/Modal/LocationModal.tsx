
import COLORS from "@/constants/Colors";
import FONTS from "@/constants/Fonts";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";

const LocationModal = ({
  visible,
  onClose,
  location,
  address,
  setLocation,
  setAddress,
}) => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const searchPincode = async () => {
    if (!pincode) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`,
        {
          headers: {
            "User-Agent": "MyApp/1.0 (youremail@example.com)",
          },
        }
      );
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        setLocation({ latitude, longitude });
        setAddress(display_name);
      } else {
        Alert.alert("Not Found", "Pincode location not found");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to search pincode");
    } finally {
      setLoading(false);
    }
  };

  const mapHtml = location
    ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>html, body, #map { height: 100%; margin: 0; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${location.latitude}, ${
        location.longitude
      }], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          L.marker([${location.latitude}, ${location.longitude}]).addTo(map)
            .bindPopup('${address ?? "Location"}').openPopup();
        </script>
      </body>
    </html>
  `
    : "";

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {loading && (
            <ActivityIndicator
              size="large"
              color={COLORS.PRIMARY}
              style={{ marginBottom: 10 }}
            />
          )}

          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter Pincode"
              style={styles.input}
              keyboardType="numeric"
              value={pincode}
              onChangeText={setPincode}
              maxLength={6}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={searchPincode}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>

          {location && (
            <WebView
              originWhitelist={["*"]}
              source={{ html: mapHtml }}
              style={styles.map}
              javaScriptEnabled
              scrollEnabled={false}
            />
          )}

          {address ? <Text style={styles.address}>📍 {address}</Text> : null}

          <TouchableOpacity style={styles.useBtn} onPress={onClose}>
            <Text style={styles.useText}>Use This Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  inputRow: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  searchBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: "600",
    fontFamily: FONTS.SEMI_BOLD,
  },
  map: {
    height: 250,
    borderRadius: 12,
    marginTop: 10,
    overflow: "hidden",
  },
  address: {
    textAlign: "center",
    marginVertical: 10,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TEXT_PRIMARY,
  },
  useBtn: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  useText: {
    textAlign: "center",
    color: COLORS.TEXT_INVERSE,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
  },
});

export default LocationModal;
