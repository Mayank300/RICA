import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import SplashScreen from '../screens/SplashScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen';
import {Icon} from 'react-native-elements';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions : {
      drawerIcon: <Icon name="home" type="feather" />
    }
  },
  MyDonations : {
    screen : MyDonationScreen,
    navigationOptions : {
      drawerIcon: <Icon name="dollar-sign" type ="feather" />,
      drawerLabel : "Sell Products"
    }
  },
  Buy : {
    screen : BookRequestScreen,
    navigationOptions : {
      drawerIcon: <Icon name="credit-card" type ="feather" />,
      drawerLabel : "Buy Products"
    }
  },
  Notification : {
    screen : NotificationScreen,
    navigationOptions : {
      drawerIcon: <Icon name="bell" type ="feather" />,
      drawerLabel : "Notifications"
    }
  },
  MyReceivedBooks :{
    screen: MyReceivedBooksScreen,
    navigationOptions : {
      drawerIcon: <Icon name="arrow-down-circle" type ="feather" width={30} />,
      drawerLabel : "My Received Products"
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions : {
      drawerIcon: <Icon name="settings" type ="feather" width={30} />,
      drawerLabel : "Setting"
    }
  },
  LogOut : {
    screen : SplashScreen,
    navigationOptions : {
      drawerIcon: <Icon name="log-out" type ="feather" width={30} />,
      drawerLabel : "Logout"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
