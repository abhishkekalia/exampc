/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import InsertContainer from './app/AddContainer/InsertContainer'
import Basic from './app/menu/Basic';
import Root from './app/Root';
import Login from './app/auth/components/Login'

export default class awesome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ListView></ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  }
});

AppRegistry.registerComponent('awesome', () => Root);
