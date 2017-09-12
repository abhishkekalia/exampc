import React, {Component} from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView} from 'react-native';
import SezServices from './SezServices';

export default class DetailScreen extends React.Component {
    render() {
            const { params } = this.props.navigation.state;
            const c_id = params.id;
            const path =SezServices.sealData(c_id);

        return (
            <View>
            <Text>{c_id }</Text>
            <ScrollView>
            <Text>{JSON.stringify(path)}</Text>
            </ScrollView>
            </View>
            );
    }
}
