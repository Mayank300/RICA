import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import BookRequestScreen from '../screens/BookRequestScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import {Icon} from 'react-native-elements';


export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Icon name="list" type="feather" />,
      tabBarLabel : "Trade",
    }
  },
  BookRequest: {
    screen: BookRequestScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="credit-card" type="feather" />,
      tabBarLabel : "Buy",
    }
  },
  MyDonationScreen: {
    screen: MyDonationScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="inr" type="font-awesome" />,
      tabBarLabel : "Sell",
    }
  },
  MyProducts: {
    screen: MyReceivedBooksScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="arrow-down-circle" type="feather" />,
      tabBarLabel : "Products",
    }
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="bell" type="feather" />,
      tabBarLabel : "Notifs",
    }
  },
  Settings: {
    screen: SettingScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="settings" type="feather" />,
      tabBarLabel : "Settings",
    }
  },
},
{
  initialRouteName: "DonateBooks",
  activeTintColor: "white",
  shifting: true,
});
