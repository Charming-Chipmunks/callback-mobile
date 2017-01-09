import React, {Component} from 'react';
import {
  AppRegistry, Text, View, ScrollView, Alert,
  TextInput, TouchableOpacity
} from 'react-native'
import { NavigationStyles } from '@exponent/ex-navigation';

//
import JobInfoModal from '../components/jobInfoModal'
import JobListItem from '../components/jobListItem'
import JobListNav from '../components/jobListNav'

// state management
import mobx from 'mobx';
import {observer} from 'mobx-react/native'
import Store from '../data/store'


var NothingToReview = () => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <Text>Nothing to Review!</Text>
    <Text>Maybe it would be a good time to 
      <Text>finish pending tasks.</Text>
    </Text>
    <Text>Already done? 
      <Text> Search for more jobs.</Text>
    </Text>
  </View>
)

// main
@observer
class JobListScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Jobs'
    }
  }

  static navigatorStyle = {
    navBarTextColor: '#A92324',
    navBarBackgroundColor: '#a5a2a4',
    navBarButtonColor: '#000000'
  };

  constructor(props){
    super(props);

    this.state = {
      activeTab: 'Active',
      jobIndex: 0,
      searchTerm: '',
    }

    this.handleClick = this.handleClick.bind(this);
  }

  _navigate(next) {
    this.props.navigator.push({
      name: 'hiredly.me'
    })
  }

  createJobView() {
    this.props.navigator.push('createjobmodal');
  }

  handleClick(button, jobId, job) {
    const {jobs} = Store;

    // save job and generate next action
    if (button === 'favor') {
      console.log('hello')
      fetch('http://jobz.mooo.com:5000/users/1/jobs/' + jobId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'favored'
        })
      })
      .then((response) => {
        Store.addFavoredJob(job);
        Alert.alert('Added job: ' + job.jobTitle + ', ' + job.company)
        console.log('success')
      })
    }

    if (button === 'unfavor') {
      // set job as unfavored
      fetch('http://jobz.mooo.com:5000/users/1/jobs/' + jobId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'unfavored'
        })
      })
      .then((response) => {
        console.log('removed')
        Alert.alert('Removed job: ' + job.jobTitle + ', ' + job.company)
      })
    }

    this.setState({
      jobIndex: this.state.jobIndex + 1
    })

    console.log('num: ', this.state.jobIndex, jobs.length)
  }

  render() {
    var {jobs, favoredJobs, jobScreenActiveTab} = Store;
    var styles = {
      inputStyle: {
        height: 30, flex: 1, borderColor:"#a5a2a4", borderWidth: 1
      },
      createButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      }
    }
    return (
      <View style={{flex:1, marginTop: 5}}>
        <JobListNav user='Joosang' />
        { this.state.jobIndex > jobs.length - 1 && 
          <NothingToReview />
        }
        { jobScreenActiveTab === 'Pending' &&
        <ScrollView style={{flex: 1, margin: 5}}>
         { jobs.map( (e, i) => (
             i === this.state.jobIndex && <JobListItem key={i} job={e} reviewed={e.reviewed} handleClick={this.handleClick} navigator={this.props.navigator}/>
         ))}
        </ScrollView>
        }
        { jobScreenActiveTab === 'Active' &&
        <View style={{flex: 1, margin: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
            <Text>Search: </Text>
            <TextInput onChangeText={(text) => this.setState({searchTerm: text})} style={styles.inputStyle}></TextInput>
          </View>
          <ScrollView>
          { 
            favoredJobs.map( (e, i) => (
              (e.company && e.company.indexOf(this.state.searchTerm)) !== -1 && <JobListItem key={i} job={e} reviewed={e.reviewed} handleClick={this.handleClick} navigator={this.props.navigator}/>
            ))
          }
          </ScrollView>
          <TouchableOpacity style={styles.createButtonStyle} onPress={() => this.createJobView()}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Add a Job</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    )
  }
}

// scrolling jobs

module.exports = {JobInfoModal, JobListScreen}