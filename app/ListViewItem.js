import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
//import CheckBox from './CheckBox';
import SezServices from './SezServices';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
  //  this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this.state = {
      data  : this.props.data
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

/*  _onCheckBoxPressed() {
    var data = this.state.data;
    SezServices.update(data, () => {
      data.completed = !data.completed;
    });
    this.setState({
       data: data
    });

    this.props.onCompletedChange();
  }*/

  moveNextView (c_id){
    this.props.gotonext();
    this.props.callback(c_id);

  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    let id = data.id;
    return (
      <TouchableHighlight onPress={() => this.moveNextView(id) } 
       underlayColor={'#eee'} style={{paddingTop: 6, paddingBottom: 6, backgroundColor: "#fff", borderBottomWidth:1, borderColor: '#dcdcdc', borderRadius:10, borderWidth: 1, marginTop :  5}} {...this.props.sortHandlers}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{this.state.c_id}</Text>
         <Text style={{fontSize:18, color: color, paddingLeft : 10, textDecorationLine: textDecorationLine}}>container no: {data.container_no} & id : {id}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ListViewItem;
