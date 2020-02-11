import "react-native-gesture-handler"
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./Screens/Home";
import Chat from "./Screens/Chat";



const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Chat:{
    screen:Chat
  }
});

export default createAppContainer(AppNavigator);