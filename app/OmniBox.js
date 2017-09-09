import React, { Component } from 'react';
import { TextInput } from 'react-native';
import SezModel from './SezModel';
import SezServices from './SezServices';
import Utils from './Utils';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  onChange(event){
    var container_no = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.container_no.match(new RegExp('.*' + container_no +'.*', 'gi')));

    this.setState({
      newValue: container_no
    });
    this.props.updateDataList(dataList);
  }

  onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {
      var newDataItem = new SezModel(this.state.newValue);

      var dataList = this.props.data;
      var dataItem = Utils.findTodo(newDataItem, dataList);
      if(dataItem) {
        Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          newValue: ''
        });
        this.props.updateDataList(dataList);
        return;
      }

      dataList.unshift(newDataItem);
      SezServices.save(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
    }
  }

  render() {
    return (
      <TextInput style={{height: 40, padding: 4, marginTop : 5, paddingLeft : 10, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
        placeholder='Search Container No'
        blurOnSubmit={false}
        underlineColorAndroid = 'transparent'
        value={this.state.newValue}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}>
      </TextInput>
    );
  }
}

module.exports = OmniBox;
