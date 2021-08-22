import React from "react";
import {StyleSheet, Text, View, Image, useWindowDimensions} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

interface ApodImageProp {
  uri: string;
  onPress: () => void;
}

const ApodImage: React.FC<ApodImageProp> = ({uri, onPress}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View>
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
        />
      </ImageZoom>
    </View>
  );
};

export default ApodImage;

const styles = StyleSheet.create({
  image: {},
});
