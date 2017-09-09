import React, {Component} from 'react';
import { Text, View, TouchableHighlight, Image} from 'react-native';
import SezServices from './SezServices';

export default class DetailScreen extends React.Component {
    render() {
            const { params } = this.props.navigation.state;

        return (
            <View>
            <Text>{SezServices.getRow()}</Text>
            <Image source={require('./img/48.jpg')} />
            </View>
            );
    }
}
