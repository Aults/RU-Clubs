import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import List from './List.js'
export default function Home({navigation}, props) {
  return (
    <>
      <List />
      <Button
        title="Add an Item"
        onPress={() => navigation.navigate('AddItem')}
      />
    </>
  );
}