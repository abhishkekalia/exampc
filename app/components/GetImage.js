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
import TimerMixin from 'react-timer-mixin';

var REQUEST_URL = 'http://jr.econ14.com/api/picture/40711';

var THUMB_URLS = [
'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/26dcc96dc605430eb263ba8cef17b2a2.jpg',
'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/e2219fd839864076942d0ae4197090cc.jpg',
'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/26dcc96dc605430eb263ba8cef17b2a2.jpg',
];

export default class GetImage extends Component {
    constructor(props) {
    	super(props);
    	this.fetchData= this.fetchData.bind(this);

    	// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	this.state={
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }),
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }),
            container_id : this.props.container_id,
            type : this.props.type
    	}
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
    	const { container_id, type} = this.state;

        fetch(`http://jr.econ14.com/api/picture?stuffing_id=106473&type=Seal`,{
        	 method: "GET",headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            	dataSource: this.state.dataSource.cloneWithRows(responseData.photos),
            	refreshing : false
        });
        }).done();
    }

    render() {
    	    	console.warn(JSON.stringify(this.props));

    	// console.warn(JSON.stringify(this.state.dataSource));
        const {job_id , container_no } = this.props;

        let listView = (<View></View>);
            listView = (
            	<ListView
        		contentContainerStyle={styles.list}
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

    renderData(photos, rowData: string, sectionID: number, rowID: number, index) {
    	return (
          	<View style={styles.row}>
           		<Image style={styles.thumb} 
           		source={{ uri : photos.file}} />
        	</View>
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

    // _genRows(pressData: {[key: number]:boolean}): Array<string> {
    // 	var dataBlob = [];
    // 	for (var ii = 0; ii < THUMB_URLS.length;ii++) {
    //   		dataBlob.push('seal' + ii);
    // 	}
    // 	return dataBlob;
    // }
}

var styles =StyleSheet.create({
	list: {
		marginTop:5,
    	justifyContent: 'space-around',
    	flexDirection: 'row',
    	flexWrap: 'wrap'
    },

    row: {
    	justifyContent: 'center',
    	padding: 5,
    	margin: 3,
    	width: 85,
    	height: 85,
    	backgroundColor: '#F6F6F6',
    	alignItems: 'center',
    	borderWidth: 1,
    	borderRadius: 5,
    	borderColor: '#CCC'
    },

	thumb: {
    	width: 75,
    	height: 75
	},

	text: {
    	flex: 1,
    	marginTop: 5,
    	fontWeight: 'bold'
    }
});