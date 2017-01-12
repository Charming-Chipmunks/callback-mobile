import config from '../constants/Routes'
import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, 
  Picker
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';
import DatePicker from 'react-native-datepicker'

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

var x = 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png'

@observer
export default class CreateActionModal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    },
    navigationBar: {
      title: 'New Action'
    },
  }

  constructor(props) {
    super(props)
    var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log('today: ', today)

    this.state = {
      id: null,
      type: null,
      company: this.props.route.params.company,
      description: null,
      actionSource: 'user',
      JobId: this.props.route.params.jobId,
      userId: 1,
      contactId: 1,
      selected: null,
      scheduledTime: today
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitFields = this.submitFields.bind(this);
  }

  closeModal() {
    this.props.navigator.pop();
  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
    this.setState({type: value})
  };

  submitFields(){
    console.log('new action: ', this.state)
    var that = this;

    fetch(config.host + '/actions', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: this.state.type,
          company: this.state.company,
          description: this.state.description,
          actionSource: this.state.actionSource,
          jobId: this.state.JobId,
          userId: this.state.userId,
          contactId: this.state.contactId,
          scheduledTime: this.state.scheduledTime,
          completedTime: null
        })
      })
      .then((response) => {
          return response.json()
      })
      .then((response) => {
        var newAction = response;
        that.setState({
          id: response.id
        })
        console.log('new action id:', response.id)
        console.log('new action job:', response.JobId)
        console.log()
        Store.push(that.state, 'actions');
        Store.push(that.state, 'activeActions');
        Store.updateActionCount();
        that.closeModal();
      })
    that.closeModal();
  }

  render() {
    const {actionTypes} = Store;

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
          <Text>ID: {this.props.route.params.jobId}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Company: {this.props.route.params.company}</Text>       
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Title: {this.props.route.params.title}</Text>       
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>Action Type: </Text>
          </View>
          <View>
            <Picker style={{width: 100}} mode='dropdown'
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this, 'selected')}
            >
            {
              Object.keys(actionTypes).map((e, i) => (
                <Picker.Item key={i} label={e} value={e}>Hi1</Picker.Item>        
              ))
            }
            </Picker>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Scheduled Time:</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.scheduledTime}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            minuteInterval={10}
            onDateChange={(datetime) => {this.setState({scheduledTime: datetime});}}
          />
          <Text>datetime: {this.state.scheduledTime}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Description: </Text>
          <TextInput style={styles.inputStyle} 
            onChangeText={(text) => {
              this.setState({description: text}) 
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