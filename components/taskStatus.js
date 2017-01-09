import React, { Component } from 'react'
import {
  Text,
  View,
  Image
} from 'react-native';
import TaskStatusItem from './taskStatusItem';

// Task status bar - number of tasks pending, completed, etc
class TaskStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'Joosang',
      taskTypes: this.props.taskTypes
    }
  }

  render() {
    return (
      <View style={{height: 120, flexDirection: 'column', padding: 5}}> 
        <View style={{flex: 1}}>
          <Text>Hi <Text style={{fontWeight: 'bold'}}>{this.props.user}</Text>, I'm your personal recruiter!</Text>
        </View>
        <View style={{paddingTop: 5, flex: 4, backgroundColor:'#ffffff', flexDirection: 'row'}}>
          {this.state.taskTypes.map( (t, i) => <TaskStatusItem task={t} key={i} navigator={this.props.navigator}/>)}
        </View>
      </View>
      )
  }
}

module.exports = TaskStatus;