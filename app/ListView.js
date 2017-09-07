import React, { Component } from 'react';
import { Text, View, TouchableHighlight} from 'react-native';
import SezModel from './SezModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
//import Utils from './Utils.js';
import SezServices from './SezServices';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      dataList: dataList
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
          renderRow={(dataItem, section, index) => <ListViewItem gotonext = {(id) => navigate('Detail')}  data={dataItem} onCompletedChange={this._onCompletedChange}/>}
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


class DetailScreen extends React.Component {
    render() {
            const { params } = this.props.navigation.state;

        return (
            <View>
            <Text>{SezServices.getRow}</Text>
            </View>
            );
    }
}

const HomeApp = StackNavigator({
    Question: { screen: ListView },
    Detail: { screen: DetailScreen },
});

module.exports = HomeApp;
