import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import AddItem from './screens/AddItem';
import List from './screens/List';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {decode, encode} from 'base-64'
import { firebase } from './configRegistration';
import 'react-native-gesture-handler';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
  if (loading) {	
    return (	
      <></>	 
    )	
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Home">
              {props => <Home {...props} extraData={user} />}
              
            </Stack.Screen>
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="List" component={List} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Registration" component={Signup} />
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="List" component={List} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}