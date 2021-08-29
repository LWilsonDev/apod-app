import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Spacing, AppColors, FontSize, LineHeight} from "../../layout";
import {ApodData} from "../api/api";

interface InfoTextProps {
  apod: ApodData;
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
      {apod.copyright ? (
        <Text style={[styles.apodText, styles.copyright]}>
          Image credits: {apod?.copyright}
        </Text>
      ) : (
        <Text style={[styles.apodText, styles.copyright]}>
          Image is in the public domain
        </Text>
      )}
    </ScrollView>
  );
};

export default InfoText;

const styles = StyleSheet.create({
  apodText: {
    marginHorizontal: Spacing.regular,
    fontSize: FontSize.regular,
    color: AppColors.light,
    lineHeight: LineHeight.regular,
  },
  title: {
    fontSize: FontSize.large,
    lineHeight: LineHeight.large,
    textAlign: "center",
    marginTop: Spacing.regular,
    marginBottom: Spacing.double,
  },
  copyright: {
    fontSize: FontSize.small,
    paddingTop: Spacing.double,
    paddingBottom: 100,
  },
});
