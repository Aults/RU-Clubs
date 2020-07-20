import React, { Component, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
import ReadMore from 'react-native-read-more-text';
import Hyperlink from 'react-native-hyperlink'

function Follow(props) {
  if(props.user==null) return(<></>)
  const userid = props.user.id
  let itemsRef = props.firebase.ref('users/' + userid);
  const [following, setFollowing] = useState([""])

  itemsRef.once('value').then(function(snapshot) {
    if(snapshot.val() != null) {
      setFollowing(snapshot.val().following)
    }
  });

  const onFollowPress = (user, firebase, item) => {
    var followArr = following
    if(followArr == null) followArr=[]
    if(!followArr.includes(item.toLowerCase())){
      followArr.push(item.toLowerCase())
      setFollowing(followArr)
      firebase.ref('users/' + user.id).update({following: followArr});
    }
  }

  const onFollowingPress = (user, firebase, item) => {
    var followArr = following
    if(followArr == null) followArr=[]
    if(followArr.includes(item.toLowerCase())){
      followArr.splice(followArr.indexOf(item.toLowerCase()), 1)
      setFollowing(followArr)
      firebase.ref('users/' + user.id).update({following: followArr});
    }
  }
  if(following != null && props.item.name != "" && following.includes(props.item.name.toLowerCase())) {
    return(
      <View style={{marginLeft: '0%'}}>
        <TouchableOpacity style={styles.FollowButtonStyle} onPress={() => onFollowingPress(props.user, props.firebase, props.item.name)} activeOpacity = { .5 }>
          <Text style={styles.TextStyleRed}>Following</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return(
    <View style={{marginLeft: '0%'}}>
      <TouchableOpacity style={styles.FollowButtonStyle} onPress={() => onFollowPress(props.user, props.firebase, props.item.name)} activeOpacity = { .5 }>
        <Text style={styles.TextStyleRed}>Follow</Text>
      </TouchableOpacity>
    </View>
  )
}

function Invitation(props) {
  var link = props.item.link
  if(link == undefined || link == "" || link == "Event link") {return (<></>)}
  if(link.substring(0,8) != "https://") {
    link = "https://" + link
  }
  return(
    <View style={{marginLeft: '0%'}}>
      <TouchableOpacity style={styles.InvitationButtonStyle} onPress={ ()=>{ Linking.openURL(link)}} activeOpacity = { .5 }>
        <Text style={styles.InvitationText}>Invitation</Text>
      </TouchableOpacity>
    </View>
  )
}

function Thumbnail(props) {
  var url = props.item.image
  if(url == null || url == "" || url == "Event image" || url.indexOf(".") == -1) {return(<></>)}
  if(url.substring(0,8) != "https://") {
    url = "https://" + url
  }
  return(
    <View style={{}}>
      <TouchableOpacity
        style={{alignSelf:'center'}}
        //onPress={ ()=>{ Linking.openURL(url)}}
        activeOpacity = { 1 }
      >
          <Image
            source={{uri:url}}
            fadeDuration={0}
            // resizeMode='contain'
            style={{width: Dimensions.get('window').width+3, resizeMode:'stretch', height: 500}}
          />
      </TouchableOpacity>

    </View>
  )
}

function CheckExpiration(props) {
  var d = new Date();
  var curr = d.getTime();
  if(props.item.timeMilli < curr) {
    var query = db.ref('items').orderByChild("name").equalTo(props.item.name);
    query.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        let checkRef = db.ref('items').child(child.key);
        checkRef.once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            child.ref.remove();
          })
        })
      });
    });
  }
  return (<></>)
}

function ProfilePic(props) {
  if(props.uri == null || props.uri == "") return(<View style={{width:70}}></View>)
  return (
    <View style={{paddingLeft: 4}}>
      <Image
        source={{uri:props.uri}}
        fadeDuration={0}
        // resizeMode='contain'
        style={{width: 70, marginTop: 5, height: 70, borderRadius: 70 / 2, overflow: "hidden", borderWidth: 1.5,borderColor: "black"}}
      />
    </View>
  )
}

function InitialComp(props) {
  if(props.item.name=="ADMINSINGULAREVENT918") return(<></>)
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: 'gray'}} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: 'gray'}} onPress={handlePress}>
        Show less
      </Text>
    );
  }
  const _handleTextReady = () => {
    // ...
  }
  
  return(
    <View key={props.index}>
      <View style={styles.item}>
        <CheckExpiration item={props.item}/>
        <View style={{flex:1, justifyContent: "space-between", flexDirection:'row'}}> 
        {/* Profile Pic VS Info */}
          <ProfilePic uri={props.item.profilePic}/>
          <Invitation item={props.item}/>
          <Follow firebase={props.firebase} item={props.item} user={props.user} />
        </View>
        <View style={{paddingLeft: 3, flexDirection:'column', width: '100%'}}>
        {/* Name, description, and time */}
          <Text style={styles.itemtext}>{props.item.name}</Text>
          <Hyperlink linkStyle={{ color: '#2980b9'}} linkDefault={ true }>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
              onReady={_handleTextReady}
            >
              <Text style={styles.cardTextDescription}>
                {props.item.description}
              </Text>
            </ReadMore>
          </Hyperlink>
          <Thumbnail item={props.item}/>
          <Text>{props.item.timeString}</Text>
        </View>
      </View>
    </View>
  )
}
export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  render() {
    return (  
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <InitialComp key={index} index={index} firebase={this.props.firebase} item={item} user={this.props.user}/>
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
  cardTextDescription: {
    fontSize: 16,
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  TextStyleRed:{
    color:'#ffff',
    textAlign:'center',
    padding: 5,
    fontSize: 20
  },
  FollowButtonStyle: {
    marginTop: 10,
    width:100,
    height:40,
    right: 20,
    backgroundColor:'#ff5e62',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#ff5e62'
  },
  InvitationText: {
    color:'white',
    textAlign:'center',
    padding: 5,
    fontSize: 20
  },
  InvitationButtonStyle: {
    marginTop: 10,
    width:160,
    height:40,
    right: 20,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#6666ff',
    backgroundColor:'#6666ff',
  },
  item: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
  }
});
