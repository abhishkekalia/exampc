import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AddDetails from './AddContainer/InsertContainer'
import ListView from './ListView';
import DetailScreen from './AddContainer/DetailScreen';


import Sinkable from './sinkable/app';
import SinkListViewItem from './sinkable/SinkListViewItem';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { StackNavigator } from 'react-navigation';

const HomeScreen = StackNavigator({
    container: { screen: ListView },
    Detail: { screen: DetailScreen },
    AddDetails: { screen: AddDetails },
    datasink: { screen: SinkListViewItem },
}, {
  initialRouteName: 'AddDetails',
})

module.exports = HomeScreen;