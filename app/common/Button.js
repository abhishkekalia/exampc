import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Button extends Component {
	render() {
		return <TouchableOpacity {...this.props} style={styles.button}>
			<Text style={styles.text}>{this.props.children}</Text>
		</TouchableOpacity>
	}
}

const styles = StyleSheet.create({
	button: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#6a5acd'
	},
	text: {
		color: 'white',
		fontSize: 16,
		marginLeft : 50
	}
});