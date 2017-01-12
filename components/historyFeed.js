import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import TaskFeedItem from './taskFeedItem';
import {observer} from 'mobx-react/native';
import Store from '../data/store';
import mobx from 'mobx';
import moment from 'moment';


// feed for pending tasks and history
@observer
export default class HistoryFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedTasks: null
    }
  }

  // componentWillMount(){
  //   var tasks = mobx.toJS(Store.actions)
  //   this.setState({
  //     feedTasks: tasks
  //   })
  // }

  // compareDates(a, b){
  //   // sort completed tasks by descending
  //   var now = moment();
  //   var timeA = moment(a);
  //   var timeB = moment(b);
  //   var diffA = timeA.diff(now, 'days');
  //   var diffB = timeB.diff(now, 'days')

  //   return diffA - diffB < 0? 1: 0;
  // }

  render() {
    var style = {
      titleBar: {
        borderWidth: 2, borderColor: '#a5a2a4', marginBottom: 10
      }
    }
    const {actions, activeActions, actionHistory} = Store;
    // var actionsArray = this.props.category === 'Tasks'? mobx.toJS(actions): mobx.toJS(actionHistory).sort((a, b) => this.compareDates(a.completedTime, b.completedTime));
    // this.props.category === 'History'? console.log('history constant actions', actionsArray): true;
    var that = this;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', margin: 5}}>
        <View style={style.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3}}>{this.props.category}</Text>
        </View>
        {
          actionHistory.length === 0 && 
          <Text>No pending actions. Add a job to generate activities.
          </Text>
        }
        <ScrollView >
          {actionHistory.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
        </ScrollView>
      </View>
    )
  }
}
// { this.props.category === 'Tasks' &&
//   <ScrollView style={style.feed}>
//     {activeActions.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
//   </ScrollView>
// }
// { this.props.category === 'History' &&
//   <ScrollView style={style.feed}>
//     {actionHistory.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
//   </ScrollView>
// }