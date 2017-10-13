import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { LinesLoader } from 'react-native-indicator';

const Loader = () => {
    return (
        <View style={styles.container}>
            <LinesLoader color= {'#6a5acd'} barWidth={5} barHeight={40} barNumber={8} betweenSpace={5}/>
        </View>
    )
};

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

export default Loader;