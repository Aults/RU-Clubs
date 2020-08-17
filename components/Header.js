import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

export default function Header(props) {
  return (
    <View style={styles.head}>
      <Text style={styles.textS}>RU Clubs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    height: '10%',
    justifyContent: 'center',
    backgroundColor: '#BC3F33'
  },
  textS: {
    paddingTop: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
  }
})