import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import FormData from 'form-data';

import {baseAPI} from './General_files/Base_Api';

const base_api = baseAPI;

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

import axios from 'axios';

const testapi = axios.create({
  baseURL: 'http://aa15-2401-4900-50a6-c0ef-f958-c9be-6321-91d8.ngrok.io/',

  headers: {
    'Content-type': 'multipart/form-data',
  },
});

export class AddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'on',
      cameraType: 'back',
      Itemname: '',
      Itemprice: '',
      ItemBarcode: '',
      ItemBarcodeType: '',
      ItemManufacturer: '',
      Weight: '',
      ItemWeight: '',
    };

    this.handleItemName = this.handleItemName.bind(this);
    this.handleItemPrice = this.handleItemPrice.bind(this);
    this.handleBarcode = this.handleBarcode.bind(this);
    this.handleBarcodeType = this.handleBarcodeType.bind(this);
    this.handleManufacturer = this.handleManufacturer.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
  }

  handleItemName(event) {
    console.log(event);
    this.setState({Itemname: event});
  }

  handleItemPrice(event) {
    console.log(event);
    this.setState({Itemprice: event});
  }

  handleBarcode(event) {
    console.log(event);
    this.setState({ItemBarcode: event});
  }

  handleBarcodeType(event) {
    console.log(event);
    this.setState({ItemBarcodeType: event});
  }

  handleManufacturer(event) {
    console.log(event);
    this.setState({ItemManufacturer: event});
  }
  handleWeight(event) {
    console.log(event);
    this.setState({ItemWeight: event});
  }

  addItem = async () => {
    let itemlist = [];

    if (
      this.state.Itemname != '' &&
      this.state.Itemprice != '' &&
      this.state.ItemBarcode != '' &&
      this.state.ItemBarcodeType != ''
    ) {
      try {
        let form = new FormData();
        form.append('name', this.state.Itemname);
        form.append('price', this.state.Itemprice);
        form.append('barcode', this.state.ItemBarcode);
        form.append('barcode_type', this.state.ItemBarcodeType);
        form.append('manufacturer', this.state.Manufacturer);
        form.append('description', '');
        form.append('category', '');
        form.append('weight', this.state.ItemWeight);

        console.log(form);

        let res = await base_api.post('Itemform/', form).then(response => {
          console.log(response.data);

          if (response.data[0].Status == 'Item added sucessfully') {
            ToastAndroid.show('Item added sucessfully', ToastAndroid.SHORT);
          } else if (response.data[0].Status == 'Item already exists') {
            ToastAndroid.show(
              'Item not added it already exist ',
              ToastAndroid.SHORT,
            );
          }
        });
      } catch (err) {
        console.log(err);
        alert('their is an error while adding items!');
      }
    } else {
      alert('please fill the details mandatory ');
    }
  };

  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }

  render() {
    return (
      <View style={{flex: 1, borderWidth: 5, borderColor: 'red'}}>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 0,
            paddingBottom: 50,
          }}>
          <View style={{backgroundColor: 'white'}}>
            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
              AddItems in Productlist
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              borderWidth: 5,
              borderRadius: 5,
              borderColor: 'blue',

              backgroundColor: '#2a334d',
            }}>
            <View
              style={{flexDirection: 'row', marginBottom: 10, width: '100%'}}>
              <Text
                style={{
                  width: '20%',
                  textAlignVertical: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: 'white',
                }}>
                * name
              </Text>
              <TextInput
                style={{
                  width: '80%',
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="ItemName"
                placeholderTextColor={'white'}
                // secureTextEntry={passType}
                onChangeText={this.handleItemName}
                // onEndEditing={lastEditedText}
                // maxLength={maximumLength}
                keyboardType={'default'}
              />
            </View>

            <View
              style={{flexDirection: 'row', marginBottom: 25, width: '100%'}}>
              <Text
                style={{
                  width: '20%',
                  textAlignVertical: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: 'white',
                }}>
                * price
              </Text>
              <TextInput
                style={{
                  width: '80%',
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="ItemPrice"
                placeholderTextColor={'white'}
                // secureTextEntry={passType}
                onChangeText={this.handleItemPrice}
                // onEndEditing={lastEditedText}
                // maxLength={maximumLength}
                keyboardType={'numeric'}
              />
            </View>
            <View
              style={{flexDirection: 'row', marginBottom: 25, width: '100%'}}>
              <Text
                style={{
                  width: '20%',
                  textAlignVertical: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: 'white',
                }}>
                * Barcode_Type
              </Text>
              <TextInput
                style={{
                  width: '80%',
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="ItemBarcode_Type"
                placeholderTextColor={'white'}
                // secureTextEntry={passType}
                onChangeText={this.handleBarcodeType}
                // onEndEditing={lastEditedText}
                // maxLength={maximumLength}
                // keyboardType={keyboardType}
              />
            </View>

            <View
              style={{flexDirection: 'row', marginBottom: 25, width: '100%'}}>
              <Text
                style={{
                  width: '20%',
                  textAlignVertical: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: 'white',
                }}>
                * Barcodenumber
              </Text>
              <TextInput
                style={{
                  width: '80%',
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="ItemBarcodenumber"
                placeholderTextColor={'white'}
                // secureTextEntry={passType}
                onChangeText={this.handleBarcode}
                // onEndEditing={lastEditedText}
                // maxLength={maximumLength}
                // keyboardType={keyboardType}
              />
            </View>
            <View
              style={{flexDirection: 'row', marginBottom: 25, width: '100%'}}>
              <Text
                style={{
                  width: '20%',
                  textAlignVertical: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: 'white',
                }}>
                Weight
              </Text>
              <TextInput
                style={{
                  width: '80%',
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="ItemWeight in grams"
                placeholderTextColor={'white'}
                // secureTextEntry={passType}
                onChangeText={this.handleWeight}
                // onEndEditing={lastEditedText}
                // maxLength={maximumLength}
                keyboardType={'numeric'}
              />
            </View>

            <Button
              title={'Add Item'}
              buttonStyle={{marginStart: '25%', borderRadius: 15, width: '50%'}}
              onPress={() => {
                this.addItem();
              }}
            />
          </ScrollView>
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
    color: 'black',
  },
});

export default AddItems;
