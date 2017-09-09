import React, {Component} from 'react';
import {
	TouchableHighlight,	
	View, 
	Text, 
	TextInput,
	StyleSheet,
	ToastAndroid,
	Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SezModel from '../SezModel';
import SezServices from '../SezServices'
import ContainerView from './ContainerView';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


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
	
	static navigationOptions = {
    title: 'Enter Container No',
    headerStyle: { backgroundColor: '#1e90ff'  },
  	headerTitleStyle: { color: '#fff' },
  	headerBackTitleStyle: {
            color: '#fff',
        },
	};
	render(){
		var text = this.state.text;
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
			<TextInput	
			style={styles.inputContainer}	
			onChangeText={(text) => this.setState({text})}	
			value={this.state.text}
            maxLength={15}
            placeholder = 'Insert Container Number'
            underlineColorAndroid = 'transparent'
			/>
			<Button  
			 	accessibilityLabel="Learn more about this purple button"
			 	onPress = {() => navigate('containerview', { container_no : text})
				//this.onSubmit.bind(this, this.state.text)
				} title='Add Container'/>
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
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#F8F8F8',
  },

  inputContainer : {
  	borderColor: 'gray', 
  	borderWidth: 1,
  	fontSize : 20,
  	paddingTop : 10,
  	paddingBottom : 10,
  	marginBottom : 10,
  },
  touchButton : {
  	height : 100
  }

});

const AddDetails = StackNavigator({
    insertcontainer: { screen: InsertContainer },
    containerview: { screen: ContainerView },
});

module.exports = AddDetails;
