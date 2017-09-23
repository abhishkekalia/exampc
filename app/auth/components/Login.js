import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import Loader from '../../common/Loader';
import { StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Dimensions, 
    Button,
    AsyncStorage
} from 'react-native';
import { container, 
    errorText, 
    logo, 
    logocont, 
    formcont
} from '../../common/commonStyles';

var {height, width} = Dimensions.get('window');

class Login extends Component {
    static propTypes = {
        errorStatus: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            username: '',
            password : '',
            error : ''
        };
    }

    render() {
        const {errorStatus, loading} = this.props;
        return (
            <View {...this.props} style={styles.container}>
                <View style= {styles.logocont}>
                    <Image source={require('../../img/logo.png')} style ={styles.logo} />
                </View>
                <View style= {styles.formcont}>
                    <TextInput
                        style={styles.input}
                        value={this.state.username}
                        autoCorrect={false}
                        placeholder="Username"
                        maxLength={140}
                        underlineColorAndroid = 'transparent'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(username) => this.setState({username: username})}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.password}
                        secureTextEntry={true}
                        autoCorrect={false}
                        placeholder="Password"
                        maxLength={140}
                        underlineColorAndroid = 'transparent'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(password) => this.setState({password: password})}
                    />
                    <Button onPress={() => this.onSubmit()} title= 'Login' color= '#6a5acd' style= {{fontSize: 20, color: 'green' }}/>

                    {errorStatus ? <Text style={styles.errorText}>{errorStatus}</Text> : undefined}
                    {this.state.error != '' ? <Text style={styles.errorText}>{this.state.error} </Text> : <Text></Text>}
                    {loading ? <Loader/> : undefined}
                </View>
            </View>
        );
    }

    onSubmit() {
        this.props.login(this.state.username, this.state.password);
        
        fetch('http://jr.econ14.com/api/login', { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            })
        }) 
        .then((response) => response.json()) 
        .then((res) => { 
            if (res.status) {
            this.setState({
                error : res.status
            }) 
                //alert(res.status) 
            } else { 
                AsyncStorage.setItem('jwt', res.session_id)
                
                AsyncStorage.setItem('Uid', res.user.image) 

                Actions.home();
            //    console.warn(JSON.stringify(res))
            //  Redirect to home screen
            // this.props.navigator.pop()
            }
        })
        .catch(() => { 
             this.setState({
                error : 'There was an error logging in.'
            }) 
        })
        .done()
        this.setState({username: '', password : ''});


    }
}

var styles = StyleSheet.create({
    container,
    errorText,
    logo,
    logocont,
    formcont,

    input: {
        height: 40,
        padding: 10,
        width : width - 60,
        marginBottom: 10,
        borderColor: '#6a5acd',
        borderWidth: 1,
        borderStyle: 'solid'
    },
});

export default Login;