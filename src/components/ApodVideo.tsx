import React, {useRef, useState} from "react";
import {Button, useWindowDimensions} from "react-native";
import {StyleSheet, Text, View} from "react-native";
import {Video, AVPlaybackStatus} from "expo-av";
import {AppColors} from "../../layout";

interface ApodVideoProps {
  uri: string;
  thumbnailUri: string;
  height: number;
  width: number;
}

const ApodVideo: React.FC<ApodVideoProps> = ({
  uri,
  height,
  width,
  thumbnailUri,
}) => {
  const video = React.useRef(null);

  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);

  return (
    <View style={[styles.container]}>
      <Video
        usePoster={!status?.isLoaded}
        posterSource={{uri: thumbnailUri}}
        ref={video}
        style={[styles.video, {width, height}]}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default ApodVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: AppColors.dark,
  },
  video: {
    alignSelf: "center",
  },
});