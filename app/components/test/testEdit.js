import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Dimensions, 
    Button,
    AsyncStorage
} from 'react-native';

import { 
    container, 
    errorText, 
    logo, 
    logocont, 
    formcont
} from '../../common/commonStyles';

var {height, width} = Dimensions.get('window');

class Testedit extends Component {
    static propTypes = {
        errorStatus: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            name: '',
            lastname : '',
            contact_nu : '',
            email : ''
        };
    }

    render() {
        return (
            <View >
               
                <View style= {styles.formcont}>
                    <TextInput
                        value={this.state.username}
                        autoCorrect={false}
                        placeholder="name"
                        maxLength={140}
                        underlineColorAndroid = 'blue'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(name) => this.setState({name: name})}
                    />
                    <TextInput
                        value={this.state.lastname}
                        autoCorrect={false}
                        placeholder="Lastname"
                        maxLength={140}
                        underlineColorAndroid = 'blue'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(lastname) => this.setState({lastname: lastname})}
                    />
                    <TextInput
                        value={this.state.contact_nu}
                        autoCorrect={false}
                        placeholder="Lastname"
                        maxLength={140}
                        underlineColorAndroid = 'blue'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(contact_nu) => this.setState({contact_nu: contact_nu})}
                    />
                    <TextInput
                        value={this.state.email}
                        autoCorrect={false}
                        placeholder="Lastname"
                        maxLength={140}
                        underlineColorAndroid = 'blue'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(email) => this.setState({email: email})}
                    />
                    <Button onPress={() => this.onSubmit()} title= 'Submit' color= '#6a5acd' style= {{fontSize: 20, color: 'green' }}/>

                </View>
            </View>
        );
    }

    onSubmit() {
        
        fetch('http://jr.econ14.com/api/test', { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name: this.state.name,
            lastname: this.state.lastname,
            contact_nu: this.state.contact_nu,
            email: this.state.email,
            })
        }) 
        .then((response) => response.json()) 
        .then((res) => { 
            if (res.status) {
            MessageBarManager.showAlert({ 
                message: res.status,
                alertType: 'error',
                }) 
        } else { 
                MessageBarManager.showAlert({
                
                message: 'saved success',
                alertType: 'success',
                })
            }
        })
        .catch(() => { 
            console.log('error')
        })
        .done()
        this.setState({name: '', lastname : '', email : '', contact_nu : ''});


    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent : 'space-between',
    },

    input: {
        height: 40,
        padding: 10,
        width : 250,
        marginBottom: 10,
        borderColor: 'orange',
        borderWidth: 1,
        borderStyle: 'solid'
    },
});

export default Testedit;