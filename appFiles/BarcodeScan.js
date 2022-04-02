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

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {PermissionsAndroid, SafeAreaView, StatusBar} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

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

export class BarcodeScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      light: false,
      cameraType: 'back',
      cameraview: false,

      itemlist: [
        {
          barcodedata: '1234567891012',
          barcodeType: 'EAN_13',
          name: 'dummy',
          price: 5,
        },

      ],
      databaseitemlist: [],
      Processing: false,

      selectedorder: {},
      Total: 0,
      TotalItem: 0,
    };
  }

  componentDidMount() {
    this.getitemlist();

    let order = this.state.itemlist;
    let Total = 0;
    for (let i = 0; i < order.length; i++) {
      Total = Total + order[i].price;
    }
    this.setState({Total: Total});
  }

  getitem(id, type) {
    console.log(id, type);
    let productlist = this.state.databaseitemlist;

    for (var i = 0; i < productlist.length; i++) {
      console.log(productlist[i]);
      if (
        id.toString() == productlist[i].barcodedata.toString() &&
        type.toString() == productlist[i].barcode_type.toString()
      ) {
        let itemdetail = {
          barcodedata: id,
          barcodeType: type,
          name: productlist[i].name,
          price: productlist[i].price,
          status: 'sucess',
        };

        return itemdetail;
      } else if (i == productlist.length - 1) {
        let itemdetail = {
          status: 'cantfind',
        };

        return itemdetail;
      }
    }
  }

  barcodeReceived = async e => {
    console.log(e);
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);

    if (this.state.Processing == false) {
      this.setState({Processing: true});
      let item_present = false;
      let items = this.state.itemlist;
      console.log(items.length);

      for (let i = 0; i < items.length; i++) {
        console.log('comparing details');
        console.log(e.data, items[i]);
        if (e.data == items[i].barcodedata) {
          item_present = true;
        }
      }
      console.log('item_present');

      console.log(item_present);

      if (!item_present) {
        let new_item = this.getitem(e.data, e.type);
        console.log(new_item);
        if (new_item.status == 'sucess') {
          console.log(new_item);
          items.push(new_item);
          console.log(items[0]);
          let Total = this.state.Total;
          Total += new_item.price;
          this.setState({itemlist: items, Total: Total});
          ToastAndroid.show('Item added', ToastAndroid.SHORT);
        } else if (new_item.status == 'cantfind') {
          console.log('Cant Recogonize the item');
          ToastAndroid.show('Barcode product not found', ToastAndroid.SHORT);
        }
      }
      this.setState({Processing: false});
    }
  };

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
    let orderlist = [];

    this.state.itemlist.map((item, i) => {
      orderlist.push(
        <ListItem
          containerStyle={{
            backgroundColor: 'white',
            borderRadius: 15,
          }}
          style={{
            marginVertical: 0,
            elevation: 2,
            shadowColor: 'white',
            borderRadius: 15,
            borderWidth: 2,
          }}
          key={i}
          bottomDivider>
          <ListItem.Content key={i} style={{}}>
            <View
              style={{
                flexDirection: 'row',
                height: 25,
                alignItems: 'center',
                width: '100%',
                padding: 2,
              }}>
              <View
                style={{
                  height: '100%',
                  borderColor: 'black',
                  width: '10%',
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                  {i + 1}
                </Text>
              </View>

              <View style={{height: '100%', width: '65%'}}>
                <Text
                  style={{
                    color: 'black',
                    marginStart: 10,
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '25%',

                  justifyContent: 'center',
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                  {item.price} Rs
                </Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>,
      );
    });

    let cameraview = [];
    if (this.state.cameraview == true) {
      cameraview.push(
        <View
          key={'60'}
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <QRCodeScanner
            onRead={this.barcodeReceived}
            flashMode={
              this.state.light
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            markerStyle={{
              alignSelf: 'center',
              height: 200,
              width: 200,
              opacity: 0.5,
              borderColor: 'black',
            }}
            cameraStyle={{alignSelf: 'center', height: '93%', width: '90%'}}
            showMarker={true}
            key={'60'}
          />
        </View>,
      );
    } else {
      cameraview.push(
        <View
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', color:"black", fontSize: 36}}>Camera is Off</Text>
        </View>,
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{height: '12%', width: '100%', flexDirection: 'row'}}>
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

        <View style={{flex: 1, marginBottom: '8%'}}>
          <View
            style={{
              height: '10%',
              backgroundColor: 'black',
            }}>
            <Text
              style={{
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Orderlist
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                height: 25,
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  height: '100%',
                  borderColor: 'black',
                  width: '10%',
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>Sr.No</Text>
              </View>

              <View style={{height: '100%', width: '65%'}}>
                <Text
                  style={{
                    color: 'black',
                    marginStart: 10,
                    textAlign: 'center',
                  }}>
                  Name
                </Text>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '25%',

                  justifyContent: 'center',
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>Price</Text>
              </View>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: 5,
              paddingBottom: 20,
            }}
            scrollEnabled={true}>
            {orderlist}
          </ScrollView>

          <View
            style={{
              height: '10%',
              borderRadius: 10,
              marginBottom: '10%',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                style={{
                  width: '20%',
                  fontSize: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  textAlign: 'center',
                  color: 'white',
                }}>
                {this.state.itemlist.length}
              </Text>

              <Text
                style={{
                  width: '45%',
                  fontSize: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Total
              </Text>

              <Text
                style={{
                  width: '35%',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  textAlign: 'center',
                  color: 'white',
                }}>
                {this.state.Total} Rs
              </Text>
            </View>

            <View
              style={{
                height: '10%',
                alignItems: 'center',
              }}>
              <Button
                title={'Place order'}
                titleStyle={{
                  alignContent: 'center',
                  textAlign: 'center',
                }}
                buttonStyle={{
                  backgroundColor: '#5b7bd6',
                  width: '50%',
                  borderRadius: 15,
                  shadowOffset: 5,
                  height: 40,
                }}
                onPress={() => {
                  console.log('pressed');
                }}
              />
            </View>
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

export default BarcodeScan;
