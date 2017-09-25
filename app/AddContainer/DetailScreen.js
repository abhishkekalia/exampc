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
import SezServices from '../SezServices';

const window = Dimensions.get('window');

export default class DetailScreen extends React.Component {

    render() {

        const { c_id, container_no } = this.props
        
        return (
            <View style= {styles.container}>
                <View style={styles.horizontalCross} >
                    <Text style = {styles.containerTitle}>Container No :</Text>
                    <Text style = {styles.containerNo}>{container_no}</Text>

                    <TouchableOpacity onPress ={() => Actions.ContainerView({ c_id : c_id, c_no : container_no , capt : 'seal'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Seal</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => Actions.ContainerView({ c_id : c_id, c_no : container_no , capt : 'door'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Door</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => Actions.ContainerView({ c_id : c_id, c_no : container_no , capt : 'inside'}) } style = {[styles.iconSeal, styles.seprate]}>
                    <Text style = {styles.iconText}>Inside</Text>
                        <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => Actions.ContainerView({ c_id : c_id, c_no : container_no , capt : 'outside'}) } style = {[styles.iconSeal, styles.seprate]}>
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