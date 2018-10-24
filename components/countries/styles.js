import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width * 0.8
const height = Dimensions.get('window').height * 0.25

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentView: {
    width,
    height,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'red'
  },
  searchAndTableContainer: {
    flexDirection: 'column',
    width: '100%', 
    height: '100%'
  }
});

export default styles;