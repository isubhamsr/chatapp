import "react-native-gesture-handler"
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./Screens/Home";
import Chat from "./Screens/Chat";
import FlexB from "./Screens/FlexB";
import ChatList from "./Screens/ChatList";
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { Ionicons, Entypo } from "@expo/vector-icons"
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
// import LandingPage from "./Screens/LandingPage";
import LoadingScreen from "./Screens/LoadingScreen";
import MyCam from "./components/MyCam";
import RecVideo from "./components/MyCam";



// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//   },
//   Chat:{
//     screen:ChatList
//   }
// });

// const MyTabs = createMaterialTopTabNavigator({
//   Home : ChatList,
//   Status : Home,
//   // Call : Chat
// },{
//   tabBarOptions : {
//     style : {
//       backgroundColor : "#047a6c"
//     }
//   }
// }
// )

const AppNavigation = createStackNavigator({
  Home: ChatList,
  // ChatList : ChatList,
  Chat: Chat,
  MyCam: MyCam
}, {
  defaultNavigationOptions: {
    title: "ChatApp",
    headerStyle: {
      backgroundColor: "#047a6c"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Ionicons name="md-search" size={23} color="white" />
        <Entypo name="dots-three-vertical" size={23} color="white" />
      </View>
    )
  }
})

// export default createAppContainer(stack);

const AuthStack = createStackNavigator({ Home: LoginScreen, Signup: SignupScreen })

export default createAppContainer(createSwitchNavigator({
  AuthLoading: LoadingScreen,
  App: AppNavigation,
  Auth: AuthStack
}))