import React, {Component} from 'react';
import { Text, 
    View, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    StyleSheet,
    Dimensions
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import SezServices from '../SezServices';
const window = Dimensions.get('window');

export default class DetailScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;

        const { params } = this.props.navigation.state;
        const c_id = params.c_id;
        const c_no = params.container_no;
        
        return (
            <View style= {styles.container}>
                <View style={styles.horizontalCross} >
                    <Text style = {styles.containerTitle}>Container No :</Text>
                    <Text style = {styles.containerNo}>{c_no}</Text>

                    <TouchableOpacity onPress ={() => navigate('containerview', {c_id : c_id, c_no : c_no, type : 'seal'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Seal</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => navigate('containerview', {c_id : c_id, c_no : c_no, type : 'door'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Door</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => navigate('containerview', {c_id : c_id, c_no : c_no, type : 'inside'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Inside</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => navigate('containerview', {c_id : c_id, c_no : c_no, type : 'outside'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Outside</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
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
        paddingBottom : 20
        
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