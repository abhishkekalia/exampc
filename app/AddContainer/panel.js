import React, { Component } from 'react';
import { TouchableOpacity, View , Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class ControlPanel extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity>
				<Icon name = 'lock'  color="#841584" size={50}/><Text style = {styles.icon}>Lock</Text>
				</TouchableOpacity>
				<TouchableOpacity>
				<Icon name = 'glassdoor'  color="#841584" size={50}/><Text style = {styles.icon}>Door</Text>
				</TouchableOpacity>
				<TouchableOpacity>
				<Icon name = 'border-inside'  color="#841584" size={50}/><Text style = {styles.icon}>Inside</Text>
				</TouchableOpacity>
				<TouchableOpacity>
				<Icon name = 'border-outside'  color="#841584" size={50}/><Text style = {styles.icon}>Outside</Text>
				</TouchableOpacity>

      		</View>
      	);
    }
}

const styles = StyleSheet.create({
	container : {
		position : 'relative',
		flexDirection: 'row', 
		justifyContent: 'space-between',
		backgroundColor : '#000',
		paddingTop : 50
	},

	icon : {
		paddingLeft : 10,
		color : '#fff'
	}
})