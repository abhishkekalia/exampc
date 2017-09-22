import React, { Component ,PropTypes} from 'react';
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
import ContainerView from './AddContainer/ContainerView';


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
	    this.getResponse = this.getResponse.bind(this);
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
			dataList: dataList,
			refreshing : false
		});
	}
    componentWillUnmount() {
    	this.updateDataList();
}
	_onCompletedChange() {
		if (this.forceUpdate) this.forceUpdate();
	}

	_onRefresh () {
		this.setState ({
			refreshing : true
		})
	this.updateDataList(dataList, ()=> {
		this.setState({
			refreshing : false
		})
	});

	}

	getResponse (result){
		this.setState({result});
	}

	movedItem(){
		return this.state.result;
	}

	static navigationOptions = {
		 header: null
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
	        	gotonext = {() => navigate('Detail', { c_id : this.movedItem() , container_no : this.movedItem()})} 
	        	data={dataItem} onCompletedChange={this._onCompletedChange}/>}
	        	/>
	        );
	    }

	    return (
	    	<View style={{flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor :'#dcdcdc'}}>
    			<OmniBox
            	data={Array.from(dataList)}
            	updateDataList={this.updateDataList}/>
          		{listView}
        	</View>
        )
    }
}


const ContainerShow = StackNavigator({
    container: { screen: ListView },
    Detail: { screen: DetailScreen },
    containerview: { screen: ContainerView },
});


module.exports = ContainerShow;
