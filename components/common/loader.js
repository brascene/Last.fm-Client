import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class LoaderScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size="large" color="#0000ff" />
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}

LoaderScreen.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})
