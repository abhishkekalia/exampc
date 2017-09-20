import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { LineDotsLoader } from 'react-native-indicator';
var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Loader = () => {
    return (
        <View style={styles.container}>
            <LineDotsLoader color= {'#6a5acd'} />
        </View>
    )
};

export default Loader;