import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

// store
import mobx from 'mobx';
import {observer} from 'mobx-react/native';
import Store from '../data/store';

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

@observer
export default class CreateJobModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'Jobs'
    },
  }

  constructor(props) {
    super(props)

    this.state = {
      jobTitle:   null,
      company:    null,
      url:        null, 
      address:    null,
      city:       null,
      state:      null,
      snippet:    null,
      origin:     'user',
      userid:     1
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitFields = this.submitFields.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  submitFields(){
    const {newJob} = Store;
    var newJobJS = mobx.toJS(newJob);
    var that = this;
    console.log('before send: ' , that.state)
    fetch(config.host + '/jobs', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // need to fix - not working
        body: JSON.stringify({
          id: 1,
          jobTitle: 'testfromPhone',
          company: 'Test',
          snippet: 'testestest'
        })
        // {
          // jobTitle:   this.state.jobTitle,
          // company:    this.state.company,
          // url:        this.state.url, 
          // address:    this.state.address,
          // city:       this.state.city,
          // state:      this.state.state,
          // snippet:    this.state.snippet,
          // origin:     this.state.origin,
          // id:         this.state.userid 
        // }
      })
      .then((response) => {
        console.log('added a job', newJobJS)
        Store.push(newJobJS, 'favoredJobs')
        // Store.push(that.state, 'userParams');
        that.closeModal();
      })
    // that.closeModal();
  }

  render() {
    const {newJob} = Store;
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
      <View style={{flex:1, alignItems:'center', margin: 10}}>
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
          <Text>Job Title: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'jobTitle', text)
            }} 
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Company: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'company', text)
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Url: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'url', text)
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Address: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'address', text)
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>City: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'city', text)
            }} 
          />  
          <Text>State: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'state', text)
            }} 
          />        
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Description: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              Store.updateForm('newJob', 'snippet', text)
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