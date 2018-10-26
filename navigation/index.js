import { createStackNavigator } from 'react-navigation'

import Countries from '../components/countries'
import Tracks from '../components/tracks'
import TrackDetail from '../components/track_details'
import Login from '../components/login'

const RootNavigator = createStackNavigator({
  Countries: {
    screen: Countries,
    gesturesEnabled: false,
  },
  Tracks: {
    screen: Tracks,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  TrackDetail: {
    screen: TrackDetail,
  },
  Login: {
    screen: Login,
  },
}, {
  initialRouteName: 'Countries',
  headerMode: 'float',
})

export default RootNavigator
