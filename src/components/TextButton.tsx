import React from "react";
import {Pressable, PressableProps, StyleSheet, Text} from "react-native";
import {AppColors, BUTTON_SIZE, FontSize, Spacing} from "../../layout";

interface TextButtonProps extends PressableProps {
  onPress: () => void;
  text: string;
  accessLabel: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  text,
  accessLabel,
  ...props
}) => {
  return (
    <Pressable
      accessibilityLabel={accessLabel}
      style={styles.pressable}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  pressable: {
    minHeight: BUTTON_SIZE,
    justifyContent: "center",
    paddingHorizontal: Spacing.regular,
  },
  text: {
    color: AppColors.accent,
    alignSelf: "center",
    fontSize: FontSize.regular,
  },
});
