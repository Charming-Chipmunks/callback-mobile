import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import JobInfoModal from './jobInfoModal'
import moment from 'moment'

// state management
import {observer} from 'mobx-react/native'
import Store from '../data/store'


var icons = {
  x: 'https://cdn0.iconfinder.com/data/icons/web/512/e52-128.png',
  edit: 'http://icons.iconarchive.com/icons/pixelkit/gentle-edges/128/Edit-icon.png',
  tasks: 'https://cdn1.iconfinder.com/data/icons/notes-and-tasks/24/Add-Task-128.png'
}

class JobOptionButtons extends Component {
  constructor(props){
    super(props);

    this.openJobActionView = this.openJobActionView.bind(this);
  }

  openJobActionView(){
    var that = this;
    this.props.navigator.push('jobactionview', {
      job: that.props.job
    });
  }

  render(){
    var styles = {
      iconStyle: {
        flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      },
      iconText: {
        fontSize: 10
      },
      iconImage: {
        height: 30, width: 30, opacity: 0.5, marginBottom: 2
      }
    }

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <View style={styles.iconStyle}>
          <TouchableOpacity onPress={this.openJobActionView}>  
          <Image 
            style={styles.iconImage}
            source={{uri: icons.tasks}} 
          />
          </TouchableOpacity>
          <Text style={styles.iconText}>Manage Tasks</Text>
        </View>
        <View style={styles.iconStyle}>
          <TouchableOpacity >  
          <Image 
            style={styles.iconImage}
            source={{uri: icons.edit}} 
          />
          </TouchableOpacity>
          <Text style={styles.iconText}>Edit Job</Text>
        </View>
        <View style={styles.iconStyle}><TouchableOpacity >
          <Image 
            style={styles.iconImage}
            source={{uri: icons.x}} 
          />
          </TouchableOpacity>
          <Text style={styles.iconText}>Delete Job</Text>
        </View>
      </View>
    )
  }
}



@observer
export default class JobListItem extends Component {
  constructor(props){
    super(props)

    this.closeMoreInfo = this.closeMoreInfo.bind(this)
  }

  showMoreInfo(){
    this.props.navigator.push('jobinfomodal', 
      {
        url: this.props.job.url,
        closeMoreInfo: this.closeMoreInfo
      }
    )
  }

  closeMoreInfo(){
    this.props.navigator.pop();
  }

  render() {
    const {jobScreenActiveTab} = Store;
    var cleanSnippet = this.props.job.snippet? this.props.job.snippet.split('<b>').join('').split('</b>').join('') : '(no description)';
    var styles = {
      jobItemStyle: {
        flexDirection: 'column', borderWidth: 2, borderColor: '#a5a2a4', margin: 10, height: 400
      },
      yesButtonStyle: {
        backgroundColor: '#4286f4',
        borderRadius: 25,
        margin: 5,
        padding: 10
      },
      noButtonStyle: {
        borderColor:"#A92324",
        borderWidth: 2,
        borderRadius: 25,
        margin: 5,
        marginTop: 0,
        padding: 10
      }
    }

    var JobInfo = () => (
      <View style={{flex:1, flexDirection: 'column', margin: 10}}> 
        <Text style={{fontSize: 15, margin: 2}}>{this.props.job.company}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, margin: 2}}>{this.props.job.jobTitle}</Text>
        <Text style={{fontSize: 15, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Date Posted: </Text>
          {moment(this.props.job.createdAt).format('MMMM Do YYYY')}
        </Text>
        <Text style={{fontSize: 15, margin: 2}} >
          <Text style={{fontWeight: 'bold'}}>Location: </Text>
          {this.props.job.city}, {this.props.job.state}
        </Text>
        <Text style={{fontSize: 15, margin: 2, fontWeight:'bold'}}>Description:</Text>
        <ScrollView style={{height: 200}}>
          <Text style={{fontSize: 15, margin: 2}}>{cleanSnippet}</Text>
          <TouchableOpacity style={{width:100, height:15}} onPress={this.showMoreInfo.bind(this)}>
            <Text style={{color: 'blue', fontSize: 15}}> show more</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )

    // active jobs - will have options to view actions associated with job
    if (jobScreenActiveTab === 'Active') {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo />
          <JobOptionButtons job={this.props.job} navigator={this.props.navigator}/>
        </View>
      )
      // pending jobs - tinder swipe
    } else if (jobScreenActiveTab === 'Pending') {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo job={this.props.job}/>
          <TouchableOpacity style={styles.yesButtonStyle} onPress={() => this.props.handleClick('favor', this.props.job.id, this.props.job)}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>Save Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButtonStyle} onPress={() => this.props.handleClick('unfavor', this.props.job.id, this.props.job)}>
            <Text style={{textAlign: 'center'}}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }
}