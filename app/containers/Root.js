import React from 'react-native'
import { Provider } from 'react-redux/native'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

const store = configureStore()
var Root = React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <AsyncApp />}
      </Provider>
    )
  }
});

export default Root;
