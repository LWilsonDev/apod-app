import React, {useState} from "react";
import {StyleSheet, Text, View, Image, useWindowDimensions} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import {AppColors} from "../../layout";
import {useAccessibilityService} from "../helpers/AccessibilityService";

interface ApodImageProp {
  uri: string;
  onPress: () => void;
  title: string;
}

const ApodImage: React.FC<ApodImageProp> = ({uri, onPress, title}) => {
  const {width, height} = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  return (
    <View accessible={true} accessibilityLabel={`Image showing: ${title}`}>
      {loading ? <Text style={styles.loading}>Loading image...</Text> : null}
      <ImageZoom
        onClick={onPress}
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
      >
        <Image
          style={[styles.image, {width, height, resizeMode: "contain"}]}
          source={{uri}}
          onLoadEnd={() => setLoading(false)}
        />
      </ImageZoom>
    </View>
  );
};

export default ApodImage;

const styles = StyleSheet.create({
  image: {},
  loading: {
    color: AppColors.light,
    alignSelf: "center",
  },
});
