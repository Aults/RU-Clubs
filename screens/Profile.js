import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Platform,
  Button,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import Header from '../components/HeaderBack';
import { firebase } from '../configRegistration';
import { db } from '../config';


let updateProf = (name, emailE, profilePicture, firebase, user) => {
  firebase.firestore().collection('users').doc(user.id).update({
    fullName:name,
    email:emailE,
    picture:profilePicture
  })
};

function ProfileComponent(props) {
  const [name, setName] = useState("Name (*)")
  const [email, setEmail] = useState('Email (*)')
  const [profilePicture, setProfilePicture] = useState("Profile Picture (*)")
  const handleChangeName = e => {
    if(e.nativeEvent.text.toString().substring(0,7) == "Name (*") {
      setName("")
    } else {
      setName(e.nativeEvent.text.toString())
    }
  };
  const handleChangeEmail = e => {
    if(e.nativeEvent.text.toString().substring(0, 8) == "Email (*") {
      setEmail("")
    } else {
      setEmail(e.nativeEvent.text.toString())
    }
  };
  const handleChangeProfilePicture = e => {
    if(e.nativeEvent.text.toString().substring(0,9) == "Profile Picture (*)") {
      setProfilePicture("")
    } else {
      setProfilePicture(e.nativeEvent.text.toString())
    }
  };
  const handleSubmit = () => {
    if(name == "Name" || name == "") {
      Alert.alert('Please enter a name')
    } else if(email == "Email" || email == "") {
      Alert.alert('Please enter an email')
    } else if(profilePicture == "Profile Picture (Link)" || profilePicture == "") {
      Alert.alert('Please enter a direct link for a profile picture')
    } else {
      updateProf(name, email, profilePicture, firebase, props.user);
      Alert.alert('Profile saved successfully');
      props.nav.navigate('Home')
    }
  };

  return (
    <View>
      <Text style={styles.title}>Update Profile</Text>
      <TextInput style={styles.itemInputName} value={name} onChange={handleChangeName} />
      <TextInput style={styles.itemInputDescription} value={email} multiline={true} onChange={handleChangeEmail} />
      <TextInput style={styles.itemInputProfilePicture} value={profilePicture} multiline={false} onChange={handleChangeProfilePicture} />
      <TouchableHighlight
        style={styles.greenButton}
        underlayColor="white"
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableHighlight>
    </View>
  );
  
}
export default function Profile({route, navigation}) {
  const { user } = route.params;
  const { firebase } = route.params;

  console.log("User is here!" + user.id)
  return (
    <>
      <Header nav={navigation}/>
      <View style={styles.main}>
        <ProfileComponent nav={navigation} firebase={firebase} user={user}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  timeRegion: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  itemInputName: {
    height: 50,
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
  },
  itemInputDescription: {
    height: 150,
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  itemInputProfilePicture: {
    height: 50,
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  buttonText: {
    fontSize: 14,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    width: 160,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  greenButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});