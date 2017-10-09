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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagesView from './ImagesView';
import GetImage from './GetImage';
import TimerMixin from 'react-timer-mixin';

var REQUEST_URL = 'http://jr.econ14.com/api/containertypes';

export default class CameraController extends React.Component {
    constructor(props) {
        super(props);
     // mixins: [TimerMixin],
        this.fetchData= this.fetchData.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }),
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }),
            job_id : this.props.job_id,
            container_id : this.props.container_id,
            refreshing : false 
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.job_types),
            refreshing : false
        });
        }).done();
    }
    _onRefresh(){ ()=> {
                this.setState({refreshing : true})
        this.fetchData()}
    }

    render() {
        const {job_id , container_no } = this.props;

        let listView = (<View></View>);
            listView = ( 
                <ListView 
                refreshControl={
                    <RefreshControl 
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh} />
                } 
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                renderSeparator={this._renderSeparator}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                /> 
            );
        return (
        <View>{listView}</View>
        );
    }

    renderData(job_types, rowData, sectionID, rowID, index) {
        return (
            <TouchableOpacity key={rowID} data={rowData} onPress ={() => Actions.ContainerView({ job_id : this.state.job_id, capt : job_types.type, container_id: this.state.container_id}) }> 

            <View style={styles.row}>
            
            <View>
            <EvilIcons name= 'camera'  size={35} color='#6a5acd'/>
            </View>
            <Text style={styles.textQue}>{job_types.type}</Text>
            <MaterialIcons name= 'navigate-next'  size={25} color='#000'/>

            </View>
            <GetImage job_id={'40711'} type={'Seal'}/>
            
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
//             <ImagesView job_id={this.state.job_id} type={job_types.type} />
//             <GetImage job_id={this.state.job_id} type={job_types.type}/>
