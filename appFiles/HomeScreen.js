import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import {baseAPI} from './General_files/Base_Api';
const base_api = baseAPI;

import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

export class HomeScreen extends Component {
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
    var itemlist = [];
    this.state.databaseitemlist.map((item, index) => {
      itemlist.push(
        <ListItem
          containerStyle={{
            backgroundColor: '#4d363c',
            borderRadius: 5,
          }}
          style={{
            marginVertical: 0,
            elevation: 0,
            shadowColor: 'white',
            borderRadius: 0,
          }}
          key={index}
          bottomDivider>
          <ListItem.Content style={{}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 25,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: '100%',
                    borderColor: 'black',
                    width: '10%',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {index + 1}
                  </Text>
                </View>

                <View style={{height: '100%', width: '25%'}}>
                  <Text
                    style={{
                      color: 'white',
                      marginStart: 10,
                      textAlign: 'left',
                    }}>
                    {item.name}
                  </Text>
                </View>

                <View style={{height: '100%', width: '15%'}}>
                  <Text
                    style={{
                      color: 'white',
                      marginStart: 10,
                      textAlign: 'left',
                    }}>
                    {item.barcode_type}
                  </Text>
                </View>

                <View style={{height: '100%', width: '25%'}}>
                  <Text
                    style={{
                      color: 'white',
                      marginStart: 10,
                      textAlign: 'left',
                    }}>
                    {item.barcodedata}
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '25%',

                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {item.price}
                  </Text>
                </View>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>,
      );
    });

    return (
      <View
        style={{
          flex: 1,
          marginBottom: '6.5%',
          borderWidth: 5,
          borderColor: '#46e16a',
        }}>
        <View
          style={{
            backgroundColor: '#2a2727',
            paddingHorizontal: 0,
            paddingBottom: 0,
          }}>
          <View style={styles.Text} key={1}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 26,
                color: 'white',
              }}>
              Smart Cart Service
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 26,
                color: 'white',
              }}>
              Productlist
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            borderWidth: 1,
            borderBottomWidth: 0,
            backgroundColor: '#48514a',
          }}>
          <View
            style={{
              height: '100%',
              borderWidth: 1,
              borderColor: 'black',
              width: '10%',
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}> Sr.No.</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              height: '100%',
              width: '25%',
            }}>
            <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>
              Name
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              height: '100%',
              width: '15%',
            }}>
            <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>
              Barcode type
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              height: '100%',
              width: '25%',
            }}>
            <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>
              Barcode data
            </Text>
          </View>

          <View
            style={{
              height: '100%',
              width: '25%',
              borderWidth: 1,

              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Price Rs</Text>
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.getitemlist} />
          }
          style={{backgroundColor: '#4d363c'}}>
          {itemlist}
        </ScrollView>
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
});

export default HomeScreen;
