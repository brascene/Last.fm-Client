import React from 'react'
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button } from 'react-native-elements'
import PropTyes from 'prop-types'
import { connect } from 'react-redux'

import ScreenAlert from '../common/alert'
import styles from './styles'
import { loveThisTrack } from '../../redux/actions'

class LoginPage extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
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
      // ScreenAlert('Good', 'Lets go', [])
      const loveObj = {
        track: encodeURI(track),
        artist: encodeURI(artist),
        username,
        password,
      }
      this.props.loveThisTrack(loveObj)
    } else {
      ScreenAlert('Form error', 'Please fill both fields', [])
    }
  }

  render() {
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

LoginPage.propTypes = {
  navigation: PropTyes.shape({
    navigate: PropTyes.func.isRequired,
    pop: PropTyes.func,
    getParam: PropTyes.func,
  }).isRequired,
  loveThisTrack: PropTyes.func.isRequired,
}

export default connect(null, { loveThisTrack })(LoginPage)
