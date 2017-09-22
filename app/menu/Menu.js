import React from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

import {
    Dimensions, 
    StyleSheet, 
    ScrollView, 
    View, 
    Image, 
    Text,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator } from 'react-navigation';

const window = Dimensions.get('window');
 
export default function Menu({ onItemSelected }) { 
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View style={styles.avatarContainer}>
                <Image
                style={styles.avatar}
                source={require('../img/logo21.png')}/>
                <Text style={styles.name}>JR Roadlines</Text>
            </View>

            <Text
            onPress={() => onItemSelected('container')}
            style={styles.item}> < Entypo name= "home" size= {30}/>Container
            </Text>

            <Text
            onPress={() => onItemSelected('addcontainer')}
            style={styles.item}> < EvilIcons name= "sc-telegram" size= {30}/>Add New Container</Text>

            <Text
            onPress={() => onItemSelected('datasink')}
            style={styles.item}> < MaterialCommunityIcons name= "google-photos" size= {30}/>Sync</Text>

            <Text
            onPress={Actions.flatlist}
            style={styles.item}> < MaterialCommunityIcons name= "logout" size= {30}/>Sign out</Text>
        </ScrollView>
    );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width - 30,
        height: window.height,
        backgroundColor: 'gray',
        position : 'absolute'
    },
    
    avatarContainer: {
        padding: 20,
        backgroundColor : '#6a5acd',
    },
    
    avatar: {
        width :60,
        height : 60,
        borderRadius: 30,
        flex: 1,
    },

    name: {
        position: 'absolute',
        padding : 20,
        marginLeft : 70,
        color : '#fff',
        fontSize : 20,
    },
    
    item: {
        fontSize: 15,
        fontWeight : 200,
        backgroundColor : '#fff',
        fontWeight: '300',
        padding: 15,
        marginTop : 1,
    },
});