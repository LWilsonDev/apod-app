import React, {useEffect, useState} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {ApodData, APODResponse, fetchData} from "../api/api";
import ApodImage from "../components/ApodImage";
import {
  AppColors,
  BORDER_RADIUS,
  BUTTON_SIZE,
  configNoSpring,
  configWithSpring,
  OPACITY,
  PEEP_SIZE,
  spacing,
} from "../../layout";
import Animated, {
  Extrapolate,
  interpolate,
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
import {MaterialCommunityIcons} from "@expo/vector-icons";

const MENU_ICON_SIZE = 40;
const TOP_BAR = PEEP_SIZE + spacing.regular;

const Home = () => {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPeep, setShowPeep] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const {height} = useWindowDimensions();

  const INFO_OPEN = TOP_BAR - spacing.double;
  const INFO_HEIGHT = height - INFO_OPEN;
  const INFO_CLOSED = INFO_HEIGHT;

  const INFO_PEEP_SHOW = INFO_HEIGHT - PEEP_SIZE;

  const infoYPosition = useSharedValue(INFO_CLOSED);

  const snapPointsY = [height, TOP_BAR - spacing.double];
  const animInfoStyle = useAnimatedStyle(() => {
    return {
      height: INFO_HEIGHT, // The info text height should always be most of the screen, regardless of content size
      transform: [{translateY: infoYPosition.value}],
    };
  });

  const topMenuAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      infoYPosition.value,
      [INFO_CLOSED, INFO_PEEP_SHOW],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

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
      infoYPosition.value = withSpring(snapPointY, configNoSpring, () => {
        runOnJS(setShowPeep)(false);
      });
    },
  });

  const handlePeepPress = () => {
    const position = showPeep ? INFO_OPEN : INFO_CLOSED;
    infoYPosition.value = withSpring(position, configNoSpring);
    setShowPeep(false);
  };

  const handleImagePress = () => {
    //When the image is pressed, we show the peep of the info
    // If it's pressed again, hide the info
    if (showPeep) {
      // hide
      infoYPosition.value = withSpring(INFO_CLOSED, configNoSpring);
    } else {
      infoYPosition.value = withSpring(INFO_PEEP_SHOW, configWithSpring);
    }
    setShowPeep(!showPeep);
  };

  useEffect(() => {
    // Get today's apod on first load
    if (apod) {
      return;
    }
    setLoading(true);

    try {
      fetchData().then((res: APODResponse) => {
        if (res.success && res.data) {
          setApod(res.data);
        } else if (res.error) {
          setError(res.error);
        }
        setLoading(false);
      });
    } catch (e) {
      setError("Houston, we have a problem...");
      setLoading(false);
    }
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
                <PeepButton onPress={handlePeepPress} />
              </Animated.View>
            </PanGestureHandler>
            <InfoText apod={apod} />
          </Animated.View>
        )}
      </View>
      <Animated.View style={[styles.starContainer, topMenuAnimatedStyle]}>
        <Pressable style={[styles.pressable]}>
          <MaterialCommunityIcons
            name={"menu"}
            size={MENU_ICON_SIZE}
            color={AppColors.light}
          />
        </Pressable>
        <Pressable
          onPress={() => setIsFavourite(!isFavourite)}
          style={[styles.pressable]}
        >
          <MaterialCommunityIcons
            name={isFavourite ? "star" : "star-outline"}
            size={MENU_ICON_SIZE}
            color={AppColors.light}
          />
        </Pressable>
      </Animated.View>
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
  pressable: {
    minHeight: BUTTON_SIZE, // important for accessibility
    justifyContent: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.regular,
    height: TOP_BAR,
    width: "100%",
    backgroundColor: AppColors.semiDark,
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: AppColors.semiDark,
    opacity: OPACITY,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
});
