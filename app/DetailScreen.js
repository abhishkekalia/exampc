import React, {Component} from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView} from 'react-native';
import SezServices from './SezServices';

export default class DetailScreen extends React.Component {
    render() {
            const { params } = this.props.navigation.state;

        return (
            <View>
            <Text>{params.c_id}</Text>
            <ScrollView>
            <Text>{JSON.stringify(SezServices.findPictures())}</Text>
            </ScrollView>
            </View>
            );
    }
}
