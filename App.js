/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import Bill from './appFiles/Bill';
import BarcodeScan from './appFiles/BarcodeScan';
import Login from './appFiles/login';
import Register from './appFiles/Register';

import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {'' == null ? (
            <>
              <Stack.Screen name="Home" component={BarcodeScan} />
            </>
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Home" component={BarcodeScan} />
              <Stack.Screen name="Bill" component={Bill} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
