import React, { Component ,PropTypes } from 'react';
import {
	Image, 
	ListView, 
	StyleSheet, 
	Text, 
	View, 
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class GetImage extends Component {
    constructor(props) {
    	super(props);
  		this.fetchData= this.fetchData.bind(this);
      	var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    	
    	this.state={ 
    		dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }), 
    		dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }), 
    		container_id : this.props.container_id, 
    		type : this.props.type
    	}
    }

    static propTypes = { 
    	container_id:   React.PropTypes.string.isRequired,
    	type: React.PropTypes.string.isRequired,
    	fetchData:   React.PropTypes.func.isRequired 
    };

    componentDidMount(){
        this.fetchData()
    }

    blur() {
        const {dataSource } = this.state;
        dataSource && dataSource.blur();
    }

    focus() {
        const {dataSource } = this.state;
        dataSource && dataSource.focus();
    }

    componentWillUpdate(nextProps, nextState) {
        this.fetchData();
      // nextState.dataSource = nextProps.propOpacity;
    }

    fetchData(){
    	const { container_id, type} = this.state; 
    	fetch(`http://jr.econ14.com/api/picture?stuffing_id=${container_id}&type=${type}`,{
        	 method: "GET", headers: {
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

    // pressRow(rowData){ 
    // 	var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}); 
    // 	var newDs = []; 
    // 	newDs = this.state.ds.slice(); 
    // 	newDs[0].Selection = newDs[0] == "AwayTeam" ? "HomeTeam" : "AwayTeam" ;
    // 	this.setState({ 
    // 		dataSource: this.state.dataSource.cloneWithRows(newDs) 
    // 	})
    // }

    render() {
    	this.fetchData= this.fetchData.bind(this);
        let listView = (<View></View>);
            listView = (
            	<ListView
        		contentContainerStyle={styles.list}
        		dataSource={this.state.dataSource}
        		renderRow={this.renderData.bind(this)}
        		enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                />
            );
        return (
        <View>{listView}</View>
        );
    }

    renderLoadingView() { 
        return ( 
            <View style={styles.container}> 
                <Text>
                    Loading...
                </Text>
            </View>
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

    // _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    //     return (
    //     <View
    //     key={`${sectionID}-${rowID}`}
    //     style={{
    //       height: adjacentRowHighlighted ? 4 : 1,
    //       backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
    //     }}/>
    //     );
    // }
}

var styles =StyleSheet.create({
	list: {
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