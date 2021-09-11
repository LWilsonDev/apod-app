import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {AppColors, BUTTON_SIZE, MENU_ICON_SIZE, Spacing} from "../../layout";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface MenuIconProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress?: () => void;
  accessLabel: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({icon, onPress, accessLabel}) => {
  return (
    <Pressable
      accessibilityLabel={accessLabel}
      onPress={onPress}
      style={[styles.pressable]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={MENU_ICON_SIZE}
        color={AppColors.light}
      />
    </Pressable>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  pressable: {
    minHeight: BUTTON_SIZE, // important for accessibility
    justifyContent: "flex-end",
    paddingBottom: Spacing.regular,
    paddingHorizontal: Spacing.regular,
  },
});
