import * as React from "react";
import { createSwitchNavigator, createAppContainer } from "@react-navigation";
import DrawerNavigator from "./navigation/drawerNavigation";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/Loading";
import DashboardScreen from "./screens/DashboardScreen";
import * as firebase from "firebase";
import {firebaseConfig} from "./Config";


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}
export default function App() {
  return (
  <AppContainer/>
  );
}
const AppContainer=createAppContainer(createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  Login:LoginScreen,
  Dashboard:DashboardScreen,
}))