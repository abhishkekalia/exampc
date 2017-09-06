import React, {Component} from 'react';
import {
	TouchableHighlight,	
	View, 
	Text, 
	TextInput,
	StyleSheet
} from 'react-native';

import SezModel from '../SezModel';
import SezServices from '../SezServices'

export default class InsertContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			text : ''
		}
	}

	onSubmit(text){
	//	console.warn(text);
	//	SezServices.save(new SezModel(text));
	}
	render(){
		return (
			<View style={styles.container}>
			<TextInput	
			style={{height: 40, borderColor: 'gray', borderWidth: 1}}	
			onChangeText={(text) => this.setState({text})}	
			value={this.state.text}
			/>
			<Text>{this.state.text}</Text>
			<TouchableHighlight style={{ backgroundColor : '#1e90ff' }} onPress = {this.onSubmit.bind(this, this.state.text)}>
			<Text style= { styles.button}> Add Container</Text>
			</TouchableHighlight>
			</View>
		);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  },

  button : {
  	justifyContent : 'center',
  	color : '#841584'
  }
});