import React, {Component} from 'react';

import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BarcodeScan from './BarcodeScan';
import HomeScreen from './HomeScreen';
import AddItems from './AddItems';
import Cart_list from "./Cart_list";

import {NavigationContainer} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    Orientation.lockToLandscape();

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarLabelStyle: {color: 'white', marginBottom: 5},
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: '#1e2c37',
              paddingTop: 5,
            },


            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name == 'Home') {
                iconName = 'home';
              } else if (route.name == 'BarcodeScan') {
                iconName = 'verified';
              } else if (route.name == 'AddItems') {
                iconName = 'account-circle';
              } else {
                iconName = 'list-alt';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} type="material" color="white" />;
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="BarcodeScan" component={BarcodeScan} />
          <Tab.Screen name="AddItems" component={AddItems} />
          <Tab.Screen name="Cart_list" component={Cart_list} />


        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Text: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default Home;
