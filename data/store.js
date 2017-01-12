import {observable, action} from 'mobx'
import data from './fakeData'
import mobx from 'mobx';

class ObservableStore {
  //access tokens
  @observable idToken;

  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  //actions
  @observable actions = [];
  @observable activeActions = [];
  @observable actionHistory = [];
  @observable actionCount = 0;
  @observable actionHistoryCount = 0;
  @observable actionTypes = {
    apply: 'apply', connections: 'connections', email: 'email', interview:'interview',
    learn: 'learn', 'Liked Job': 'Liked Job', meetup: 'meetup', offer: 'offer',
    phone: 'phone', resume: 'resume', review: 'review', schedule: 'schedule'
  };
  // new jobs
  @observable jobs = [];
  @observable jobCount = 0;
  // activeJobs = user's favored jobs
  @observable favoredJobs = [];
  // @observable favoredJobCount = favoredJobs.length;
  @observable jobScreenActiveTab = 'Active';
  @observable jobModalUrl = '';
  // parameters
  @observable userParams = [];
  // new form items
  @observable newJob = {
    jobTitle: '',
    company: '',
    url: '',
    address: '',
    city: '',
    state: '',
    snippet: '',
    source: 'user',
    origin: 'user',
    id: undefined
  }

  @action setIdToken(token){
    console.log('set token')
    this.idToken = token;
  }

  @action setState(key, value){
    console.log('set key')
    this[key] = value;
  }

  @action updateForm(formName, formField, item) {
    if (formName === 'newJob') {
      this.newJob[formField] = item;
    }
  }

  @action changeJobScreenTab(tabName) {
    this.jobScreenActiveTab = tabName;
    // console.log('jobs: ', this.jobs)
  }

  // general
  @action push(entry, array){
    this[array].push(entry);
  }

  @action deleteFromArray(id, array){
    var i = 0;
    while (i < this[array].length){
      if (this[array][i].id === id) {
        this[array].splice(i, 1);
        console.log('i', i)
        break;
      } else {
        i++;
      }
    }
  }

  // update new jobs
  @action updateJobs(jobs) {
    this.jobs = jobs;
  }

  @action updateJobCount(n) {
    if (n !== undefined) {
      this.jobCount = n;
    } else {
      this.jobCount++;
    }
  }

  // update user's favored jobs
  @action updateFavoredJobs(jobs) {
    this.favoredJobs = jobs;
  }

  //push to favored jobs
  @action addFavoredJob(job) {
    this.favoredJobs.push(job);
  }

  // actions
  @action updateActions(actions) {
    this.actions = actions;
  }

  @action updateActionCount(n) {
    if (n !== undefined) {
      if (n === '-' && this.actionCount > 0) {
        this.actionCount--;
      } else {      
        this.actionCount = n;
      }
    } else {
      this.actionCount++;
    }
  }

  @action updateHistoryCount(n) {
    if (n !== undefined) {
      if (n === '-' && this.actionHistoryCount > 0) {
        this.actionHistoryCount--;
      } else {      
        this.actionHistoryCount = n;
      }
    } else {
      this.actionHistoryCount++;
    }
  }

  @action sortActions(res) {
    var that = this;
    res.forEach(function(action) {
      // if(action.type) {
      //   if(!that.actionTypes[action.type]) {
      //     that.actionTypes[action.type] = action.type;
      //   }
      // }

      if (action.completedTime === null) {
        that.activeActions.push(action)
      } else {
        that.actionHistory.push(action)
      }
    })

    this.actionCount = this.activeActions.length;
    // console.log('actioncount', this.actionCount)
    this.actionHistoryCount = this.actionHistory.length;
  }

  @action changeJobModalUrl(url) {
    this.jobModalUrl = url;
  }

  // param methods
  @action updateUserParams(params){
    this.userParams = params;
  }

}

const observableStore = new ObservableStore();
export default observableStore;