import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AddDetails from './AddContainer/InsertContainer'
import HomeApp from './ListView';
import Sinkable from './sinkable/app';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { TabNavigator, TabBarBottom } from 'react-navigation';

class awesome extends Component {
  render() {
    return (
        <HomeApp/>
    );
  }
}

const HomeScreen = TabNavigator({
  Container: {
    screen: awesome,
  },

  InsertItem: {
    screen: AddDetails,
  },

  Sink: {
    screen: Sinkable,
  },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
},
{
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


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
module.exports = HomeScreen;