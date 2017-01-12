import {
  createRouter,
} from '@exponent/ex-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import ParamsScreen from '../screens/paramsScreen';
//
import TaskScreen from '../screens/taskScreen';
import {JobListScreen, JobInfoModal} from '../screens/jobListScreen';
import RootNavigation from './RootNavigation';
import CreateParamModal from '../components/createParamModal';
import CreateJobModal from '../components/createJobModal';
import GoogleModal from '../components/googleModal';
import CreateActionModal from '../components/createActionModal';
import JobActionView from '../components/jobActionView';
import LoginScreen from '../screens/LoginScreen';
import AppScreen from '../screens/appScreen';


const Router = createRouter(() => ({
  // home: () => CreateParamModal,
  login: () => LoginScreen,
  app: () => AppScreen,
  home: () => TaskScreen,
  jobinfomodal: () => JobInfoModal,
  googlemodal: () => GoogleModal,
  createparammodal: () => CreateParamModal,
  createjobmodal: () => CreateJobModal,
  createactionmodal: () => CreateActionModal,
  jobactionview: () => JobActionView,
  links: () => JobListScreen,
  settings: () => SettingsScreen,
  params: () => ParamsScreen,
  rootNavigation: () => RootNavigation,
}));

export default Router;