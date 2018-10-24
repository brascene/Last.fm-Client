import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTyes from 'prop-types'

import styles from './styles'
import { getCountries } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

import TableView from '../common/tableView'
import { CountryCell, CountryCellSeparator } from './country_cell'
import LoaderScreen from '../common/loader'

class CountriesPage extends React.Component {
  state = {
    animating: true,
    message: "This should be loader page (while downloading countries), and after that show the list of countries as requested.",
    countries: []
  }

  static navigationOptions = {
    title: 'Countries'
  }

  componentDidMount() {
    this.checkCountries()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countries.length > 0) {
      this.setState({
        animating: false,
        message: "Countries fetched!",
        countries: nextProps.countries
      })
    }
  }

  didSelectRow = (name) => {
    // make request and after it's received navigate further
    console.log("Clicked on row with country name: ", name)
  }

  checkCountries = async () => {
    let offlineCountries = await appStorage.getCountries()
    if (offlineCountries && offlineCountries.length > 0) {
      this.setState({
        message: `Already fetched ${offlineCountries.length} countries`,
        animating: false,
        countries: offlineCountries
      })
    } else {
      this.props.getCountries()
    }
  }

  render() {
    let { animating, message, countries } = this.state
    return (
      <View style={styles.container}>
        {animating ? <LoaderScreen title="Fetching countries..." /> :
        <TableView
          dataSource={countries}
          didSelectRow={this.didSelectRow}
          cell={CountryCell}
          separator={CountryCellSeparator}
       />}
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

export default connect(mapStateToProps, { getCountries })(CountriesPage)


/*
        <View style={styles.contentView}>
          <ActivityIndicator animating={animating} size="large" color="#0000ff" />
          <Text style={styles.text}>{message}</Text>
          <Button title="Get countries" onPress={this.stopLoader} />
          <Button title="Screen 2" onPress={() => this.props.navigation.navigate('Screen2')} />
        </View>
*/