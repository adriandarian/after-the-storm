import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "expo";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/homeScreen";
import TopPicksScreen from "../screens/TopPicksScreen";
import ActivitiesScreen from "../screens/activitiesScreen";
import ProfileScreen from "../screens/profileScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Food";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {/*
      <BottomTab.Screen
        name="TopPicks"
        component={TopPicksScreen}
        options={{
          title: "TopPicks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      */}
      <BottomTab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          title: "Activities",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Food"
        component={HomeScreen}
        options={{
          title: "Food",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Food":
      return "Food";
    case "Activities":
      return "Activities";
    case "Messages":
      return "Messages";
    case "Profile":
      return "Profile";
  }
}
