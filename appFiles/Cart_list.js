import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import {baseAPI} from './General_files/Base_Api';
const base_api = baseAPI;

import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

export class Cart_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'on',
      cameraType: 'back',
      Cart_list: [],
    };
  }
  componentDidMount() {
    this.getitemlist();
  }

  getitemlist = async () => {
    let itemlist = [];

    try {
      let itemsResponse = await base_api.get('/Cart_list/');

      console.log(itemsResponse.data);
      this.setState({Cart_list: itemsResponse.data});
    } catch (err) {
      console.log(err);
      alert('their ia an error while getting items!');
    }
  };

  render() {
    var itemlist = [];
    this.state.Cart_list.map((cart, index) => {
      itemlist.push(
        <ListItem
          containerStyle={{
            backgroundColor: '#4d363c',
            borderRadius: 5,
            height: 100,
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
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '10%',

                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', textAlign: 'left'}}>
                  {index + 1}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: 25,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '30%',

                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {cart.cart_id}
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '30%',

                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {cart.current_user}
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '30%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="circle"
                    type="material"
                    style={{marginStart: 100}}
                    color={cart.in_use ? 'green' : 'red'}
                  />
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
              Cart list
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
              width: '10%',

              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Sr.No</Text>
          </View>

          <View
            style={{
              height: '100%',
              width: '30%',

              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>cart_id</Text>
          </View>

          <View
            style={{
              height: '100%',
              width: '30%',

              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              current_user
            </Text>
          </View>

          <View
            style={{
              height: '100%',
              width: '30%',

              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              online status
            </Text>
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

export default Cart_list;
