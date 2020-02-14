import "react-native-gesture-handler"
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./Screens/Home";
import Chat from "./Screens/Chat";
import FlexB from "./Screens/FlexB";
import ChatList from "./Screens/ChatList";
import {createMaterialTopTabNavigator} from "react-navigation-tabs"
import {Ionicons, Entypo} from "@expo/vector-icons"



// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//   },
//   Chat:{
//     screen:ChatList
//   }
// });

const MyTabs = createMaterialTopTabNavigator({
  Home : ChatList,
  Status : Home,
  Call : Chat
},{
  tabBarOptions : {
    style : {
      backgroundColor : "#047a6c"
    }
  }
}
)

const stack = createStackNavigator({
  Home : MyTabs,
  Chat : Chat
},{
  defaultNavigationOptions : {
    title : "ChatApp",
    headerStyle : {
      backgroundColor : "#047a6c"
    },
    headerTintColor : "#fff",
    headerTitleStyle : {
      fontWeight : "bold"
    },
    headerRight : (
      <View style={{flexDirection:"row", margin:10}}>
        <Ionicons name="md-search" size={23} color="white"/>
        <Entypo name="dots-three-vertical" size={23} color="white"/>
      </View>
    )
  }
})

export default createAppContainer(stack);