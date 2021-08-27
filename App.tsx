import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, View} from "react-native";
import {AppColors} from "./layout";
import Home from "./src/screens/Home";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Favourites from "./src/screens/Favourites";
import Recent from "./src/screens/Recent";
import Search from "./src/screens/Search";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function App() {
  const getIconColor = (focused: boolean) => {
    return focused ? AppColors.semiDark : AppColors.light;
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerType: "front",
          drawerActiveBackgroundColor: AppColors.dark,
          drawerLabelStyle: {
            color: AppColors.light,
          },
          drawerStyle: {
            backgroundColor: AppColors.semiDark,
          },
        }}
      >
        <Drawer.Screen
          name="Today"
          component={Home}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={getIconColor(focused)}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Favourites"
          component={Favourites}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="star"
                size={size}
                color={getIconColor(focused)}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Recently viewed"
          component={Recent}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="eye"
                size={size}
                color={getIconColor(focused)}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Search by date"
          component={Search}
          options={{
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="calendar-search"
                size={size}
                color={getIconColor(focused)}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
