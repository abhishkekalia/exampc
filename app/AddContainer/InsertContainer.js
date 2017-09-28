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
import Utils from '../Utils';
import { Actions } from 'react-native-router-flux';

import SezModel from '../SezModel';
import SezServices from '../SezServices'
import ContainerView from './ContainerView';
import CaptureConfig from './CaptureConfig';

import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class InsertContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			text : '',
			toastMsg : 'saved',
			errorMsg : true,
			msg  : ''
		}
	}

	componentWillMount () {
		setTimeout(function() { this.setState({ errorMsg: true }); }.bind(this), 10000);
    }

	/*validateContainerNumber = (con) => {
		var reg = /^\d+$/;
    	return reg.test(con);
    }
*/
	onSubmit(text, navigate){
		if (text == '') {
			this.setState ({
				msg : 'Container Number Should Not Empty',
				errorMsg : false
			})
		} else {

		 let uuid = Utils.guid();
			SezServices.save(new SezModel( uuid ,text))
			ToastAndroid.show(this.state.toastMsg, ToastAndroid.LONG);
			Actions.DetailScreen({ c_id : uuid, container_no :text });
//			navigate('detailScreen', { c_id : uuid, container_no :text })
		}
	}
	

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
			 	onPress = {this.onSubmit.bind(this, text, navigate)}
			 	 color="#6a5acd"
				title='Add Container'/>
			<Text style= {styles.error}> { this.state.errorMsg == false ? this.state.msg : ''} </Text>

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
  },
  error : {
  	color : 'red',
  	fontSize : 15
  }

});

