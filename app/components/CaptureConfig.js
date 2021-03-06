import React, {Component} from 'react';
import { Text, 
    View, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    StyleSheet,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SezModel from '../SezModel';
import SezServices from '../SezServices';
import CameraController from './CameraController';
// import Utils from '../Utils';

// let uuid = Utils.guid();

const window = Dimensions.get('window');

export default class CaptureConfig extends React.Component {
    constructor(props){
        super(props);
        const { id, job_id, container_id, container_no } = this.props;
        SezServices.save(new SezModel( id, job_id, container_id, container_no ))
        this.state={
            job_id : job_id,
            container_no : container_no,
            container_id : container_id
        }
    }
    
    render() {
        const { job_id, container_no, container_id } = this.state
        return (
            <View style= {styles.container}>
                <View style={{
                    flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center'}}>
                    <Text style = {styles.containerTitle}>Container No :</Text>
                    <Text style = {styles.containerNo}>{container_no}</Text>
                </View>

                    <CameraController job_id = {job_id} container_no = {container_no} container_id = {container_id}/>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: '#dcdcdc',
    },

    horizontalCross : {
        width: window.width/1.40,
        marginLeft : window.width/7,
        backgroundColor: '#fff',
    },

    containerTitle : { 
        fontSize : 25,
        fontWeight : '200',
        top : 10
    },

    containerNo : {
        fontSize : 18,
        top : 45,
        marginLeft : 20,
        paddingBottom : 70
        
    },

    iconSeal : {
        top :50,
    },

    iconText : {
        fontSize : 20,
        marginLeft : 25,
    },

    seprate : {
        width : 200,
        borderTopWidth:1, 
        borderColor: '#a9a9a9',
        marginLeft : 25,
        paddingBottom : 20,
    }
})