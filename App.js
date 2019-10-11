/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl, Image} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const images = {
  arrow_back_white: require('logo.png')
}

type Props = {};
type State = {
  dataSource: any,
};
export default class App extends Component<Props, State> {
state = {
  splashPage: false,
  isRefreshing: false,
  dataSource: null
};

componentDidMount(){
  this.setState({splashPage: true})
  this.loadMerchants();
}

  render() {
   const {dataSource, splashPage} = this.state;

   if(splashPage == true) {
     return <Image source={images.arrow_back_white} />
   }
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
        splashPage: false,
        isRefreshing: false,
        dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  );

  renderMerchantItem = (item) => (
    <View style={styles.merchantItem}>
      <Text style={{fontSize:20, color: 'black', fontWeight: 'bold'}}>{item.name}</Text>
      <Text style={{fontSize:16, color: '#d3a685' }}>{item.offer}</Text>
      <Text>{item.address}</Text>
      <Text>{item.times}</Text>
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
