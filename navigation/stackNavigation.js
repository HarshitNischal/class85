import React, {Component} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from './tabNavigation';
import StoryScreen from "../screens/StoryScreen";
  
const Stack = createStackNavigator();

const StackNavigator=()=> {
  return (
    
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
          headerShown:false
      }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Story" component={StoryScreen} />
      </Stack.Navigator>
     
  );
}
export default StackNavigator