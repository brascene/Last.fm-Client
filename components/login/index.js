import React from 'react'
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button } from 'react-native-elements'
import PropTyes from 'prop-types'

import ScreenAlert from '../common/alert'
import styles from './styles'

export default class LoginPage extends React.Component {
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
    return false
  }

  loginAction = async () => {
    const { username, password } = this.state
    if (this.validateForm()) {
      ScreenAlert('Good', 'Lets go', [])
      // pass parameters to redux function
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
  }).isRequired,
}
