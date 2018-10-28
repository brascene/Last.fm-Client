import React from 'react'
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ScreenAlert from '../common/alert'
import styles from './styles'
import { loveTrack } from '../../redux/actions'

class LoginPage extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loveReqLoading && nextProps.loveReqSuccess) {
      this.setState({ loading: false })
    }
    if (nextProps.loveReqHasError) {
      this.setState({ loading: false })
    }
  }

  validateForm = () => {
    const { username, password } = this.state
    if (username === '' || password === '') return false
    return true
  }

  loginAction = async () => {
    const { username, password } = this.state
    const { artist, track } = this.props.navigation.getParam('loveObj', '')
    if (this.validateForm()) {
      this.setState({ loading: true })
      const loveObj = {
        track: encodeURI(track),
        artist: encodeURI(artist),
        username,
        password,
      }
      this.props.loveTrack(loveObj)
    } else {
      ScreenAlert('Form error', 'Please fill both fields', [])
    }
  }

  render() {
    const { loading } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.formView}>
            <TextInput
              style={styles.input}
              onChangeText={t => this.setState({ username: t })}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Email or Mobile Num"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />
            <TextInput
              style={styles.input}
              onChangeText={t => this.setState({ password: t })}
              returnKeyType="go"
              ref={input => this.passwordInput = input}
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />
            <View style={styles.buttons}>
              <Button borderRadius={5} containerViewStyle={styles.button} backgroundColor="#d84aae" small title="Login" onPress={this.loginAction} />
              <Button borderRadius={5} containerViewStyle={styles.button} backgroundColor="#d84aae" small title="Dismiss" onPress={() => this.props.navigation.pop()} />
            </View>
            <ActivityIndicator animating={loading} size="large" color="#0000ff" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  const loveReqHasError = state.trackLove.hasError
  const loveReqError = state.trackLove.error
  const loveReqSuccess = state.trackLove.success
  const loveReqLoading = state.trackLove.loading

  return {
    loveReqHasError,
    loveReqError,
    loveReqSuccess,
    loveReqLoading,
  }
}

LoginPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    pop: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
  loveTrack: PropTypes.func.isRequired,
  loveReqHasError: PropTypes.bool,
  loveReqSuccess: PropTypes.bool,
  loveReqLoading: PropTypes.bool,
}

export default connect(mapStateToProps, { loveTrack })(LoginPage)
