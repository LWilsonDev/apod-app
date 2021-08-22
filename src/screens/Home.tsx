import axios from "axios";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {apodResponse, APOD_URL} from "../api/api";
import ApodImage from "../components/ApodImage";
import {AppColors, BUTTON_SIZE, TOP_MARGIN} from "../../layout";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {snapPoint} from "react-native-redash";
import InfoText from "../components/InfoText";
import PeepButton from "../components/PeepButton";

const Home = () => {
  const [apod, setApod] = useState<apodResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPeep, setShowPeep] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const {height} = useWindowDimensions();
  const INFO_HIDDEN = height - TOP_MARGIN;
  const INFO_SHOW = TOP_MARGIN;
  const INFO_BUTTON_SHOW = INFO_HIDDEN - BUTTON_SIZE;

  const infoYPosition = useSharedValue(INFO_HIDDEN);
  const config = {damping: 200, clamping: {overshootClamping: false}};

  const animInfoStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: infoYPosition.value}],
    };
  });

  const snapPointsY = [0, INFO_HIDDEN];
  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startY: number}
  >({
    onStart: (_, ctx) => {
      ctx.startY = infoYPosition.value;
    },
    onActive: (event, ctx) => {
      infoYPosition.value = ctx.startY + event.translationY;
    },
    onEnd: ({translationY, velocityY}) => {
      const snapPointY = snapPoint(translationY, velocityY, snapPointsY);
      infoYPosition.value = withSpring(snapPointY, config, () => {
        runOnJS(setShowPeep)(false);
      });
    },
  });

  const handleInfoPress = () => {
    if (showPeep) {
      infoYPosition.value = withSpring(INFO_SHOW, config);
      setShowPeep(false);
    } else {
      infoYPosition.value = withSpring(INFO_HIDDEN, config);
      setShowPeep(false);
    }
  };

  const handleImagePress = () => {
    //When the image is pressed, we show the peep of the info
    if (showPeep) {
      // hide
      infoYPosition.value = withSpring(INFO_HIDDEN, config);
    } else {
      // show
      infoYPosition.value = withSpring(INFO_BUTTON_SHOW, config);
    }
    setShowPeep(!showPeep);
  };

  useEffect(() => {
    if (apod) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      let data: apodResponse;
      const result = await axios(APOD_URL)
        .then((res) => {
          data = res.data;
          setLoading(false);
          setApod(data);
        })
        .catch((e) => {
          setLoading(false);
          setError("Error fetching APOD, Please try again later");
        });
    };

    fetchData();
  }, [apod]);

  return (
    <>
      <View style={styles.view}>
        {loading ? <Text style={styles.loading}>Loading...</Text> : null}
        {error ? <Text style={styles.loading}>{error}</Text> : null}

        {apod ? (
          <ApodImage onPress={handleImagePress} uri={apod.url}></ApodImage>
        ) : null}

        {apod && (
          <Animated.View style={[styles.infoView, animInfoStyle]}>
            <PanGestureHandler onGestureEvent={eventHandler}>
              <Animated.View style={{width: "100%"}}>
                <PeepButton onPress={handleInfoPress} showPeep={showPeep} />
              </Animated.View>
            </PanGestureHandler>
            <InfoText apod={apod} />
          </Animated.View>
        )}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
    alignContent: "center",
    justifyContent: "center",
  },
  loading: {
    color: AppColors.light,
    alignSelf: "center",
  },
  buttonText: {
    color: AppColors.light,
  },
  infoView: {
    position: "absolute",
    top: TOP_MARGIN,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: AppColors.semiDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
