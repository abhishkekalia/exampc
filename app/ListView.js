import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image} from 'react-native';
import SezModel from './SezModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
//import Utils from './Utils.js';
import SezServices from './SezServices';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailScreen from './DetailScreen';

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
    this.state = {
      dataList: dataList,
      c_id : 0
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

  getResponse (result){
    this.setState ({
      c_id : result
    })
  }

  movedItem(){
    return this.state.c_id;
  }
  
  static navigationOptions = {
    title: 'Containers',
    headerStyle: { backgroundColor: '#1e90ff'  },
    headerTitleStyle: { color: '#fff' },
  };
  render() {
            const { navigate } = this.props.navigation;

    let listView = (<View></View>);
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref='listView'
          style={{flex: 1}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem callback={this.getResponse.bind(this)} 
          gotonext = {() => navigate('Detail', { feed: this.movedItem()})} 
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
};

const HomeApp = StackNavigator({
    Question: { screen: ListView },
    Detail: { screen: DetailScreen },
});

module.exports = HomeApp;
