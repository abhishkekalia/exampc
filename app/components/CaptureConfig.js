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
import Utils from '../Utils';

let uuid = Utils.guid();

const window = Dimensions.get('window');

export default class CaptureConfig extends React.Component {
    constructor(props){
        super(props);
        this.state={
            job_id : this.props.job_id,
            container_no : this.props.container_no,
            container_id : this.props.container_id
        }

    }
    render() {
        const { job_id, container_no, container_id } = this.state

        return (
            <View style= {styles.container}>
                <View style={styles.horizontalCross} >
                    <Text style = {styles.containerTitle}>Container No :</Text>
                    <Text style = {styles.containerNo}>{container_no}</Text>

                    <CameraController job_id = {job_id} container_no = {container_no} container_id = {container_id}/>
                </View>
                


            </View>
            );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#dcdcdc',
    },

    horizontalCross : {
        width: window.width/1.40,
        marginLeft : window.width/7,
        backgroundColor: '#fff',
    },

    containerTitle : { 
        fontSize : 40,
        fontWeight : '200',
        top : 20
    },

    containerNo : {
        fontSize : 18,
        top : 50,
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