import moment from "moment";
import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  FontSize,
  AppColors,
  MENU_ICON_SIZE,
  BUTTON_SIZE,
  Spacing,
} from "../../layout";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {getFavourites} from "../helpers/FavouitesHelper";
import MenuIcon from "../components/MenuIcon";

const Favourites = ({navigation}: any) => {
  const [favourites, setFavourites] = useState<string[] | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavourites().then((dates) => {
        if (dates) {
          setFavourites(dates);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   getFavourites().then((dates) => {
  //     if (dates) {
  //       setFavourites(dates);
  //     }
  //   });
  //   return () => {
  //     setFavourites(null);
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      <MenuIcon icon="menu" onPress={() => navigation.openDrawer()} />
      {favourites ? (
        favourites.map((date) => {
          return (
            <Pressable
              key={date}
              style={styles.press}
              accessibilityLabel={`View favourite APOD from ${moment(
                date
              ).format("MMMM Do YYYY")}`}
              onPress={() =>
                navigation.navigate("APOD", {
                  apodParam: moment(date).format("YYYY-MM-DD"),
                })
              }
            >
              <Text style={styles.date}>
                {moment(date).format("MMMM Do YYYY")}
              </Text>
            </Pressable>
          );
        })
      ) : (
        <Text>No favourites yet</Text>
      )}
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.dark,
  },
  text: {
    fontSize: FontSize.large,
    color: AppColors.light,
  },
  date: {
    fontSize: FontSize.regular,
    color: AppColors.accent,
    paddingHorizontal: Spacing.regular,
  },
  press: {
    minHeight: BUTTON_SIZE,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
