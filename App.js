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
        {this.renderTitleBar()}
        <FlatList style={styles.merchantList}
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

  renderTitleBar = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>Non buttarmi via!</Text>
      </View>
    );
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  merchantList: {
    flex:6,
  },
  merchantItem: {
    padding: 12,
    flex:1 ,
  },
  headerStyle: {
    padding: 12,
    backgroundColor: '#cebbaa',
  },
  titleStyle: {
    textAlign: 'center',
    color: '#474543',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
