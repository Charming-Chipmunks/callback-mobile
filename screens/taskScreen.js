/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image, 
  Button,
} from 'react-native';
import config from '../constants/Routes'
import moment from 'moment'
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import {NavBar} from '../components/navBar'
import TaskStatusItem from '../components/taskStatusItem'
import TaskStatus from '../components/taskStatus'
import TaskFeed from '../components/taskFeed'
import HistoryFeed from '../components/historyFeed'

// config

// import data from '../data/fakeData'

// import {Nav} from 'react-bootstrap'

// variables
var testTaskTypes = [ 
  { type: 'Open Tasks', count: 8 }, 
  { type: 'Recently Completed', count: 23 }, 
  { type: 'Companies to Review', count: 5 } 
]

var icons = {
  hamburger: 'https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/menu_start_taskbar_and_window_panel_list-128.png',
  phone: 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  interview: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  review: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png'
}

var icons = {
  hamburger: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png',
  settings: 'https://cdn1.iconfinder.com/data/icons/material-core/20/settings-128.png'
}

@observer
export default class TaskScreen extends Component {
  static route = {
    navigationBar: {
      title: 'callback.io'
    },
    rightButtons: [
      {
        title: 'Settings',
        id: 'settings',
        icon: require('../icons/settings.png'),
      }
    ],
    leftButtons: [
      {
        id: 'menu',
        icon: require('../icons/hamburger.png')
      }
    ]
  }
  // styling the navigation bar
  static navigatorStyle = {
    navBarTextColor: '#A92324',
    navBarBackgroundColor: '#a5a2a4',
    navBarButtonColor: '#000000'
    // navBarHidden: true
  };

  // add buttons to NavBar
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Settings',
        id: 'settings',
        icon: require('../icons/settings.png'),
      }
    ],
    leftButtons: [
      {
        id: 'menu',
        icon: require('../icons/hamburger.png')
      }
    ]
  }

  constructor(){
    super();

    this.state = {
      jobCount: 0,
      actionCount: 0
    }
  }

  componentWillMount() {
    const {idToken} = Store;
    console.log('idToken', idToken)
    var that = this;
    // get actions
    fetch(config.host+ '/actions/1', 
    {
      headers: {
        credentials: idToken
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        Store.updateActions(responseJson);
        Store.sortActions(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

      // set new jobs
    fetch(config.host + '/jobs/1/new', {
      headers: {
        credentials: Store.idToken
      }
    })
      .then((response) => {
        // console.log('jobs found: ', response)
        console.log('config', config.host)
        return response.json();
      })
      .then((responseJson) => {
        // console.log('jobsnew found: ', responseJson)
        Store.updateJobCount(responseJson.length);
        Store.updateJobs(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

    // set favored jobs {
    fetch(config.host + '/jobs/1/favored', {
      headers: {
        credentials: Store.idToken
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        // console.log('jobs found: ', responseJson)
        Store.updateFavoredJobs(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })

    // get params for user {
    fetch(config.host + '/parameter/1', {
      headers: {
        credentials: Store.idToken
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        // update
        // console.log('parameters: ', responseJson[0])
        // Store.updateUserParams(responseJson.Parameters)
        Store.updateUserParams(responseJson[0].Parameters)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  _navigate(next) {
    this.props.navigator.push({
      name: next
    })
  }

  // add <NavBar /> component to view to see custom NavBar
  render() {
    const {activeUser, actions} = Store;
    return(
      <View style={{flex: 1, flexDirection: 'column', marginTop: 5}}>
        <TaskStatus user={activeUser} taskTypes={testTaskTypes} jobCount={this.state.jobCount} actionCount={this.state.actionCount} navigator={this.props.navigator}/>
        <View style={{flex: 1}}>
          <TaskFeed category='Tasks'/>
          <HistoryFeed category='History'/>
        </View>
      </View>
    )
  }
}
