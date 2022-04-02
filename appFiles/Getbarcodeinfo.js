// BarcodeFormat.UPC_A
// BarcodeFormat.UPC_E
// BarcodeFormat.EAN_13
// BarcodeFormat.EAN_8
// BarcodeFormat.RSS_14
// BarcodeFormat.CODE_39
// BarcodeFormat.CODE_93
// BarcodeFormat.CODE_128
// BarcodeFormat.ITF
// BarcodeFormat.CODABAR
// BarcodeFormat.QR_CODE
// BarcodeFormat.DATA_MATRIX
// BarcodeFormat.PDF_417
import {baseAPI} from './General_files/Base_Api';

const base_api = baseAPI;
import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import AddItems from './AddItems';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PermissionsAndroid, SafeAreaView, StatusBar} from 'react-native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export class Getbarcodeinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light: false,
      cameraview: false,
      torchMode: 'on',
      cameraType: 'back',
      barcode_type: '',
      barcodedata: '',
    };
  }

  barcodeReceived = async e => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    this.setState({barcode_type: e.type, barcodedata: e.data});
  };

  camera = () => {
    requestCameraPermission;
    this.setState({cameraview: !this.state.cameraview});
  };

  light = () => {
    requestCameraPermission;
    this.setState({light: !this.state.light});

    if (this.state.torchMode == 'off') {
      this.setState({torchMode: 'on'});
    } else {
      this.setState({torchMode: 'off'});
    }
  };

  render() {
    let cameraview = [];
    if (this.state.cameraview == true) {
      cameraview.push(
        <View
          key={'50'}
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <QRCodeScanner
            onRead={this.barcodeReceived}
            flashMode={RNCamera.Constants.FlashMode.torch}
            markerStyle={{
              alignSelf: 'center',
              height: 200,
              width: 200,
              opacity: 0.5,
              borderColor: 'black',
            }}
            cameraStyle={{alignSelf: 'center', height: '95%', width: '90%'}}
            showMarker={true}
            key={'50'}
          />
        </View>,
      );
    } else {
      cameraview.push(
        <View
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 36}}>Camera is Off</Text>
        </View>,
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{height: '10%', width: '100%', flexDirection: 'row'}}>
            <Button
              buttonStyle={{flex: 3, width: '90%'}}
              title={
                this.state.cameraview ? 'Turn off Camera' : 'Turn on Camera'
              }
              onPress={this.camera}
            />

            <Button
              buttonStyle={{
                flex: 1,
                borderRadius: 20,
                backgroundColor: this.state.light ? 'black' : 'grey',
                width: '70%',
              }}
              title={this.state.light ? 'backlight off' : 'backlight on'}
              onPress={this.light}
            />
          </View>

          {cameraview}
        </View>

        <View style={{flex: 1}}>
          <View
            style={{flex: 1, backgroundColor: '#393917', flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                padding: 10,
                textAlign: 'center',
              }}>
              BarcodeValue :
            </Text>
            <Text
              style={{
                color: 'white',
                padding: 10,
                textAlign: 'center',
              }}>
              {this.state.barcodedata}
            </Text>
          </View>

          <View
            style={{flex: 1, backgroundColor: '#393917', flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                padding: 10,
                textAlign: 'center',
              }}>
              BarcodeType :
            </Text>
            <Text
              style={{
                color: 'white',
                padding: 10,
                textAlign: 'center',
              }}>
              {this.state.barcode_type}
            </Text>
          </View>
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
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default Getbarcodeinfo;
