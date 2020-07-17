import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TestScreen from '../screens/TestScreen';
import CPHomeScreen from '../screens/CPHomeScreen';
import SearchScreen from '../screens/SearchScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: () => getHeaderTitle(route), headerLeft: () => getHeaderLeft(route), headerRight: () => getHeaderRight(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={CPHomeScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/eva-icons/outline/png/128/home-outline.png')}
              fadeDuration={0}
              style={{width: 30, height: 30, marginTop: 20, marginBottom: 0}}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/eva-icons/outline/png/128/search-outline.png')}
              fadeDuration={0}
              style={{width: 30, height: 30, marginTop: 20, marginBottom: 0}}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={TestScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/eva-icons/fill/png/128/plus-circle.png')}
              fadeDuration={0}
              style={{width: 30, height: 30, marginTop: 20, marginBottom: 0}}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TestScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/eva-icons/outline/png/128/bell-outline.png')}
              fadeDuration={0}
              style={{width: 30, height: 30, marginTop: 20, marginBottom: 0}}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TestScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/eva-icons/outline/png/128/person-outline.png')}
              fadeDuration={0}
              style={{width: 30, height: 30, marginTop: 20, marginBottom: 0}}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
    case 'Search':
      return (
        <View
          style={{
            //backgroundColor: 'blue'
          }}>
          <Text
            style={{
              fontSize: 25,
              color: '#FF5E62',
              fontFamily: 'pacifico'
            }}>commonplace</Text>
        </View>
      );
    case 'Profile':
      return (
        <View>
          <Text
            style={{
              fontSize: 25,
              color: '#FF5E62',
              fontFamily: 'pacifico'
            }}>commonplace</Text>
        </View>
      );
    case 'Notifications':
      return (
        <>
          <Text
            style={{
              fontSize: 25,
              color: '#FF5E62',
              fontFamily: 'pacifico'
            }}>Notifications</Text>
        </>
      );
    default:
      return (
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'poppins',
            color: '#FF5E62',
          }}>TBD</Text>
      );  
  }
}

function getHeaderLeft(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
    case 'Search':
      return (
        <TouchableOpacity>
          <Image
            source={require('../assets/eva-icons/outline/png/128/email-outline.png')}
            fadeDuration={0}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>

      );
    case 'Profile':
      return (
        <TouchableOpacity>
          <Image
            source={require('../assets/eva-icons/outline/png/128/arrow-ios-back-outline.png')}
            fadeDuration={0}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      );
    case 'Notifications':
      return (
        <TouchableOpacity>
          <Image
            source={require('../assets/eva-icons/outline/png/128/arrow-ios-back-outline.png')}
            fadeDuration={0}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      );
    default:
      return (
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'poppins',
            color: '#FF5E62',
          }}>TBD</Text>
      );  
  }
}
function getHeaderRight(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
    case 'Search':
      return (
        <TouchableOpacity>
          <Image
            source={require('../assets/eva-icons/outline/png/128/more-horizontal-outline.png')}
            fadeDuration={0}
            style={{width: 25, height: 25, marginRight: 5}}
          />
        </TouchableOpacity>
      );
    case 'Profile':
      return (
        <TouchableOpacity>
          <Image
            source={require('../assets/eva-icons/outline/png/128/more-horizontal-outline.png')}
            fadeDuration={0}
            style={{width: 25, height: 25, marginRight: 5}}
          />
        </TouchableOpacity>
      );
    case 'Notifications':
      return (
        <TouchableOpacity>
          <View
            style={{width: 25, height: 25, marginRight: 5}} />
        </TouchableOpacity>
      );
    default:
      return (
        <>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'poppins',
              color: '#FF5E62',
            }}>TBD</Text>
        </>
      );  
  } 
}