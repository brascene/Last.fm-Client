import { createStackNavigator } from "react-navigation";

import Countries from '../components/countries'
import Tracks from '../components/tracks'
import TrackDetail from '../components/track_details'

export const RootNavigator = createStackNavigator({
  Countries: {
    screen: Countries,
    gesturesEnabled: false
  },
  Tracks: {
    screen: Tracks,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TrackDetail: {
    screen: TrackDetail
  }
}, {
    initialRouteName: 'Countries',
    headerMode: 'float'
  })