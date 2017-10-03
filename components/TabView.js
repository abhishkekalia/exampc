import React from 'react';
import { PropTypes } from "react";
import { StyleSheet, Text, View, ViewPropTypes, Button } from "react-native";
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class TabView extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
        <Text>Tab data:{this.props.data}</Text>
        {this.props.name === 'tab_1_1' &&
          <Button onPress={() => Actions.tab_1_2()} title="next screen for tab1_1"/>
        }
        {this.props.name === 'tab_2_1' &&
          <Button onPress={() => Actions.tab_2_2()} title= 'next screen for tab2_1'/>
        }
        <Button onPress={Actions.pop} title= 'Back'/>
        <Button onPress={() => { Actions.tab_1(); }} title='Switch to tab1'/>
        <Button onPress={() => { Actions.tab_2(); }} title='Switch to tab2'/>
        <Button onPress={() => { Actions.tab_3(); }} title='Switch to tab3'/>
        <Button onPress={() => { Actions.tab_4(); }} title='Switch to tab4'/>
        <Button onPress={() => { Actions.tab_5({ data: 'test!' }); }} title='Switch to tab5 with data'/>
      </View>
    );
  }
}
TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
