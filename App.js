import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import AddItem from './screens/AddItem';
import List from './screens/List';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import {decode, encode} from 'base-64'
import 'react-native-gesture-handler';
import useCachedResources from './hooks/useCachedResources';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} options={{gestureEnabled: false,}}/>
          <Stack.Screen name="Registration" component={Signup} options={{gestureEnabled: true,}}/>
          <Stack.Screen name="Profile" component={Profile} options={{gestureEnabled: true,}}/>
          <Stack.Screen name="AddItem" component={AddItem} options={{gestureEnabled: false,}}/>
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}