import React, { Component , useState, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import List from './List.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {decode, encode} from 'base-64'
import { firebase } from '../configRegistration';
import 'react-native-gesture-handler';
import Header from '../components/Header';
import HeaderAdd from '../components/HeaderAdd';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

function ChooseHeader(props) {
  if(props.user != null && props.user.addPermission) {
    return(<><HeaderAdd firebase={props.firebase} user={props.user} nav={props.nav}/></>)
  }
  return(<><Header/></>)
}

export default function Home({route, navigation}, props) {
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
  console.log("At home" + user)
  if(user==null) {
    navigation.navigate('Login')
  }
  if(user!=null) {
    firebase.firestore().collection('users').doc(user.id).update({fullName:"AdminUpdate"})
    console.log(user.id)
    navigation.navigate('Home')
  }
  return (
    <>
      <ChooseHeader user={user} firebase={firebase} nav={navigation} />
      <List user={user} firebase={firebase} />
      <Button
        title="Add an Item"
        onPress={() => navigation.navigate('AddItem', {user:user})}
      />
    </>
  );
}