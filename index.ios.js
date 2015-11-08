import React from 'react-native';
import Root from './app/containers/Root';

let { AppRegistry } = React;

let ReactNativeReduxRedditAPIApp = React.createClass({
  render: function() {
    return(
      <Root />
    );
  }
});

AppRegistry.registerComponent('ReactNativeReduxRedditAPIApp', () => ReactNativeReduxRedditAPIApp);
