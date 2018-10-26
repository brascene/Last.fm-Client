import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'react-native-elements'
import TableView from '../common/tableView'
import { TrackCellSeparator } from './track_cell'
import TrackCell from './track_cell'
import AlertScreen from '../common/alert'

import { getTopTracks, loveThisTrack } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

import styles from './styles'

class Tracks extends React.Component {
  state = {
    tracks: [],
    loading: true,
    loaderTitle: "Fetching tracks...",
    currentPage: 1,
    message: "",
    shouldScrollToTop: false
  }

  static navigationOptions = {
    title: 'Top Tracks'
  }

  componentDidMount() {
    let country = this.props.navigation.getParam('country', '');
    this.props.getTopTracks(country)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.topTracks.length > 0 && !nextProps.loading) {
      this.setState({
        loading: false,
        tracks: nextProps.topTracks,
        message: "",
        shouldScrollToTop: true
      })
    }
    if (!nextProps.hasError && !nextProps.loading && nextProps.topTracks.length === 0) {
      this.setState({
        loading: false,
        message: "No results found.",
        shouldScrollToTop: false
      })
    }
    if (nextProps.hasError) {
      this.setState({
        loading: false,
        tracks: [],
        message: "",
        shouldScrollToTop: false
      })
      AlertScreen("Request error", nextProps.error, ["OK"])
    }
  }

  didSelectRow = track => {
    this.props.navigation.navigate('TrackDetail', {
      track
    })
  }

  pageChanged = direction => {
    let { totalPages } = this.props
    let { currentPage } = this.state
    let country = this.props.navigation.getParam('country', '');
    if (direction) {
      if (currentPage < totalPages) {
        this.setState({ loading: true })
        this.props.getTopTracks(country, currentPage + 1)
        this.setState((prevState) => ({
          currentPage: prevState.currentPage + 1,
        }));
      }
    } else {
      if (currentPage > 1) {
        this.setState({ loading: true })
        this.props.getTopTracks(country, currentPage - 1)
        this.setState((prevState) => ({
          currentPage: prevState.currentPage - 1
        }));
      }
    }
  }

  handleLoveTrack = async () => {
    let api_sig = await appStorage.getApiSig()
    if (api_sig !== "") {
      // handle request
      AlertScreen("Great", "You're already logged in", [])
    } else {
      AlertScreen("Please log in", "We need you to be logged in to be able to love this track", [])
    }
  }

  render() {
    let { tracks, loading, currentPage, message, shouldScrollToTop } = this.state
    return (
      <View style={styles.container}>
          <ActivityIndicator animating={loading} style={styles.loader} size="large" color="#0000ff" />
          {message !== "" && <Text style={styles.noDataMsg}>{message}</Text>}
          <View style={styles.tableAndButtons}>
            <TableView
              shouldScrollToTop={shouldScrollToTop}
              dataSource={tracks}
              loveThisTrack={this.handleLoveTrack}
              didSelectRow={this.didSelectRow}
              cell={TrackCell}
              separator={TrackCellSeparator}
            />
            <View style={styles.pagingButtons}>
              <Button disabled={currentPage === 1} borderRadius={5} containerViewStyle={styles.pagingBtn} backgroundColor="#005073" rightIcon={{ name: 'navigate-before' }} title="Prev" onPress={() => this.pageChanged(false)} />
              <Text>{`Page: ${currentPage}`}</Text>
              <Button borderRadius={5} containerViewStyle={styles.pagingBtn} backgroundColor="#005073" rightIcon={{ name: 'navigate-next' }} title="Next" onPress={() => this.pageChanged(true)} />
            </View>
          </View>
      </View>
    )
  }
}

Tracks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  getTopTracks: PropTypes.func,
  topTracks: PropTypes.array,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
  totalPages: PropTypes.number,
  loveThisTrack: PropTypes.func
};

mapStateToProps = state => {
  let { tracks, loading, hasError, error, totalPages } = state.tracksState
  return {
    topTracks: tracks,
    loading,
    hasError,
    error,
    totalPages: parseInt(totalPages)
  }
}

export default connect(mapStateToProps, { getTopTracks, loveThisTrack })(Tracks)