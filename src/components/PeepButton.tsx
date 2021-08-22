import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {AppColors, BUTTON_SIZE} from "../../layout";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface PeepButtonProps {
  onPress: () => void;
  showPeep: boolean;
}

const PeepButton: React.FC<PeepButtonProps> = ({onPress, showPeep}) => {
  return (
    <Pressable
      style={{width: "100%"}}
      accessibilityRole={"button"}
      accessibilityLabel={"View information"}
      onPress={onPress}
    >
      <View style={styles.drag}>
        <MaterialCommunityIcons
          name={showPeep ? "chevron-double-up" : "chevron-double-down"}
          size={24}
          color={AppColors.light}
        />
      </View>
    </Pressable>
  );
};

export default PeepButton;

const styles = StyleSheet.create({
  drag: {
    height: BUTTON_SIZE,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});