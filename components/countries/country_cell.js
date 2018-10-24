import React from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import codes from '../../utils/country_codes'

export const CountryCellSeparator = () => (
  <View style={styles.cellSeparator}></View>
)

export const CountryCell = ({ name, code, didSelectRow }) => {
  console.log("Code: ", code)
  return (
    <TouchableWithoutFeedback onPress={() => didSelectRow(name)}>
      <View style={styles.cellContent}>
        <Image style={styles.cellImage} source={codes[code]} resizeMode='cover' />
        <Text style={styles.cellText}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

CountryCell.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  didSelectRow: PropTypes.func
}

const styles = StyleSheet.create({
  cellContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  cellText: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 16
  },
  cellImage: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 35,
  },
  cellSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  }
})