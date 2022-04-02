import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home/home';
import Login from './Auth/login';

const Stack = createNativeStackNavigator();

import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const Base = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const [darkMode, setDarkMode] = useState(true);
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEV_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        console.log('switch');
        console.log(action.userToken);

        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        console.log(action.token);
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => ({
    signIn: async (userName, status, token) => {
      let userToken;
      userToken = null;
      if (status == 'sucess') {
        try {
          userToken = token;
          await AsyncStorage.setItem('username', userName);
        } catch (e) {
          console.log(e);
        }

        try {
          userToken = token;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
      }
      //console.log('asdca')
      //console.log(userName)
      //console.log('asdca')
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async () => {
      // setuserToken(null)
      // setisLoading(false)
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log('sign out;');
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      setuserToken('fkj');
      setisLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleThemeChange = () => {
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {loginState.userToken !== null ? (
            <>
              <Stack.Screen name="HomeScreen" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={Login} />
              {/*<Stack.Screen name="Signup" component={Register} />*/}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Base;
