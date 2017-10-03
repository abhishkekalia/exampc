import React, { Component } from 'react';
import {
      Image,
      ListView,
      TouchableOpacity,
      StyleSheet,
      RecyclerViewBackedScrollView,
      Text,
      View,
      Picker,
      Navigator,
      ActivityIndicator,
      ScrollView,
      Button,
      Alert,
      RefreshControl
  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MessageBarManager } from 'react-native-message-bar';


var REQUEST_URL = 'http://jr.econ14.com/api/test/';

var TestList = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }),
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }),
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData:function (){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.crediantial),
        });
        }).done();
    },

    deleteTest(id){
        fetch(`http://jr.econ14.com/api/test/{id}`, { 
        method: "DELETE",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) 
        
        .then((response) => response.json())
        .then((res) => { 
            if (res.status) {
            MessageBarManager.showAlert({ 
                message: res.status,
                alertType: 'error',
                }) 
        }
    })
    .catch(() => { 
        console.log('error');
    })
    .done();
    
    },

    render: function() {
        return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderData}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        /> 
        );
    },

    renderData: function(crediantial, rowData, sectionID, rowID, index) {
        return (
            <TouchableOpacity 
            key={rowID} 
            data={rowData} 
            onLongPress={(e)=>{ 
                Alert.alert( 'Alert', 'Are You Sure Want To Delete', 
                [ 
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
                {text: 'OK', onPress: () => this.deleteTest(crediantial.id) }, ] ) }} 
            onPress ={() => Actions.testEdit({ id : crediantial.id}) }> 

            <View style={styles.row}>
                <Text style={styles.textQue}>{crediantial.name} {crediantial.lastname}</Text>
            </View>
            </TouchableOpacity>
            );
    },

    _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
        <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}/>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6'
    },

    thumb: {
        width   :50,
        height  :50,
    },

    textQue :{
        flex: 1,
        fontSize: 18,
        fontWeight: '400',
        left : 5
    },

    centering: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    heading: {
        paddingTop : 5,
        paddingBottom : 5,
        backgroundColor : '#fff',
        borderBottomWidth : 3,
        borderBottomColor : '#a9a9a9'
    },
    headline: {
        paddingTop : 10,
        paddingBottom : 10,
        marginLeft : 15,
        fontSize    : 15,
        color       : "#000",
        fontWeight  : 'bold'
    },
    detail: {
        padding : 10,
        backgroundColor : '#fff',
        minHeight : 500,
        fontWeight : 'bold'
    }
});

export default TestList;