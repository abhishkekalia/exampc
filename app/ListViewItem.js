import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
//import CheckBox from './CheckBox';
import SezServices from './SezServices';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
  //  this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this.state = {
      data: this.props.data
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

  moveNextView (id){
    this.props.gotonext(id);
  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    let id = data.id
    return (
      <TouchableHighlight onPress={() => this.moveNextView(id) } 
       underlayColor={'#eee'} style={{paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <Text style={{fontSize:18, color: color, textDecorationLine: textDecorationLine}}>container no: {data.container_no}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ListViewItem;
