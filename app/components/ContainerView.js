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
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import SezServices from '../SezServices';
import CaptureModel from '../CaptureModel';
import { LineDotsLoader } from 'react-native-indicator';

const PicturePath = "";

export default class ContainerView extends Component {
    constructor(props){
        super(props);
        this.state={
            result : '',
            job_id : this.props.job_id,
            type : this.props.capt,
            loading : false
        }
    } 

  render() {
    // var token = AsyncStorage.getItem('jwt', (result) => {
    //         this.setState({result}) 
    //     });
    const { job_id, type } = this.state;
    return (
      <View style={styles.container}>
       <Camera
           ref={(cam) => {
             this.camera = cam;
           }}
           style={styles.preview}
           aspect={Camera.constants.Aspect.fill}
           orientation={Camera.constants.Orientation.auto}
           captureTarget={Camera.constants.CaptureTarget.disk}/>

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
                    onPress= {this.storePicture.bind(this, job_id, type)}>
                        <MaterialIcons name= 'done'  size={35} color='#6495ed'/>
                    </TouchableOpacity>
                </View>
      </View> 
    );
  }

  storePicture( job_id, type){
    SezServices.capture_save(new CaptureModel( job_id, PicturePath , type));

      console.log( PicturePath );
      if (PicturePath) {
        var data = new FormData();
        data.append('picture', { uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg'});

        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           // 'Authorization': ,
         },
         body: data,
        }
        console.warn(this.state.result);

        fetch("http://jr.econ14.com/api/file", config)
         .then((responseData) => {
             // Log the response form the server
             // Here we get what we sent to Postman back
             console.warn(responseData);
         })
         .catch(err => {
           console.log(err);
         })
    }
  }

  takePicture() {
    this.setState({
        loading : true
    });

   this.camera.capture()
     .then((data) => {
         console.log(data);
         PicturePath = data.path;
     })
     .catch(err => console.error(err));

    setTimeout(()=> { 
            this.setState({ 
                loading : false 
            })
        }, 1000)
  }
  cancelPress () {
        // this.setState({
        //     data : ''
        // });
        Actions.pop();
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