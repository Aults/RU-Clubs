import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, ScrollView } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config';

let itemsRef = db.ref('items');

function merge(left, right) {
  let arr = [];

  while (left.length && right.length) {
    if (left[0].timeMilli < right[0].timeMilli) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return arr.concat(left.slice().concat(right.slice()));
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

export default class List extends Component {
  state = {
    items: []
  };
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      items = mergeSort(items)
      this.setState({ items });
    });
  }
  render() {
    
    return (
      <>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
          {(this.state.items.length > 0) ? (
            <ScrollView>
              <ItemComponent user={this.props.user} firebase={db} items={this.state.items} />
            </ScrollView>
          ) : (
            <Text>No items</Text>
          )}
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  image:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }, 
});