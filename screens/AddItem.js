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
  const [name, setName] = useState("Event name (*)")
  const [desc, setDesc] = useState('Event description (*)')
  const [link, setLink] = useState("Event link")
  const [image, setImage] = useState("Event image")
  const handleChangeName = e => {
    if(e.nativeEvent.text.toString().substring(0,13) == "Event name (*") {
      setName("")
    } else {
      setName(e.nativeEvent.text.toString())
    }
  };
  const handleChangeDesc = e => {
    if(e.nativeEvent.text.toString().substring(0,20) == "Event description (*") {
      setDesc("")
    } else {
      setDesc(e.nativeEvent.text.toString())
    }
  };
  const handleChangeLink = e => {
    if(e.nativeEvent.text.toString().substring(0,9) == "Event lin") {
      setLink("")
    } else {
      setLink(e.nativeEvent.text.toString())
    }
  };
  const handleChangeImage = e => {
    if(e.nativeEvent.text.toString().substring(0,10) == "Event imag") {
      setImage("")
    } else {
      setImage(e.nativeEvent.text.toString())
    }
  };
  const handleSubmit = () => {
    if(name == "Event name" || name == "") {
      Alert.alert('Please enter a name for the event')
    } else if(desc == "Event description" || desc == "") {
      Alert.alert('Please enter a description for the event')
    } else if(selectedDate == "N/A") {
      Alert.alert('Please select a date and time')
    } else {
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
    setSelectedDate(currentDate.toString())
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
    <View>
      <Text style={styles.title}>Add Item</Text>
      <TextInput style={styles.itemInputName} value={name} onChange={handleChangeName} />
      <TextInput style={styles.itemInputDescription} value={desc} multiline={true} onChange={handleChangeDesc} />
      <TextInput style={styles.itemInputLink} value={link} multiline={false} onChange={handleChangeLink} />
      <TextInput style={styles.itemInputImage} value={image} multiline={false} onChange={handleChangeImage} />
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
          mode={mode}
          minimumDate={new Date(2020, 0, 1)}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableHighlight
        style={styles.greenButton}
        underlayColor="white"
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
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