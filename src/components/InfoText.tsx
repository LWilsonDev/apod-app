import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {spacing, AppColors} from "../../layout";
import {apodResponse} from "../api/api";

interface InfoTextProps {
  apod: apodResponse;
}

const InfoText: React.FC<InfoTextProps> = ({apod}) => {
  return (
    <ScrollView>
      <Text
        style={[styles.apodText, styles.title]}
        accessibilityRole={"header"}
      >
        {apod.title}
      </Text>
      <Text style={styles.apodText}>{apod?.explanation}</Text>
      <Text style={[styles.apodText, styles.copyright]}>
        Image credits: {apod?.copyright ?? "In the public domain"}
      </Text>
    </ScrollView>
  );
};

export default InfoText;

const styles = StyleSheet.create({
  apodText: {
    marginHorizontal: spacing.regular,
    fontSize: 18,
    color: AppColors.light,
    lineHeight: 26,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: spacing.regular,
  },
  copyright: {
    fontSize: 14,
    paddingTop: spacing.double,
    paddingBottom: 100,
  },
});
