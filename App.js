/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


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
  dataSource: null
};

componentDidMount(){
  fetch("http://172.20.135.28:8080/list")
  .then(response => response.json())
  .then((responseJson)=> {
    console.log('response: ' + responseJson);
    this.setState({
     dataSource: responseJson
    })
  })
  .catch(error=>console.log(error)) //to catch the errors if any
  }


  render() {
   const {dataSource} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Questo è il dataSource</Text>
        <Text style={styles.instructions}>{dataSource}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
