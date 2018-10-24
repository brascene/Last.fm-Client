import { createStackNavigator } from "react-navigation";

import Countries from '../components/countries'
import Screen2 from '../components/screen2'

export const RootNavigator = createStackNavigator({
  Countries: {
    screen: Countries,
    header: null,
    gesturesEnabled: false
  },
  Screen2: {
    screen: Screen2,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
}, {
    headerMode: "screen",
    mode: "push"
  })