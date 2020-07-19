import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

export default function HeaderBack(props) {
  const handleBack = () => {
    props.nav.navigate('Home')
  };
  return (
    <View style={styles.head}>
      <TouchableOpacity
        style={{paddingTop: '13%', paddingLeft: '1%'}}
        underlayColor="white"
        onPress={handleBack}
      >
        <Image
          source={require('../assets/eva-icons/outline/png/128/arrow-back-outline.png')}
          fadeDuration={0}
          // resizeMode='contain'
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <Text style={styles.textS}>RU Clubs</Text>
      <View style={{width: 30}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  textS: {
    fontSize: 20,
    paddingTop: '13%',
    fontWeight: 'bold',
    color: 'red',
  }
})