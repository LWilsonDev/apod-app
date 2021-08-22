import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, View} from "react-native";
import {AppColors} from "./layout";
import Home from "./src/screens/Home";

export default function App() {
  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppColors.dark,
  },
});
