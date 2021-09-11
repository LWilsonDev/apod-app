import moment from "moment";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppColors} from "../../layout";
import {getFavourites} from "../helpers/FavouitesHelper";
import MenuIcon from "../components/MenuIcon";
import TextButton from "../components/TextButton";
import {convertDateForApi} from "../api/api";

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

  return (
    <SafeAreaView style={styles.wrap}>
      <MenuIcon icon="menu" onPress={() => navigation.openDrawer()} />
      {favourites ? (
        favourites.map((date) => {
          return (
            <TextButton
              key={date}
              text={moment(date).format("MMMM Do YYYY")}
              accessLabel={`View favourite APOD from ${moment(date).format(
                "MMMM Do YYYY"
              )}`}
              onPress={() =>
                navigation.navigate("APOD", {
                  apodParam: convertDateForApi(date),
                })
              }
            />
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
});
