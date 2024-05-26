import { View, Text } from 'react-native'
import React from 'react'
import Home from "./screens/Home.js"
import Registartion from "./Auth/Registration.js"
import Login from "./Auth/Login.js"
import Forgetpass from "./Auth/Forgetpass.js"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen  options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="Registartion" component={Registartion} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="Forgetpass" component={Forgetpass} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}