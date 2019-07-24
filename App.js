import * as React from 'react';
import LoginPage from './screens/login.js';
import RegisterPage from './screens/register.js';
import Companies from './screens/companies.js';
import Guides from './screens/Guides.js';
import Restaurants from './screens/Restaurants.js';
import Tours from './screens/Tours.js';
import SignInC from './screens/signIncompany.js';
import Home from './screens/HomePage.js';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import * as firebase from 'firebase';
var config = {
  apiKey: 'AIzaSyAE9Jx2Rsb8lC9N1Gq3fplnpw_tRxqPso0',
  authDomain: 'final-project2-335b3.firebaseapp.com',
  databaseURL: 'https://final-project2-335b3.firebaseio.com',
  projectId: 'final-project2-335b3',
  storageBucket: '',
  messagingSenderId: '739331691598',
  appId: '1:739331691598:web:0b8fd2750e3406b4',
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(config);
}

const AppB = createBottomTabNavigator({
  Restaurants: {
    screen: Restaurants,
    navigationOptions: {
      tabBarLabel: 'Restaurants',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="restaurant" size={30} color="#ffc400" />
      ),
    },
  },

  Guides: {
    screen: Guides,
    navigationOptions: {
      tabBarLabel: 'Guides',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="contacts" size={30} color="#ffc400" />
      ),
    },
  },

  Tours: {
    screen: Tours,
    navigationOptions: {
      tabBarLabel: 'Tours',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="pushpin" size={30} color="#ffc400" />
      ),
    },
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Tabs: AppB,
});

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
    },
  },
  SignInC: {
    screen: SignInC,
    navigationOptions: {
      header: null,
    },
  },
  Companies: {
    screen: Companies,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      header: null,
    },
  },
});

const LoginSwitch = createSwitchNavigator({
  Login: {
    screen: LoginStack,
    navigationOptions: {
      header: null,
    },
  },
  HomeStack: HomeStack,
});

const App = createAppContainer(LoginSwitch);
export default App;
