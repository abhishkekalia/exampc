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
    AsyncStorage,
    NativeModules,
    Modal
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';
import SezServices from '../SezServices';
import CaptureModel from '../CaptureModel';
import { LineDotsLoader } from 'react-native-indicator';

var FileUpload = require('NativeModules').FileUpload;

const PicturePath = "";

export default class ContainerView extends Component {
    constructor(props){
        super(props);
        this.state={
            result : '',
            job_id : this.props.job_id,
            container_id : this.props.container_id,
            type : this.props.capt,
            loading : false,
            confirmation : false,
            uploading: false,
            showUploadModal: false,
            uploadProgress: 0,
            uploadStatus: undefined,
            cancelled: false,

        }
    } 

    uploadProgressModal() { 
        let uploadProgress;

        if (this.state.uploading) { 
            uploadProgress = ( 
                <View 
                style={{ alignItems: 'center', }}> 
                    <Text 
                    style={ styles.title }>Uploading 
                    </Text>
                    <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, { height: 100}]}
                    size="large" />
                    <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
                    <TouchableOpacity 
                    onPress = { ()=> this.setState({ 
                        uploading : false,
                        showUploadModal : false
                    })}>
                    <Text 
                    style={{ fontSize: 15, color: 'gray', marginTop: 5, }}>cancel
                    </Text>
                    </TouchableOpacity>                   
                </View>
            );
        }
        return uploadProgress; 
    }


    render() {
    const { job_id, type, container_id, confirmation} = this.state;

    const confirm = ( confirmation ? <MaterialIcons name= 'done'  size={35} color='#6495ed'/> : undefined ) 
        return ( 
            <View 
            style={styles.container}>
                <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.showUploadModal}>

                  <View 
                  style={styles.modal}>
                    {this.uploadProgressModal()}
                  </View>

                </Modal>

               <Camera
               ref={(cam) => { 
                this.camera = cam; 
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                orientation={Camera.constants.Orientation.auto}
                captureTarget={Camera.constants.CaptureTarget.disk}/>

                <View 
                style={[styles.overlay, styles.bottomOverlay]}>
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
                    style={[styles.miniButton, confirmation ]} 
                    onPress= {this.storePicture.bind(this, job_id, type, container_id)}>
                        {confirm}
                    </TouchableOpacity>
                </View>
          </View> 
        );
    } 

    // sendPicture(job_id, type, container_id){ 
    //     const form= new FormData();    
    
    //  form.append('job_id', job_id);
    //   form.append('type', type);

    //  form.append('container_id', container_id);
   
    //     form.append('userfile', {

    //     uri:  PicturePath,

    //     type: 'image/jpg', 

    //     name: 'photo.jpg'

    //     }); 

    //     let xhr = new XMLHttpRequest(); 

    //     xhr.open('POST', `http://jr.econ14.com/api/picture`) 

    //     xhr.send(form) 

    //     xhr.onerror = function(e) { 
    //         console.log('err', e) 
    //     } 

    //     xhr.onreadystatechange = function() {

    //         if(this.readyState === this.DONE) { 
    //             console.log(this.response)
    //         }
    //     }
    // }

  storePicture( job_id, type, container_id){
    this.setState ({
        showUploadModal : true,
        uploading : true
    })
    SezServices.capture_save(new CaptureModel( job_id, PicturePath , type));

      console.log( PicturePath );
      if (PicturePath) { 
        const form= new FormData(); 
        form.append('job_id', job_id); 
        form.append('type', type); 
        form.append('container_id', container_id); 
        form.append('userfile', {
        uri:  PicturePath,
        type: 'image/jpg', 
        name: 'photo.jpg'
        }); 

        const config = { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'multipart/form-data;',
           // 'Authorization': ,
         },
         body: form,
        }

        fetch("http://jr.econ14.com/api/picture", config)
         .then((responseData) => {
            this.setState ({
                uploading : false,
                showUploadModal : false
            })
            Actions.popTo('captureconfig');
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
                loading : false,
                confirmation : true 
            })
        }, 1000)
  }

  cancelPress () {
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
        borderRadius: 40,
    },
 
    typeButton: {
        padding: 5,
    },

    modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// https://github.com/react-community/react-native-image-picker/issues/61