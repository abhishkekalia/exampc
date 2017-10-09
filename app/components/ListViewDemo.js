import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
 
var THUMB_URLS = [
{uri: 'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/26dcc96dc605430eb263ba8cef17b2a2.jpg'},
{uri: 'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/e2219fd839864076942d0ae4197090cc.jpg'},
{uri: 'http://jr.econ14.com/documents/containers/1/0/6/4/9/8/26dcc96dc605430eb263ba8cef17b2a2.jpg'},
];

export default class ListViewDemo extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows(this._genRows({})),
    }
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var imgSource = THUMB_URLS[rowID];
    return (
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
    );
  }
  _genRows(pressData: {[key: number]:boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < THUMB_URLS.length;ii++) {
      dataBlob.push('image' + ii);
    }
    return dataBlob;
  }
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
    width: 45,
    height: 45
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});