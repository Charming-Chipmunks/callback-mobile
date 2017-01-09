import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

@observer
export default class CreateParamModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'Preferences'
    },
  }

  constructor(props) {
    super(props)


    this.state = {
      descriptor: null,
      city: null,
      state: null,
      radius: 25,
      zip: null
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitFields = this.submitFields.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  submitFields(){
    var that = this;
    console.log('before send: ' , that.state)
    fetch(config.host + '/parameter/1', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descriptor: that.state.descriptor,
          city: that.state.city,
          state: that.state.state,
          radius: that.state.radius,
          zip: that.state.zip
        })
      })
      .then((response) => {
        Store.push(that.state, 'userParams');
        that.closeModal();
      })
    // that.closeModal();
  }

  render() {
    var styles = {
      inputStyle: {
        flex:1, height: 40, borderColor:"#a5a2a4", borderWidth: 1},
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      }
    }
    return (
      <View style={{flex:1, alignItems:'center'}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.closeModal} style={{margin: 5, marginRight:10, width:20}}>
            <Image 
              style={{height: 20, width: 20}}
              source={{uri: x}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>ID: {this.props.route.params.id}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Job Type: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({descriptor: text}) 
            }} 
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>City: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({city: text}) 
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>State: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({'state': text}) 
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Radius: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({radius: text});
              console.log('radius: ', text)
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Zipcode: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({zip: text});
              console.log('zip: ', text)
            }} 
          />        
        </View>
        <TouchableOpacity style={styles.createButtonStyle} onPress={this.submitFields}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}