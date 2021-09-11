import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {AppColors, BUTTON_SIZE, PEEP_BTN_HEIGHT} from "../../layout";
import {MaterialIcons} from "@expo/vector-icons";

interface PeepButtonProps {
  onPress: () => void;
  accessLabel: string;
}

const PeepButton: React.FC<PeepButtonProps> = ({onPress, accessLabel}) => {
  return (
    <Pressable
      style={{width: "100%"}}
      accessibilityRole={"button"}
      accessibilityLabel={accessLabel}
      onPress={onPress}
    >
      <View style={styles.drag}>
        <MaterialIcons name={"drag-handle"} size={30} color={AppColors.light} />
      </View>
    </Pressable>
  );
};

export default PeepButton;

const styles = StyleSheet.create({
  drag: {
    height: PEEP_BTN_HEIGHT,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
