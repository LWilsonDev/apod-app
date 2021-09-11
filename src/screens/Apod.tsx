import React, {useEffect, useState} from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {ApodData, APODResponse, convertDateForApi, fetchData} from "../api/api";
import ApodImage from "../components/ApodImage";
import {
  AppColors,
  BORDER_RADIUS,
  configNoSpring,
  configWithSpring,
  FontSize,
  OPACITY,
  PEEP_BTN_HEIGHT,
  Spacing,
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
import {StatusBar} from "expo-status-bar";
import ApodVideo from "../components/ApodVideo";
import moment from "moment";
import MenuIcon from "../components/MenuIcon";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Search from "../components/Search";
import {
  addFavourite,
  checkIfFavourite,
  removeFavourite,
} from "../helpers/FavouitesHelper";
import TextButton from "../components/TextButton";
import {useAccessibilityService} from "../helpers/AccessibilityService";

const Apod = ({navigation, route}: any) => {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPeep, setShowPeep] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const {apodParam} = route.params ?? "";

  const insets = useSafeAreaInsets();
  const PEEP_SIZE = PEEP_BTN_HEIGHT + insets.bottom;
  const TOP_BAR = PEEP_BTN_HEIGHT + insets.top;

  const {height, width} = useWindowDimensions();

  const INFO_OPEN = TOP_BAR - Spacing.double;
  const INFO_HEIGHT = height - INFO_OPEN;
  const INFO_PEEP_SHOW = INFO_HEIGHT - PEEP_BTN_HEIGHT;
  const INFO_CLOSED = isVideo ? INFO_PEEP_SHOW : INFO_HEIGHT; // peep should show all the time if its a video

  const infoYPosition = useSharedValue(INFO_PEEP_SHOW);

  const {isScreenReaderEnabled} = useAccessibilityService();

  const showInfoAllTime = isScreenReaderEnabled || isVideo;

  const snapPointsY = [INFO_CLOSED, INFO_OPEN];
  const animInfoStyle = useAnimatedStyle(() => {
    return {
      height: INFO_HEIGHT, // The info text height should always be most of the screen, regardless of content size
      transform: [{translateY: infoYPosition.value}],
    };
  });

  const topMenuAnimatedStyle = useAnimatedStyle(() => {
    const opacity = showInfoAllTime
      ? 1 // top menu should show all the time if its a video
      : interpolate(
          // else top menu only shows when peep shows
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
      let position = ctx.startY + event.translationY;
      if (position > INFO_OPEN) {
        infoYPosition.value = ctx.startY + event.translationY;
      }
    },
    onEnd: ({translationY, velocityY}) => {
      const snapPointY = snapPoint(translationY, velocityY, snapPointsY);
      infoYPosition.value = withSpring(snapPointY, configNoSpring, () => {
        runOnJS(setShowPeep)(false);
      });
    },
  });

  const getApod = (date?: string) => {
    const dateForApi = date ?? "";
    setLoading(true);
    fetchData(dateForApi).then((res: APODResponse) => {
      if (res.success && res.data) {
        setApod(res.data);
      } else if (res.error) {
        setError(res.error);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (apodParam) {
        getApod(apodParam);
      } else {
        getApod();
      }
    });

    return unsubscribe;
  }, [apodParam]);

  useEffect(() => {
    console.log("screen reader", isScreenReaderEnabled);
    if (apod) {
      if (apod.media_type === "video") {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }
      checkIfFavourite(apod.date).then((isFavourite) => {
        setIsFavourite(isFavourite);
      });
      setDate(apod.date);
    }
  }, [apod]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDatePick = (newDate: Date) => {
    const dateForApi = convertDateForApi(newDate);
    if (dateForApi !== apod?.date) {
      getApod(dateForApi);
    }
    hideDatePicker();
  };

  const handleFavourite = async () => {
    if (!apod) {
      return;
    }
    if (!isFavourite) {
      await addFavourite(apod.date);
    } else {
      await removeFavourite(apod.date);
    }
    setIsFavourite(!isFavourite);
  };

  const handlePeepPress = () => {
    const infoIsOpen = infoYPosition.value === INFO_OPEN;
    const destination = infoIsOpen ? INFO_CLOSED : INFO_OPEN;
    infoYPosition.value = withSpring(destination, configNoSpring);
    setShowPeep(false);
  };

  const handleImagePress = () => {
    // When the image is pressed, toggle peep
    const values = showPeep
      ? {to: INFO_CLOSED, config: configNoSpring}
      : {to: INFO_PEEP_SHOW, config: configWithSpring};

    infoYPosition.value = withSpring(values.to, values.config);
    setShowPeep(!showPeep);
  };

  const showHeaderContent = () => {
    let show = false;
    if (apod && !loading) {
      show = showPeep || showInfoAllTime;
    }
    return show;
  };

  return (
    <View style={styles.wrap}>
      <StatusBar hidden={true} />
      <View style={styles.view}>
        {loading ? <Text style={styles.loading}>Loading...</Text> : null}
        {error ? <Text style={styles.loading}>{error}</Text> : null}
        {apod &&
          !loading &&
          (apod.media_type === "video" ? (
            <ApodVideo
              width={width}
              height={height - TOP_BAR - PEEP_SIZE - Spacing.double}
              uri={apod?.url}
              thumbnailUri={apod.thumbnail_url ?? ""}
            />
          ) : (
            <ApodImage
              title={apod.title}
              onPress={handleImagePress}
              uri={apod.url}
            />
          ))}

        {apod && !loading && (
          <Animated.View style={[styles.infoView, animInfoStyle]}>
            <PanGestureHandler onGestureEvent={eventHandler}>
              <Animated.View style={{width: "100%"}}>
                <PeepButton
                  accessLabel={
                    showPeep ? "View Information" : "Hide Information"
                  }
                  onPress={handlePeepPress}
                />
              </Animated.View>
            </PanGestureHandler>
            <InfoText apod={apod} />
          </Animated.View>
        )}
      </View>
      <Animated.View
        style={[
          styles.starContainer,
          {height: TOP_BAR},
          isVideo ? {opacity: 1} : topMenuAnimatedStyle,
        ]}
      >
        <MenuIcon
          accessLabel={"Open menu"}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        {showHeaderContent() ? (
          <>
            <TextButton
              accessLabel={`Currently viewing ${moment(date).format(
                "MMM Do YY"
              )}. Press to open date picker`}
              text={moment(date).format("MMM Do YY")}
              onPress={showDatePicker}
            />
            <Search
              visible={isDatePickerVisible}
              onConfirm={handleConfirmDatePick}
              onCancel={hideDatePicker}
            />
            <MenuIcon
              accessLabel={
                isFavourite ? "Remove from favourites" : "Add to Favourites"
              }
              icon={isFavourite ? "star" : "star-outline"}
              onPress={handleFavourite}
            />
          </>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default Apod;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppColors.dark,
  },
  view: {
    ...StyleSheet.absoluteFillObject,
    alignContent: "center",
    justifyContent: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.regular,
    width: "100%",
    backgroundColor: AppColors.semiDark,
  },
  loading: {
    color: AppColors.light,
    alignSelf: "center",
  },

  date: {
    fontSize: FontSize.regular,
    color: AppColors.accent,
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
