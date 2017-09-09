import React, {Component} from 'react';
import {
	TouchableHighlight,	
	View, 
	Text, 
	TextInput,
	StyleSheet,
	ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Camera from 'react-native-camera';
import SezServices from '../SezServices';
import PicturesModel from '../PicturesModel';


export default class ContainerView extends Component{
	constructor(props){
		super(props);
	  	const { params } = this.props.navigation.state;
		this.state={
			container_no : params.container_no
		}
	}
	static navigationOptions = ({ navigation }) => ({
    title: `Click Image For Container Nu ${navigation.state.params.container_no}`,
    headerStyle: { position: 'absolute', backgroundColor: '#fff', opacity : 0.3, zIndex: 100, top: 0, left: 0, right: 0 },
  	headerTitleStyle: { color: '#fff' },
  	headerBackTitleStyle: {
            color: 'white',
        },
  });
  render() {
    return (
    	<View style={styles.container}>
    		<Camera 
    		ref={(cam) => {
            this.camera = cam; }}
            style={styles.preview} 
            aspect={Camera.constants.Aspect.fill}>
            	<Text style={styles.capture} onPress={this.takePicture.bind(this)}><Icon name="camera" size={40} color="#1e90ff" /></Text>
            </Camera>
        </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => SezServices.picture_save(new PicturesModel( data.path , this.state.container_no)))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 5,
    margin: 40
  }
});