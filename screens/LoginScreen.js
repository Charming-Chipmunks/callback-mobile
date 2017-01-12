import React, {Component} from 'react';
import {Image, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'

// Stores
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

// import simpleAuthClient from 'react-native-simple-auth';
import secrets from '../auth/secrets';

var icons = {
  loading: 'https://am.jpmorgan.com/baurl-gim/image/ajax-loader.gif',
  google: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png',
  linkedin: 'https://cdn0.iconfinder.com/data/icons/social-network-7/50/9-128.png'
}

import Exponent from 'exponent'


async function signInWithGoogleAsync() {
  try {
    const result = await Exponent.Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId: secrets['google-web']['client_id'],
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

@observer
export default class LoginScreen extends Component {
  static route = {
    navigationBar: {
      title: 'login',
      visible: false,
    },

  }
  
  constructor(props){
    super(props)

    this.state = {
      pending: false,
      loginFailed: false
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    var that = this;
    that.setState({
      pending: true
    })
    // this doens't work
    // this.props.navigator.push('googlemodal')

    signInWithGoogleAsync()
    .then((res) => { 
      Store.setIdToken(res.idToken);
      Store.setState('activeUser', res.user.givenName)
      that.props.navigator.push('home');
      setTimeout( () => {
        that.setState({
          pending: false,
          loginFailed: false
        })
      }, 500);
    })
    .catch((err) => {
      that.setState({
        pending: false,
        loginFailed: true
      })
    })
  }

  componentWillMount(){
    console.log('state', this.state)
  }

  render() {
    var that = this;
    var styles = {
      inputStyle: {
        flex:1, height: 40, borderColor:"#a5a2a4", borderWidth: 1
      },
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      }
    }

    if (!that.state.pending) {
      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', margin: 10}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <Text style={{fontSize:100, textAlign: 'center'}}>(cb)</Text>
          <Text style={{textAlign: 'center'}}>Your Personal Recruiter</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
              <Text style={{width: 70}}>username: </Text>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({description: text}) 
                }} 
              />        
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
              <Text style={{width: 70}}>password: </Text>
              <TextInput style={styles.inputStyle} 
                onChangeText={(text) => {
                  this.setState({description: text}) 
                }} 
              />        
            </View>
            {
              this.state.loginFailed && <Text style={{color: 'red', textAlign: 'center'}}>Login failed, please try again.</Text>
            }
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
              <View style={{justifyContent: 'center'}}>
                <Text>Login with: </Text>
              </View>
              <TouchableOpacity onPress={this.logIn}>
                <Image 
                  style={{height: 50, width: 50}}
                  source={{uri: icons.google}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.logIn}>
                <Image 
                  style={{height: 50, width: 50}}
                  source={{uri: icons.linkedin}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{justifyContent: 'flex-end'}}>
            <Text style={{color: 'blue', textAlign: 'center'}}>New User? Click here!</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', margin: 10, alignItems: 'center'}}>
          <Image 
            style={{height: 20, width: 20}}
            source={{uri: icons.loading}}
          />
        </View>
      )
    }
  }
}