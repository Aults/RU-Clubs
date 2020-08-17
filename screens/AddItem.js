import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Platform,
  ImageBackground,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import Header from '../components/HeaderBack';

import { db } from '../config';

let addItem = (item, desc, timeS, timeM, linkN, imageN, user) => {
  db.ref('/items').push({
    name: item,
    description: desc,
    link: linkN,
    image: imageN,
    timeString: timeS,
    timeMilli: timeM,
    profilePic: user.picture
  });
};


function DatePick(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [selectedDateMilli, setSelectedDateMilli] = useState('N/A')
  const [selectedDate, setSelectedDate] = useState('N/A')
  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")
  const handleSubmit = () => {
    if(name == "Event name" || name == "") {
      Alert.alert('Please enter a name for the event')
    } else if(desc == "Event description" || desc == "") {
      Alert.alert('Please enter a description for the event')
    } else if(selectedDate == "N/A") {
      Alert.alert('Please select a date and time')
    } else {
      console.log(props.user)
      addItem(name, desc, selectedDate, selectedDateMilli, link, image, props.user);
      Alert.alert('Item saved successfully');
      props.nav.navigate('Home')
      console.log(props.nav)
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedDateMilli(currentDate.getTime())
    if(currentDate.getHours() > 12) {
      var hours = parseInt(currentDate.getHours(), 10)-12;
      setSelectedDate(currentDate.toLocaleDateString() + " @ " + hours + ":" + currentDate.getMinutes() + "pm")
    } else {
      var hours = currentDate.getHours();
      if(hours == 0) {
        setSelectedDate(currentDate.toLocaleDateString() + " @ " + "12" + ":" + currentDate.getMinutes() + "am")

      } else {
        setSelectedDate(currentDate.toLocaleDateString() + " @ " + hours + ":" + currentDate.getMinutes() + "am")
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput
          style={styles.input}
          placeholder='Event name (*)'
          placeholderTextColor="#fff"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='Event description (*)'
          placeholderTextColor="#fff"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          multiline={true}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='Event link'
          placeholderTextColor="#fff"
          onChangeText={(text) => setLink(text)}
          value={link}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='Event image URL'
          placeholderTextColor="#fff"
          onChangeText={(text) => setImage(text)}
          value={image}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.timeRegion}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={showDatepicker}
          >
            <Text style={styles.buttonText}>Show date picker!</Text>  
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={showTimepicker}
          >
            <Text style={styles.buttonText}>Show time picker!</Text>
          </TouchableHighlight>
        </View>
        <Text>{selectedDate}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            textColor="#ffff"
            mode={mode}
            minimumDate={new Date(2020, 0, 1)}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableHighlight
          style={styles.buttonSubmit}
          underlayColor="white"
          onPress={handleSubmit}
        >
          <Text style={styles.buttonSubmitTitle}>Add</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
  
}
export default function AddItem({ route, navigation }) {
  const { user } = route.params;

  return (
    <>
      <Header nav={navigation}/>
      <View style={styles.main}>
        <DatePick user={user} nav={navigation}/>
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