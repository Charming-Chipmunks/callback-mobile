import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import moment from 'moment'

// state management
import {observer} from 'mobx-react/native'
import Store from '../data/store'

import config from '../constants/Routes'


// icons
var icons = {
  hamburger: 'https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/menu_start_taskbar_and_window_panel_list-128.png',
  'phone': 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  'schedule': 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  review: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png',
  'apply': 'https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-001_write_compose_new-512.png',
  done: 'https://cdn1.iconfinder.com/data/icons/basic-ui-icon-rounded-colored/512/icon-01-128.png',
  x: 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png',
  'connections': 'https://cdn2.iconfinder.com/data/icons/ourea-icons/256/Connected_256x256-32.png',
  'Liked Job': 'https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/like-128.png',
  'learn': 'https://cdn0.iconfinder.com/data/icons/thin-science-space/24/thin-1036_brain_thinking_mind_knowledge-128.png',
  'offer': 'https://cdn1.iconfinder.com/data/icons/party-3/500/Party_2-128.png',
  'interview': 'https://cdn4.iconfinder.com/data/icons/office-vol-2-3/48/75-256.png',
  email: 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/mail-128.png',
  resume: 'https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo2-07-128.png'
}

// each item in the task feed
@observer
class TaskFeedItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      // task details
      id: this.props.task.id,
      user_id: this.props.task.UserId,
      job_id: this.props.task.JobId,
      scheduled_time: this.props.task.scheduledTime,
      completed_time: this.props.task.completedTime,
      from_today: null,
      display_date: null,
      action_type: this.props.task.actionSource,
      action: this.props.task.type,
      // can be task.description
      action_details: this.props.task.description,
      companyName: this.props.task.company,
      // task item style
      borderColor: '#16C172',
      backgroundColor: '#ffffff'
    }

    this.setItemStyle = this.setItemStyle.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  completeTask() {
    var date = new Date();
    var completedText = "Completed task: " + this.state.action + '\n';
    var nextTask = "Next Task: (example) \ndue " + moment(date).format('MMMM Do YYYY')
    var that = this;

    fetch(config.host + '/actions/1/' + this.state.id, {
      method: 'PUT'
    }).then(function(response) {
        Alert.alert(completedText + nextTask);

        that.setState({
          completed_time: date
        })

        Store.updateActionCount('-');
        Store.updateHistoryCount();
        Store.push(that.props.task, 'actionHistory')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setItemStyle(time, completed) {
    // yellow border if due today

    if (completed !== null) {      
      this.setState ({
        borderColor: '#a5a2a4',
        backgroundColor: '#ffffff'
      })
    } else if (time === 0) {
      this.setState({
        borderColor: '#F8CF46'
      })
    } else {
      // if not completed and overdue, highlight red
      this.setState ({
        borderColor: '#d66a63',
        backgroundColor: '#d66a63'
      })
    }
  }

  componentWillMount() {
    // using momentJS, find the difference between now and the scheduled due date in terms of days
    // store in variable diff
    var now = moment();
    var dueDate = moment(this.state.scheduled_time);
    var diff = dueDate.diff(now, 'days')
    var displayDate;

    // use diff to determine the display date in the task item
    if (this.state.completed_time !== null) {
      var completedDate = moment(this.state.completed_time)
      diff = completedDate.diff(now, 'days');
      displayDate = diff === 0? 'today' : diff * -1 + ' days ago'; 
    } else {
      if (diff < 0) {
        displayDate = 'over due';
      } else if (diff === 0) {
        displayDate = 'today';
      } else if (diff === 1) {
        displayDate = diff + ' day';
      } else {
        displayDate = diff + '\ndays';
      }
    }

    // add props for time relative to today and display date
    this.setState({
      from_today: diff,
      display_date: displayDate,
      icon: icons[this.state.action],
    })

    this.setItemStyle(diff, this.state.completed_time)
  }

  render() {
    var style = {
      barStyle: { flex:1 , flexDirection: 'row', alignItems: 'center', borderWidth: 2,
      paddingLeft: 2,
      backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
      },
      wrapperStyle: {
        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
        flex: 1, flexDirection: 'row', marginTop: 2
      },
      checkboxStyle: {width: 60, flexDirection: 'row', alignSelf: 'flex-end',
      justifyContent: 'center', alignItems: 'center'}
    }

    if ((this.props.category === 'Tasks' && this.state.completed_time === null) 
        || (this.props.category === 'History' && this.state.completed_time !== null)) {
      return (
      <View style={style.wrapperStyle}>
        <View style={style.barStyle}>
          <View style={{width: 40}}><Text style={{textAlign: 'center'}}>{this.state.display_date}</Text></View>
          <View style={{width: 50}}><Image 
            style={{height: 35, width: 35, margin: 5}}
            source={{uri: this.state.icon}} 
          /></View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>{this.state.action_details}</Text>
            <Text display={this.state.companyName}>{this.state.companyName}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
        { this.props.category === 'Tasks' &&
          <View style={style.checkboxStyle}>
            <TouchableOpacity onPress={this.completeTask}>  
              <Image 
                style={{height: 30, width: 30, opacity: 0.5}}
                source={{uri: icons.done}} 
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image 
                style={{height: 30, width: 30, opacity: 0.8}}
                source={{uri: icons.x}} 
              />
            </TouchableOpacity>
          </View>
        }
        </View>
      </View>
      )
    } else {
      return null
    }
  }
}

module.exports = TaskFeedItem;