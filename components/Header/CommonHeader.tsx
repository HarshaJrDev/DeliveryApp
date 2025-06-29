import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import FONTS from "@/constants/Fonts";
import { useRouter } from "expo-router";

type Props = {
  title: string;
  onLeftPress?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
};

const CommonHeader: React.FC<Props> = ({
  title,
  onLeftPress,
  leftIcon = "arrow-back",
  backgroundColor = COLORS.SECONDARY,
  textColor = COLORS.TEXT_PRIMARY,
}) => {
  const router = useRouter();

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      router.back(); // Default back navigation
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.leftIcon} onPress={handleLeftPress}>
        <Ionicons name={leftIcon} size={24} color={textColor} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSpacer} />
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight ?? 24,
    paddingHorizontal: 16,
    height: Platform.OS === "ios" ? 90 : 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  leftIcon: {
    paddingRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    fontFamily: FONTS.SEMI_BOLD,
  },
  rightSpacer: {
    width: 40, // to balance space if no right icon
  },
});
