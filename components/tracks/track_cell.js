import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

import styles from './styles'

export const TrackCellSeparator = () => (
  <View style={styles.cellSeparator}></View>
)

export default class TrackCell extends React.PureComponent {
  render() {
    let { artist, name, listeners, trackImageUrl, mbid, didSelectRow, trackImageLarge } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => didSelectRow({ name, artist, mbid, trackImageUrl, listeners, trackImageLarge })}>
        <View style={styles.cellContent}>
          <Image style={styles.cellImage} source={{ uri: trackImageUrl }} resizeMode='cover' />
          <View style={styles.trackData}>
            <Text style={styles.cellText}>{name}</Text>
            <Text style={styles.cellText}>{artist}</Text>
            <Text style={styles.cellText}>{`Listeners: ${listeners}`}</Text>
            <View style={styles.buttonView}>
              <Button borderRadius={5} containerViewStyle={styles.loveBtn} backgroundColor="#d84aae" rightIcon={{ name: 'favorite'}} title="Love" onPress={() => loveThisTrack()} />
              <Button borderRadius={5} containerViewStyle={styles.loveBtn} backgroundColor="#bcc0f0" rightIcon={{ name: 'info' }} title="Info" onPress={() => didSelectRow({ name, artist, mbid })} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TrackCell.propTypes = {
  name: PropTypes.string,
  mbid: PropTypes.string,
  artist: PropTypes.string,
  listeners: PropTypes.string,
  trackImageUrl: PropTypes.string,
  didSelectRow: PropTypes.func
}