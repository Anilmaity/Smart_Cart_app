import React, {Component} from 'react';
import {Button, Icon, ListItem} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import {baseAPI} from './General_files/Base_Api';
const base_api = baseAPI;

import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

export class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'on',
      cameraType: 'back',
      databaseitemlist: [],
      itemlist: [],
      Totaldiscount:'',
      Total:'',
    };
  }
  componentDidMount() {
    this.getitemlist();
  }

  getitemlist = async () => {
    console.log(this.props.route.params);
    let items = this.props.route.params;
    let Total = 0

    let Totaldiscount = 0
    for (let i = 0; i < items.length; i++) {
      Total = Total +  items[i].price
      Totaldiscount = Totaldiscount +  items[i].discount*items[i].price


    }

    this.setState({databaseitemlist: this.props.route.params , Totaldiscount:Totaldiscount , Total :Total});
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
                    {item.price}
                  </Text>
                </View>

                <View style={{height: '100%', width: '25%'}}>
                  <Text
                    style={{
                      color: 'white',
                      marginStart: 10,
                      textAlign: 'left',
                    }}>
                    {item.discount * item.price}
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '25%',

                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {item.price - item.discount * item.price}
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
              Orderlist
            </Text>
          </View>
        </View>

        {/*<View*/}
        {/*  style={{*/}
        {/*    flexDirection: 'row',*/}
        {/*    height: 40,*/}
        {/*    alignItems: 'center',*/}
        {/*    borderWidth: 1,*/}
        {/*    borderBottomWidth: 0,*/}
        {/*    backgroundColor: '#48514a',*/}
        {/*  }}>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      height: '100%',*/}
        {/*      borderWidth: 1,*/}
        {/*      borderColor: 'black',*/}
        {/*      width: '10%',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}>*/}
        {/*    <Text style={{textAlign: 'center', color: 'white'}}> Sr.No.</Text>*/}
        {/*  </View>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      borderWidth: 1,*/}
        {/*      justifyContent: 'center',*/}
        {/*      height: '100%',*/}
        {/*      width: '25%',*/}
        {/*    }}>*/}
        {/*    <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>*/}
        {/*      Name*/}
        {/*    </Text>*/}
        {/*  </View>*/}

        {/*  <View*/}
        {/*    style={{*/}
        {/*      borderWidth: 1,*/}
        {/*      justifyContent: 'center',*/}
        {/*      height: '100%',*/}
        {/*      width: '15%',*/}
        {/*    }}>*/}
        {/*    <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>*/}
        {/*      price*/}
        {/*    </Text>*/}
        {/*  </View>*/}

        {/*  <View*/}
        {/*    style={{*/}
        {/*      borderWidth: 1,*/}
        {/*      justifyContent: 'center',*/}
        {/*      height: '100%',*/}
        {/*      width: '25%',*/}
        {/*    }}>*/}
        {/*    <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>*/}
        {/*      discount*/}
        {/*    </Text>*/}
        {/*  </View>*/}

        {/*  <View*/}
        {/*    style={{*/}
        {/*      height: '100%',*/}
        {/*      width: '25%',*/}
        {/*      borderWidth: 1,*/}

        {/*      justifyContent: 'center',*/}
        {/*    }}>*/}
        {/*    <Text style={{textAlign: 'center', color: 'white'}}>Cost</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}

        {/*<ScrollView*/}
        {/*  refreshControl={*/}
        {/*    <RefreshControl refreshing={false} onRefresh={this.getitemlist} />*/}
        {/*  }*/}
        {/*  style={{backgroundColor: '#4d363c'}}>*/}
        {/*  {itemlist}*/}
        {/*</ScrollView>*/}

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
              borderWidth: 1,
              justifyContent: 'center',
              height: '100%',
              width: '25%',
            }}>
            <Text style={{marginStart: 10, color: 'white', textAlign: 'left'}}>
              Total Discount
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
              {this.state.Totaldiscount} Rs
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
              Amount to pay
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
              {this.state.Total -this.state.Totaldiscount } Rs
            </Text>
          </View>

        </View>

        <View
        style={{
          margin:20,

          height:'20%',

        }}>

        <Button
        buttonStyle={{
          padding:20,
          width:"30%",
          alignSelf:"center",
        }}
        title={"Pay with UPI"}

        >

        </Button>
        </View>

        <View
          style={{
            margin:20,
            height:'20%',


          }}>

          <Button
            buttonStyle={{
              padding:20,
              alignSelf:"center",
            }}
            title={"Pay with Debit/Credit Card"}
          >

          </Button>
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
});

export default Bill;
