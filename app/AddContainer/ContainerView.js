import React, {Component} from 'react';
import {
	TouchableHighlight,	
	View, 
	Text, 
	TextInput,
	StyleSheet,
	ToastAndroid,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import SezServices from '../SezServices';
import CaptureModel from '../CaptureModel';
import { LineDotsLoader } from 'react-native-indicator';

export default class ContainerView extends Component{
	constructor(props){
		super(props);
		this.state={
			c_id : this.props.c_id,
            container_no : this.props.c_no,
            type : this.props.capt,
            data : '',
            loading : false
		}
	} 

    render() { 
        return ( 
            <View style={styles.container}>

                <Camera 
        		ref={(cam) => {
                this.camera = cam; }}
                style={styles.preview} 
                aspect={Camera.constants.Aspect.fill}/>

                

                <View style={[styles.overlay, styles.bottomOverlay]}>
                   {this.state.loading ?  <LineDotsLoader color= {'#fff'} /> : null }
                    <TouchableOpacity 
                    style={styles.miniButton} 
                    onPress={this.cancelPress.bind(this)}>
                        <Cross name= 'cross'  size={35} color='#6495ed'/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.captureButton} 
                    onPress={this.takePicture.bind(this)}> 
                        <Icon name="camera" size={40} color="#6a5acd" /> 
                    </TouchableOpacity> 

                    <TouchableOpacity 
                    style={styles.miniButton} 
                    onPress= {this.successPress.bind(this)}>
                        <MaterialIcons name= 'done'  size={35} color='#6495ed'/>
                    </TouchableOpacity>
                </View> 
            </View>
        );
    }

    takePicture() {
    this.setState({
        loading : true
    }) 
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
        .then((data) => this.setState({
            data : data.path
        }) )
        .catch(err => console.error(err));

        setTimeout(()=> { 
            this.setState({ 
                loading : false 
            })
        }, 1000)
         
    }

    cancelPress () {
        this.setState({
            data : ''
        });
        Actions.pop();
    }
    
    successPress () {
    SezServices.capture_save(new CaptureModel( this.state.c_id , this.state.data, this.state.type ))
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },

    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 

    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    
    miniButton: { 
        padding: 8, 
        backgroundColor: 'white', 
        borderRadius: 40,
    },
 
    typeButton: {
        padding: 5,
    },
});