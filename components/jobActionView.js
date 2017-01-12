import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import TaskFeedItem from '../components/taskFeedItem'
import { NavigationStyles } from '@exponent/ex-navigation';

//
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'

@observer
export default class JobActionView extends Component {

  constructor(props){
    super(props);

    this.addAction = this.addAction.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Actions'
    }
  }

  addAction(array, action) {
    this.props.navigator.push('createactionmodal', {
      jobId: this.props.job.id,
      company: this.props.job.company,
      title: this.props.job.jobTitle
    })

    console.log('jobid', this.props.job.id)
  }

  render() {
    var styles = {
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      },
      titleBar: {
        borderWidth: 2, borderColor: '#a5a2a4', marginBottom: 10
      }
    }

    const {actions, activeActions, actionHistory} = Store;
    var activeActionsJS = mobx.toJS(Store.activeActions.slice())
    var id = this.props.route.params.job.id;
    console.log('passed job: ', this.props.route.params.job)
    return(
      <View style={{flexDirection: 'column', margin:5}}>
        <View style={{marginBottom: 5}}>
          <Text>Job ID: {id}</Text>
          <Text style={{fontSize: 15}}>{this.props.route.params.job.company}</Text>
          <Text style={{fontSize: 20}}>{this.props.route.params.job.jobTitle}</Text>
        </View>
        <View style={styles.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3}}>Pending Tasks</Text>
        </View>
          <ScrollView>
          {
            activeActions.map( (e, i) => (
              <TaskFeedItem jobId={id} category='Tasks' task={e} key={i}/>
            ))
          }
        </ScrollView>
        <TouchableOpacity onPress={this.addAction} style={styles.createButtonStyle}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>Add Action</Text>
        </TouchableOpacity>
      </View>
    )
  }
}