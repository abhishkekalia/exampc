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
      RefreshControl
  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialIcons';

import SezModel from '../SezModel';
import SezServices from '../SezServices';

let dataList = SezServices.findAll();
var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ContainerList extends Component { 
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }),
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }),
            loaded: false,
            toggle : false,
            refreshing: false,
        }
    }
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){ 
        dataListOrder = getOrder(dataList);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataList),
            refreshing: false
        });        
    }
    
    _onRefresh() {()=> {
        this.setState({refreshing: true}); 
        this.fetchData();}
    }
    
    render() {
        let listView = (<View></View>);
            listView = (
            <ListView
            // ref={ref => { this.listView = ref }}
            refreshControl={
                <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh} />
            } 
            dataSource={this.state.dataSource}
            renderRow={this.renderData}
            renderSeparator={this._renderSeparator}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            /> 
            )
        return (
        <View>{listView}</View>
        );
    }

    renderData(data, rowData, sectionID, rowID, index) {
        return (
            <TouchableOpacity key={rowID} data={rowData} onPress ={() => Actions.captureconfig({ job_id : data.job_id, container_no : data.container_no , container_id: data.container_id}) }>
            <View style={styles.row}>
            <View>
            <Icons name= 'local-shipping'  size={25} color='#000'/>

            </View>
            <Text style={styles.textQue}>{data.container_no}</Text>
            </View>
            </TouchableOpacity>
            );
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
        <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}/>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        top : 10
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
export default ContainerList;
