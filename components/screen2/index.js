import React from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'

export default class Screen2 extends React.Component {
  static navigationProps = {
    header: null
  }

  render() {
    const { navigation } = this.props;
    const country = navigation.getParam('country', 'Not Known :(');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Tracks for country: ${country}`}</Text>
        <Button title="Go back" onPress={() => this.props.navigation.pop()} />
      </View>
    )
  }
}