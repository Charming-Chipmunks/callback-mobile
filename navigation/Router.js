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
import CreateActionModal from '../components/createActionModal';
import JobActionView from '../components/jobActionView';


const Router = createRouter(() => ({
  // home: () => CreateParamModal,
  home: () => TaskScreen,
  jobinfomodal: () => JobInfoModal,
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