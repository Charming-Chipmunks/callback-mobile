import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

// Component for each bubble in the task status bar
@observer
class TaskStatusItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskCount: 0,
      taskType: this.props.task.type,
      backgroundColor: '#a5a2a4'
    }
  }

  componentWillMount() {
    const {jobs, favoredJobs} = Store;
    if (this.state.taskType === 'Companies to Review') {
      this.setState({
        backgroundColor: '#D85353',
      })
    }
  }

  // clicking a bubble will direct user to correct Jobs tab
  _navigate() {
    if( this.state.taskType === 'Companies to Review') {
      // change active job screen tab in Mobx
      Store.changeJobScreenTab('Pending')
      // navigate to job screen
      this.props.navigator.push('links')
    } 
  }

  render(){
    const {jobCount, actionCount, actionHistoryCount} = Store;
    var style = {
      taskView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: 5
      },
      taskCount: {
        borderWidth: 1, borderColor: '#524D4D', borderRadius: 50, backgroundColor: this.state.backgroundColor, alignItems: 'center', padding: 10,
        transform: [ { scaleX: 1.5 } ] // transform to oval
      }
    }

    if (this.state.taskType === 'Companies to Review') {
      return (
        <View style={style.taskView}>
          <TouchableOpacity style={style.taskCount} onPress={this._navigate.bind(this)}>
            <Text style={{textAlign: 'center', width: 30, fontSize: 15, color: '#ffffff'}}>{jobCount}</Text>
          </TouchableOpacity>
          <View>
            <Text style={{textAlign: 'center', fontSize: 11, margin: 10}}>{this.state.taskType}</Text>
          </View>
        </View>  
      )
    } else if (this.state.taskType === 'Open Tasks') {
      return (
        <View style={style.taskView}>
          <TouchableOpacity style={style.taskCount} onPress={this._navigate.bind(this)}>
            <Text style={{textAlign: 'center', width: 30, fontSize: 15, color: '#ffffff'}}>{actionCount}</Text>
          </TouchableOpacity>
          <View>
            <Text style={{textAlign: 'center', fontSize: 11, margin: 10}}>{this.state.taskType}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={style.taskView}>
          <TouchableOpacity style={style.taskCount} onPress={this._navigate.bind(this)}>
            <Text style={{textAlign: 'center', width: 30, fontSize: 15, color: '#ffffff'}}>{actionHistoryCount}</Text>
          </TouchableOpacity>
          <View>
            <Text style={{textAlign: 'center', fontSize: 11, margin: 10}}>{this.state.taskType}</Text>
          </View>
        </View>
      )
    }
  }
}

module.exports = TaskStatusItem;