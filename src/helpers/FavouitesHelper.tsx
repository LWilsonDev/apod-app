import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVOURITES_KEY = "favourites_key";

export const getFavourites = async () => {
  try {
    const favourites = await AsyncStorage.getItem(FAVOURITES_KEY);
    console.log("got favs", favourites);
    if (favourites !== null) {
      console.log("should return favs");
      return favourites.split(",");
    }
  } catch (e) {
    console.error("error getting favourites", e);
  }
  return [];
};

const storeFavourites = async (favourites: object) => {
  console.log("storing favourites", favourites);
  const stringToStore = favourites.toString();
  try {
    await AsyncStorage.setItem(FAVOURITES_KEY, stringToStore);
  } catch (e) {
    console.log("error storing favourites", e);
  }
};

export const addFavourite = async (date: string) => {
  console.log("adding favourite", date);
  const favourites = await getFavourites();
  if (favourites && favourites.includes(date)) {
    return;
  }
  if (favourites === null) {
    storeFavourites([date]);
  } else {
    favourites.push(date);
    storeFavourites(favourites);
  }
};

export const removeFavourite = async (date: string) => {
  const favourites = await getFavourites();
  favourites.splice(favourites.indexOf(date));
  storeFavourites(favourites);
};

export const checkIfFavourite = async (date: string) => {
  const favs = await getFavourites();
  return favs && favs.includes(date);
};
