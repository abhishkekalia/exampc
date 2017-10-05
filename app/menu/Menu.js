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
        AsyncStorage.multiRemove(keys, (err) => {
        })
        Actions.root;          

    }

    render() { 
         AsyncStorage.getItem('Uid', (err, admin) => {this.setState({ admin }) });

        return ( 
            <ScrollView scrollsToTop={false} style={styles.container}> 
                <View style={styles.avatarContainer}> 
                    <Image
                    style={styles.avatar}
                    source={require('../../app/img/logo21.png')}/>
                    <Text style={styles.name}>JR Roadlines</Text>
                    <Text style={{ color : '#fff',left :  window.width/2, fontSize : 16}} ><Zocial name='guest' color='#fff' size={30}/> {this.state.admin}</Text>
                </View>

                <Text
                onPress={Actions.search}
                style={styles.item}> < Entypo name= "home" size= {30}/>Container </Text>

                <Text
                onPress={Actions.intro}
                style={styles.item}> < EvilIcons name= "sc-telegram" size= {30}/>Introduction</Text>

                <Text
                onPress={Actions.sync}
                style={styles.item}> < MaterialCommunityIcons name= "google-photos" size= {30}/>Sync</Text>

                <Text
                onPress={Actions.testList}
                style={styles.item}> Test</Text>
                <Text
                onPress={Actions.root}
                style={styles.item}> < MaterialCommunityIcons name= "logout" size= {30}/>Sign out</Text>
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
        marginTop : 10,

        marginLeft : 100,
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
export default Menu;
