import { createStackNavigator } from "react-navigation";

import Countries from '../components/countries'
import Tracks from '../components/tracks'

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
  }
}, {
    initialRouteName: 'Countries',
    headerMode: 'float'
  })