import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loveThisTrack } from '../../redux/actions'
import styles from './styles'

class TrackDetail extends React.PureComponent {
  static navigationOptions = {
    title: "Details"
  }
  render() {
    let { name, artist, mbid, listeners, trackImageLarge } = this.props.navigation.getParam('track', '');
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: trackImageLarge }} resizeMode='cover' />
        <View style={styles.trackInfo}>
          <Text style={styles.text}>Artist: {artist}</Text>
          <Text style={styles.text}>Title: {name}</Text>
          <Text style={styles.text}>Listeners: {listeners}</Text>
        </View>
        <View style={styles.loveView}>
          <Button borderRadius={5} containerViewStyle={styles.loveBtn} backgroundColor="#d84aae" rightIcon={{ name: 'favorite'}} title="Love" onPress={() => this.props.loveThisTrack()} />
        </View>
      </View>
    )
  }
}

TrackDetail.propTypes = {
  imageUrl: PropTypes.string,
  artist: PropTypes.string,
  trackName: PropTypes.string,
  listeners: PropTypes.string,
  loveThisTrack: PropTypes.func
}

export default connect(null, { loveThisTrack })(TrackDetail)