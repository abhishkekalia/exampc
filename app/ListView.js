import React, { Component } from 'react';
import { 
	Text, 
	View, 
	TouchableHighlight, 
	Image, 
	RefreshControl
	 } from 'react-native';
import SezModel from './SezModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import SezServices from './SezServices';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailScreen from './AddContainer/DetailScreen';

let dataList = SezServices.findAll();
var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
	constructor(props) {
	    super(props);
	    this.updateDataList = this.updateDataList.bind(this);
	    this._onCompletedChange = this._onCompletedChange.bind(this);
	    this.movedItem = this.movedItem.bind(this)
	    this.state = {
	    	dataList: dataList,
	    	result : 0,
	    	refreshing: false
	    }
	}

	updateDataList(dataList) {
		dataListOrder = getOrder(dataList);
		this.setState({
			dataList: dataList
		});
	}

	_onCompletedChange() {
		if (this.forceUpdate) this.forceUpdate();
	}

	_onRefresh () {
		this.setState ({
			refreshing : true
		})
	}

	getResponse (result){
		this.setState({result});
	}

	movedItem(){
		return this.state.result;
	}

	static navigationOptions = {
		headerStyle: { backgroundColor: '#6a5acd'  },
		headerTitleStyle: { color: '#fff' },
	};

	render() {
		const { navigate } = this.props.navigation;
		let listView = (<View></View>);

		if (this.state.dataList.length) {
			listView = (
				<SortableListView 
				ref='listView' style={{flex: 1}} 
				data={this.state.dataList}
				order={dataListOrder}
				refreshControl={ 
					<RefreshControl refreshing={this.state.refreshing} 
					onRefresh={this._onRefresh.bind(this)} /> 
				}
				onRowMoved={e => moveOrderItem(this, e.from, e.to)}
	        	renderRow={(dataItem, section, index) => <ListViewItem callback={this.getResponse.bind(this)} 
	        	gotonext = {() => navigate('Detail', { id : this.movedItem()})} 
	        	data={dataItem} onCompletedChange={this._onCompletedChange}/>}
	        	/>
	        );
	    }

	    return (
	    	<View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
    			<OmniBox
            	data={Array.from(dataList)}
            	updateDataList={this.updateDataList}/>
          		{listView}
        	</View>
        )
    }
}


module.exports = ListView;
