import "react-native-gesture-handler";
import React from "react";
import {AppColors} from "./layout";
import Apod from "./src/screens/Apod";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Favourites from "./src/screens/Favourites";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AccessibilityServiceProvider} from "./src/helpers/AccessibilityService";

const Drawer = createDrawerNavigator();

const Drawers: React.FC = () => {
  const getIconColor = (focused: boolean) => {
    return focused ? AppColors.accent : AppColors.light;
  };
  return (
    <Drawer.Navigator
      initialRouteName="APOD"
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
        name="APOD"
        component={Apod}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              accessible={false}
              name="rocket"
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
              accessible={false}
              name="star"
              size={size}
              color={getIconColor(focused)}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AccessibilityServiceProvider>
        <Drawers />
      </AccessibilityServiceProvider>
    </NavigationContainer>
  );
}
