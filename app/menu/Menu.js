import React from 'react';
import PropTypes from 'prop-types';
import { 
    Dimensions, 
    StyleSheet, 
    ScrollView, 
    View, 
    Image, 
    Text,
    ViewPropTypes,
    Button,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { MessageBarManager } from 'react-native-message-bar';

const window = Dimensions.get('window');

class Menu extends React.Component { 
    static propTypes = { 
        name: PropTypes.string, 
        sceneStyle: ViewPropTypes.style, 
        title: PropTypes.string, 
    } 
    
    state = {
        admin : ''
    }

    static contextTypes = { 
        drawer: React.PropTypes.object
    }
    
    signOut(){
        let keys = ['jwt', 'Uid'];
        fetch(`http://jr.econ14.com/api/logout`,{
             method: "GET", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { return responseJson })
        .then(AsyncStorage.multiRemove(keys, (err) => { }))
        .then(Actions.login())
        .then(MessageBarManager.showAlert({ 
                message: `Logout SuccessFull`,
                alertType: 'success',
            })) 
        .catch((error) => { console.error(error); })
        .done();

    }

    render() { 
         AsyncStorage.getItem('Uid', (err, admin) => {this.setState({ admin }) });

        return ( 
            <ScrollView scrollsToTop={false} style={styles.container}> 
                <View style={styles.avatarContainer}> 
                    <Image
                    style={styles.avatar}
                    source={require('../../app/img/logo21.png')}/>
                    <Text style={styles.username}><Zocial name='guest' color='#fff' size={25}/>{this.state.admin}</Text>
                </View>

                <Text
                onPress={Actions.search}
                style={styles.item}> < Entypo name= "home" size= {25}/>Home</Text>

                <Text
                onPress={Actions.intro}
                style={styles.item}> < EvilIcons name= "sc-telegram" size= {25}/>Introduction</Text>

                <Text
                onPress={Actions.sync}
                style={styles.item}> < MaterialCommunityIcons name= "google-photos" size= {25}/>Sync</Text>    
                <Text
                onPress={()=> this.signOut()}
                style={styles.item}> < MaterialCommunityIcons name= "logout" size= {25}/>Sign out</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    }, 

    menu: {
        flex: 1,
        width: window.width - 30,
        height: window.height,
        backgroundColor: 'gray',
        position : 'absolute'
    },
    
    avatarContainer: {
        padding: 10,
        backgroundColor : '#6a5acd',
    },
    
    avatar: {
        width :60,
        height : 60,
        borderRadius: 30,
        flex: 1,
    },

    username: {
        position: 'absolute',
        marginTop : 20,
        left : window.width/2,
        color : '#fff',
        fontSize : 15,
    },
    
    item: {
        fontSize: 12,
        fontWeight : 200,
        backgroundColor : '#fff',
        fontWeight: '300',
        padding: 15,
        marginTop : 1,
    },
});
export default Menu;
