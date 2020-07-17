import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ReadMore from 'react-native-read-more-text';

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: 'gray'}} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: 'gray'}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <View style={styles.item}>
                <View style={{flex:1, flexDirection:'row'}}> 
                {/* Profile Pic VS Info */}
                  <Image
                    source={require('../assets/images/profile-pic.png')}
                    fadeDuration={0}
                    // resizeMode='contain'
                    style={{width: 65, height: 65}}
                  />
                  <View style={{flexDirection:'column', width: '65%'}}>
                  {/* Name, description, and time */}
                    <Text style={styles.itemtext}>{item.name}</Text>
                    <ReadMore
                      numberOfLines={3}
                      renderTruncatedFooter={this._renderTruncatedFooter}
                      renderRevealedFooter={this._renderRevealedFooter}
                      onReady={this._handleTextReady}>
                      <Text style={styles.cardText}>
                        {item.description}
                      </Text>
                    </ReadMore>
                    <Text>{item.timeString}</Text>

                  </View>
                  <View style={{marginLeft: '3%'}}>
                    <TouchableOpacity style={styles.FollowButtonStyle} activeOpacity = { .5 }>
                      <Text style={styles.TextStyleRed}>Follow</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  TextStyleRed:{
    color:'#ff5e62',
    textAlign:'center',
    paddingTop: 2,
  },
  FollowButtonStyle: {
    marginTop: 10,
    width:80,
    height:28,
    right: 20,
    backgroundColor:'#ffff',
    borderRadius:110,
    borderWidth: 2,
    borderColor: '#ff5e62'
  },
  item: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
  }
});
