import React from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PropTyes from 'prop-types'

import styles from './styles'
import { getCountries, initApp } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

class CountriesPage extends React.Component {
  state = {
    animating: false,
    message: "This should be loader page (while downloading countries), and after that show the list of countries as requested."
  }

  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countries.length > 0) {
      this.setState({
        animating: false,
        message: "Countries fetched!"
      })
    }
  }

  stopLoader = async () => {
    let offlineCountries = await appStorage.getCountries()
    if (offlineCountries && offlineCountries.length > 0) {
      this.setState({
        message: `Already fetched ${offlineCountries.length} countries`,
        animating: false
      })
    } else {
      this.setState((prevState, props) => ({
        animating: !prevState.animating
      }))
      this.props.getCountries()
    }
  }

  render() {
    let { animating, message } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <ActivityIndicator animating={animating} size="large" color="#0000ff" />
          <Text style={styles.text}>{message}</Text>
          <Button title="Get countries" onPress={this.stopLoader} />
          <Button title="Screen 2" onPress={() => this.props.navigation.navigate('Screen2')} />
        </View>
      </View>
    )
  }
}

CountriesPage.propTypes = {
  getCountries: PropTyes.func,
  countries: PropTyes.array
}

mapStateToProps = state => ({
  countries: state.countriesState.countries
})

export default connect(mapStateToProps, { getCountries, initApp })(CountriesPage)
