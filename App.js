import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator'


export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  Screen1:{screen: Screen1},
  Screen2:{screen: Screen2},
  SplashScreen:{screen: SplashScreen},
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer =  createAppContainer(switchNavigator);
