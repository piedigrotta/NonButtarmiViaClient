/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
type State = {
  dataSource: any,
};
export default class App extends Component<Props, State> {
state = {
  isRefreshing: false,
  dataSource: null
};

componentDidMount(){
  this.loadMerchants();
}


  render() {
   const {dataSource} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
      bounces={false}
      data={dataSource}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => this.renderMerchantItem(item)}
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this.loadMerchants}
        />
      }
    />
      </View>
    );
  }

  loadMerchants = (item) => (
    fetch("http://172.20.135.28:8080/list")
    .then(response => response.json())
    .then((responseJson)=> {
      console.log('response: ' + responseJson);
      this.setState({
        isRefreshing: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  );

  renderMerchantItem = (item) => (
    <View style={styles.merchantItem}>
      <Text>{item.name}</Text>
      <Text>{item.address}</Text>
      <Text>{item.times}</Text>
      <Text>{item.offer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  merchantItem: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
