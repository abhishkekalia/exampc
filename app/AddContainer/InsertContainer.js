import React, {Component} from 'react';
import {
	TouchableHighlight,	
	View, 
	Text, 
	TextInput,
	StyleSheet,
	ToastAndroid
} from 'react-native';

import SezModel from '../SezModel';
import SezServices from '../SezServices'

export default class InsertContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			text : '',
			toastMsg : 'saved'
		}
	}

	onSubmit(text){
	//	console.warn(text);
		SezServices.save(new SezModel(text))
        ToastAndroid.show(this.state.toastMsg, ToastAndroid.LONG);
	}
	render(){
		return (
			<View style={styles.container}>
			<TextInput	
			style={styles.inputContainer}	
			onChangeText={(text) => this.setState({text})}	
			value={this.state.text}
            maxLength={5}
            placeholder = 'insert container number'
            underlineColorAndroid = 'transparent'
			/>
			<TouchableHighlight style={styles.touchButton} onPress = {this.onSubmit.bind(this, this.state.text)}>
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
  	color : '#fff',
  	padding:10,
  	fontSize : 18 
  },

  touchButton : {
  	backgroundColor : '#1e90ff',
  	marginTop : 10
  },

  inputContainer : {
  	height: 40, 
  	borderColor: 'gray', 
  	borderWidth: 1
  }

});