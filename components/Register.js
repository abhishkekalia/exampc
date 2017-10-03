import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Register extends React.Component {
  render() {
    return <View style={styles.container}>
      <Text>Register page</Text>
      <Button onPress={()=>Actions.register2()} title="Register"/> 
      <Button onPress={Actions.home} title='Replace screen'/>
      <Button onPress={Actions.pop} title = 'Back'/>
    </View>
  }
}
