import {AppRegistry} from 'react-native';
import App from './src/navigators/MainNavigator';
import {name as appName} from './app.json';
//  Ready for release
AppRegistry.registerComponent(appName, () => App);