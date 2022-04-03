import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import {baseAPI} from './General_files/Base_Api';

const base_api = baseAPI;

import {
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import FormData from 'form-data';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'on',
      cameraType: 'back',
      databaseitemlist: [],
      password: '',
      Cart_number: '',
      itemlist: [
        {
          barcodedata: '8906010501488',
          barcodeType: 'EAN_13',
          name: 'CHIPS',
          price: 5,
        },
      ],
    };

    this.handlepassword = this.handlepassword.bind(this);
    this.handleCart_number = this.handleCart_number.bind(this);
  }
  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Cart_id');

      if (value != null) {
        // We have data!!
        this.setState({Cart_number: value});
        this.login(false);
      }
    } catch (error) {
      console.log(error);
      console.log('Cant find name');
      // Error retrieving data
    }
  };

  login = async (manual) => {
    let itemlist = [];

    let form = new FormData();
    form.append('cart_token', this.state.Cart_number);
    console.log(form);
    try {
      let Response = await base_api.post('/Cart_login/', form);

      console.log(Response.data);
      if (Response.data.Status == 'Login successful') {
        if (manual == true) {
          try {
            await AsyncStorage.setItem('Cart_id', this.state.Cart_number);

            this.props.navigation.navigate('Home');

          } catch (error) {
            // Error saving data
            console.log(error);
            console.log('there is an issue in loggin in');
          }
        }

        else
        {
          this.props.navigation.navigate('Home');

        }
      } else if (Response.data.Status == 'Cart is in use') {
        ToastAndroid.show(
          'Please use different account its already in use',
          ToastAndroid.SHORT,
        );
      }
    } catch (err) {
      console.log(err);
      alert('their ia an error while getting items!');
    }
  };

  handlepassword(e) {
    this.setState({password: e});
  }

  handleCart_number(e) {
    this.setState({Cart_number: e});
  }

  render() {
    Orientation.lockToLandscape();

    return (
      <View
        style={{
          flex: 1,
          borderColor: '#46e16a',
        }}>
        <View
          style={{
            backgroundColor: '#2a2727',
            paddingHorizontal: 0,
            paddingBottom: 0,
          }}>
          <View style={styles.Text}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 26,
                color: 'white',
              }}>
              Smart Cart Service
            </Text>
          </View>
        </View>

        <View style={styles.Input}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 26,
              width: '30%',
              color: 'blue',
            }}>
            Cart Number :
          </Text>
          <TextInput
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 26,
              width: '70%',
              borderWidth: 2,
              color: 'black',
            }}
            onChangeText={this.handleCart_number}
          />
        </View>

        {/*<View style={styles.Input}>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      fontWeight: 'bold',*/}
        {/*      textAlign: 'center',*/}
        {/*      fontSize: 26,*/}
        {/*      width: '30%',*/}
        {/*      color: 'blue',*/}
        {/*    }}>*/}
        {/*    Password :*/}
        {/*  </Text>*/}

        {/*  <TextInput*/}
        {/*    style={{*/}
        {/*      fontWeight: 'bold',*/}
        {/*      textAlign: 'center',*/}
        {/*      fontSize: 26,*/}
        {/*      width: '70%',*/}
        {/*      borderWidth: 2,*/}
        {/*      color: 'black',*/}
        {/*    }}*/}
        {/*    onChangeText={this.handlepassword}*/}
        {/*  />*/}
        {/*</View>*/}

        <View style={{height: '30%'}}>
          <Button
            buttonStyle={{
              borderWidth: 2,
              width: '30%',
              alignSelf: 'center',
              borderRadius: 15,
              marginBottom: 25,
            }}
            title={'login'}
            onPress={() => {
              this.login(true);
            }}
          />

          <Button
            buttonStyle={{
              borderWidth: 2,
              width: '30%',
              alignSelf: 'center',
              borderRadius: 15,
            }}
            title={'Register'}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
          />
        </View>
      </View>
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
    fontSize: 18,
    color: 'black',
  },

  Input: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 15,
    margin: 20,
    width: '80%',
    height: '15%',
    flexDirection: 'row',
  },
});

export default Login;
