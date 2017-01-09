import React, { Component } from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native'
import config from '../constants/Routes'


var icons = {
  x: 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png',
  edit: 'http://icons.iconarchive.com/icons/pixelkit/gentle-edges/128/Edit-icon.png'
}

export default class ParamItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deleted: false
    }

    this.deleteParam = this.deleteParam.bind(this);
  }

  deleteParam(){
    fetch(config.host + '/parameter/' + this.props.param.id + '/user/1)',
    {
      method: 'DELETE'
    })
      .then((response) => {
        console.log('deleted!')
        this.setState({
          deleted: true
        })
      })
  }

  render(){
    var styles = {
      wrapperStyle: {
        borderWidth: 2, borderColor: '#a5a2a4',flex: 1, flexDirection: 'row', marginTop: 2,
        borderRadius: 10, padding: 10
      }
    };

    if (!this.state.deleted) {
      return(
        <View style={styles.wrapperStyle}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={{fontSize: 20}}>{this.props.param.descriptor}</Text>
            <Text>{this.props.param.city}, {this.props.param.state}</Text>
            <Text style={{fontStyle: 'italic'}}>Within {this.props.param.radius} miles of {this.props.param.zip}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.completeTask}>  
              <Image 
                style={{height: 30, width: 30, opacity: 0.5}}
                source={{uri: icons.edit}} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteParam}>
              <Image 
                style={{height: 30, width: 30, opacity: 0.8}}
                source={{uri: icons.x}} 
              />
            </TouchableOpacity>
          </View>
        </View>
        )
    } else {
      return null;
    }
  }
}