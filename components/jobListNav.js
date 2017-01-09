import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import { View, Text, TouchableOpacity } from 'react-native'

class JobListNav extends Component {
  onTabClick(e, name) {
    Store.changeJobScreenTab(name)
  }

  render() {
    const {jobScreenActiveTab, activeUser} = Store;
    var userMessage = {
      Active: 'your active applications',
      Pending: 'the jobs you need to review',
      All: 'all available jobs'
    }
    var styles = {
      tabStyle: { flex: 1, backgroundColor: '#a5a2a4', margin: 5, padding: 5}
    }

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{margin: 5}}>
          <Text>Hi <Text style={{fontWeight: 'bold'}}>{activeUser}</Text>, here are {userMessage[jobScreenActiveTab]}.</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Pending')} style={styles.tabStyle} >
            <Text style={{textAlign: 'center'}}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Active')} style={styles.tabStyle} >
            <Text style={{textAlign: 'center'}}>Active</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

//All Tab
//<TouchableOpacity id='allTab' onPress={(event) => this.onTabClick(event, 'All')} style={styles.tabStyle} >
//  <Text style={{textAlign: 'center'}}>All</Text>
//</TouchableOpacity>

module.exports = JobListNav;