import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import Button from '../../common/Button';
import Loader from '../../common/Loader';
import {container, errorText, logo, logocont, formcont} from '../../common/commonStyles';

var {height, width} = Dimensions.get('window');

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

class Login extends Component {
    static propTypes = {
        errorStatus: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            username: '',
            password : ''
        };
    }

    render() {
        const {errorStatus, loading} = this.props;
        return (
            <View style={styles.container}>
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
                        autoCorrect={false}
                        placeholder="Password"
                        maxLength={140}
                        underlineColorAndroid = 'transparent'
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={(password) => this.setState({password: password})}
                    />
                    <Button onPress={() => this.onSubmit()}>
                        Login
                    </Button>
                    {errorStatus ? <Text style={styles.errorText}>{errorStatus}</Text> : undefined}
                    {loading ? <Loader/> : undefined}
                </View>
            </View>
        );
    }

    onSubmit() {
        this.props.login(this.state.username, this.state.password);
        this.setState({username: '', password : ''});
    }
}

export default Login;