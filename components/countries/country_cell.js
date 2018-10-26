import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import codes from '../../utils/country_codes'
import styles from './styles'

export const CountryCellSeparator = () => (
  <View style={styles.cellSeparator}></View>
)

export const CountryCell = ({ name, code, didSelectRow }) => {
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