import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import reducers from './redux/reducers'
import Main from './components/Main'

// import { appStorage } from './api/Storage'

export default class App extends React.Component {
  store = createStore(reducers, applyMiddleware(...[ReduxThunk]));

  // componentDidMount() {
  //   appStorage.deleteSessionKey()
  //   appStorage.deleteUsername()
  // }

  render() {
    return (
      <Provider store={this.store}>
        <Main />
      </Provider>
    )
  }
}
