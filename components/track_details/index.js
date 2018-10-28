import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loveTrack } from '../../redux/actions'
import styles from './styles'

class TrackDetail extends React.PureComponent {
  static navigationOptions = {
    title: 'Details',
  }

  render() {
    const {
      name, artist, listeners, trackImageLarge,
    } = this.props.navigation.getParam('track', '')
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: trackImageLarge }} resizeMode="cover" />
        <View style={styles.trackInfo}>
          <Text style={styles.text}>
          Artist:
            {artist}
          </Text>
          <Text style={styles.text}>
          Title:
            {name}
          </Text>
          <Text style={styles.text}>
          Listeners:
            {listeners}
          </Text>
        </View>
        <View style={styles.loveView}>
          <Button
            borderRadius={5}
            containerViewStyle={styles.loveBtn}
            backgroundColor="#d84aae"
            rightIcon={{ name: 'favorite' }}
            title="Love"
            onPress={() => this.props.loveTrack({ artist, name })}
          />
        </View>
      </View>
    )
  }
}

TrackDetail.propTypes = {
  loveTrack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func,
  }).isRequired,
}

export default connect(null, { loveTrack })(TrackDetail)
