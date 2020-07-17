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

import { db } from '../config';

let addItem = (item, desc, timeS, timeM) => {
  db.ref('/items').push({
    name: item,
    description: desc,
    timeString: timeS,
    timeMilli: timeM
  });
};


function DatePick() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [selectedDateMilli, setSelectedDateMilli] = useState('N/A')
  const [selectedDate, setSelectedDate] = useState('N/A')
  const [show, setShow] = useState(false);
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  handleChangeName = e => {
    setName(e.nativeEvent.text)
  };
  handleChangeDesc = e => {
    setDesc(e.nativeEvent.text)
  };
  handleSubmit = () => {
    addItem(name, desc, selectedDate, selectedDateMilli);
    Alert.alert('Item saved successfully');
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
      <TextInput style={styles.itemInput} onChange={this.handleChangeName} />
      <TextInput style={styles.itemInput} onChange={this.handleChangeDesc} />
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
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
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableHighlight
        style={styles.greenButton}
        underlayColor="white"
        onPress={this.handleSubmit}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
  
}
export default class AddItem extends Component {

  render() {
    return (
      <View style={styles.main}>
        <DatePick/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 14,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
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