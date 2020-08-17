import React, { Component, useState } from 'react';
import {
  View,
  ImageBackground,
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
  user.picture=profilePicture;
  user.email=emailE;
  user.fillName=name;
};

function ProfileComponent(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [profilePicture, setProfilePicture] = useState("")
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
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
        <Text style={styles.title}>Update Profile</Text>
        <TextInput
          style={styles.input}
          placeholder='Name (*)'
          placeholderTextColor="#fff"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='Email (*)'
          placeholderTextColor="#fff"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='Profile Picture (*)'
          placeholderTextColor="#fff"
          onChangeText={(text) => setProfilePicture(text)}
          value={profilePicture}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableHighlight
          style={styles.buttonSubmit}
          underlayColor="white"
          onPress={handleSubmit}
        >
          <Text style={styles.buttonSubmitTitle}>Update</Text>
        </TouchableHighlight>
      </ImageBackground>
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    backgroundColor: '#F4ECEA'
  },
  buttonSubmit: {
    backgroundColor: 'transparent',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonSubmitTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    color: '#fff',
    fontFamily: 'poppins',
    textAlign: 'center'
  },
  input: {
    height: 48,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: '#E7E1DD',
    fontFamily: 'space-mono',
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
  image:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  itemInputLink: {
    height: 50,
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  itemInputImage: {
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
    color: '#fff',
    fontFamily: 'poppins',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: 'transparent',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: 160,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
    alignItems: "center",
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