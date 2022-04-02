import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import {baseAPI} from './General_files/Base_Api';

const base_api = baseAPI;

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'on',
      cameraType: 'back',
      databaseitemlist: [],
      itemlist: [
        {
          barcodedata: '8906010501488',
          barcodeType: 'EAN_13',
          name: 'CHIPS',
          price: 5,
        },
        {
          barcodedata: '150600UW0000',
          barcodeType: 'EAN_13',
          name: 'Book',
          price: 20,
        },
        {
          barcodedata: '8000500366783',
          barcodeType: 'EAN_13',
          name: 'tik tak',
          price: 9,
        },
        {
          barcodedata: '2400751',
          barcodeType: 'EAN_13',
          name: 'memory card box',
          price: 20,
        },
      ],
    };
  }

  componentDidMount() {
    this.getitemlist();
  }

  getitemlist = async () => {
    let itemlist = [];

    try {
      let itemsResponse = await base_api.get('/items/');

      console.log(itemsResponse.data);
      this.setState({databaseitemlist: itemsResponse.data});
    } catch (err) {
      console.log(err);
      alert('their ia an error while getting items!');
    }
  };

  render() {
    Orientation.lockToLandscape();

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderColor: '#46e16a',
        }}>
        <View
          style={{
            height:"25%",
            backgroundColor: '#2a2727',
            paddingHorizontal: 0,
            paddingBottom: 0,
          }}>
          <View style={styles.Input}>
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
              color: 'black',
              width: '30%',
            }}>
            Cart Number :
          </Text>

          <TextInput
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 26,
              color: 'black',
              borderWidth: 1,
              borderRadius: 25,
              width: '70%',
            }}
          />
        </View>

        <View style={styles.Input}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 26,
              color: 'black',
              width: '30%',
            }}>
            Password :
          </Text>

          <TextInput
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 26,
              color: 'black',
              borderWidth: 1,
              width: '70%',
              borderRadius: 25,
            }}
          />
        </View>

        <Button
          buttonStyle={{
            borderWidth: 5,
            width: '30%',
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 25,
            padding: 15,
            borderColor: 'grey',
          }}
          title={'login'}
        />
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
    borderWidth: 1,
    width: '80%',
    height: '25%',
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    padding: 24,
  },
});

export default Login;
