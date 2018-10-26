import React from 'react'
import {
  View, Text, ActivityIndicator, StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
})

const LoaderScreen = ({ title }) => (
  <View style={styles.container}>
    <ActivityIndicator animating size="large" color="#0000ff" />
    <Text>{title}</Text>
  </View>
)

LoaderScreen.propTypes = {
  title: PropTypes.string.isRequired,
}

export default LoaderScreen
