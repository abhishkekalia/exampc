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
    ListView: { screen: ListView },
    Detail: { screen: DetailScreen },
    AddDetails: { screen: AddDetails },
    SinkListViewItem: { screen: SinkListViewItem },
}, {
  initialRouteName: 'SinkListViewItem',
})

module.exports = HomeScreen;