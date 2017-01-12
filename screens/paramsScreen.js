import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
// State
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import {NavBar} from '../components/navBar'
import ParamItem from '../components/paramItem'
import CreateParamModal from '../components/createParamModal'
import config from '../constants/Routes'

export default class ParamsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Preferences'
    }
  }

  constructor() {
    super();

    this.state = {
      preferences: null
    }
  }

  updateParam(id) {
    this.props.navigator.push('createparammodal', 
      {
        id: id
      }
    )
  }

 render() {
  const {activeUser, userParams} = Store;
  var styles = {
    createButtonStyle: {
      backgroundColor: '#4286f4',
      borderRadius: 25,
      margin: 5,
      padding: 10
    },
    deleteButtonStyle: {
      borderColor:"#A92324",
      borderWidth: 2,
      borderRadius: 25,
      margin: 5,
      marginTop: 0,
      padding: 10
    }
  }
  return (
    <View style={{flex:1, flexDirection: 'column', marginTop:5}}>
      <View style={{margin:5}}>
        <Text>Hi <Text style={{fontWeight: 'bold'}}>{activeUser}</Text>, here are your current job preferences.</Text>
      </View>
      <ScrollView style={{margin: 5}}>
        {
          userParams.map((e, i) => (
            <ParamItem key={i} param={e} />
          ))
        }
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.createButtonStyle} onPress={() => this.updateParam(1)}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Create New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButtonStyle} >
          <Text style={{textAlign: 'center'}}>Clear All</Text>
        </TouchableOpacity>      
      </View>
    </View>
  )
 }
}