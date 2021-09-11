import React, {useCallback, useEffect, useState} from "react";
import {Alert, Linking} from "react-native";
import {StyleSheet, View} from "react-native";
import {Video, AVPlaybackStatus} from "expo-av";
import {AppColors} from "../../layout";
import TextButton from "./TextButton";

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

  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    if (status && status.error) {
      setVideoError(true);
    }
  }, [status]);

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(uri);

    if (supported) {
      await Linking.openURL(uri);
    } else {
      Alert.alert(`Unable to open this URL: ${uri}`);
    }
  }, [uri]);

  const ROOM_FOR_THUMBNAIL = height - 100;

  const videoHeight = () => {
    // If we have a thumbnail to show but no video, set the height a bit smaller to leave room for the link
    let videoHeight = height;
    if (videoError) {
      videoHeight = thumbnailUri ? ROOM_FOR_THUMBNAIL : 0;
    }
    return videoHeight;
  };

  return (
    <View style={[styles.container]}>
      <Video
        usePoster={!status?.isLoaded}
        posterSource={thumbnailUri ? {uri: thumbnailUri} : undefined}
        ref={video}
        style={[styles.video, {width, height: videoHeight()}]}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          setStatus(status);
        }}
      />
      {videoError && (
        <TextButton
          onPress={handlePress}
          text={"View video on the web"}
          accessLabel={"Leave the app to view video"}
        />
      )}
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
