import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTyes from 'prop-types'
import { SearchBar } from 'react-native-elements'

import styles from './styles'
import { getCountries, filterCountries, saveLocalCountries } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

import TableView from '../common/tableView'
import CountryCell from './country_cell'
import { CountryCellSeparator } from './country_cell'
import LoaderScreen from '../common/loader'

class CountriesPage extends React.Component {
  state = {
    animating: true,
    message: "This should be loader page (while downloading countries), and after that show the list of countries as requested.",
    countries: [],
    searchValue: ""
  }

  static navigationOptions = {
    title: 'Countries'
  }

  componentDidMount() {
    this.checkCountries()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFiltering) {
      this.setState({
        animating: false,
        message: "Countries fetched!",
        countries: nextProps.filteredCountries
      })
    } else {
      if (nextProps.countries.length > 0) {
        this.setState({
          animating: false,
          message: "Countries fetched!",
          countries: nextProps.countries
        })
      }
    }
  }

  didSelectRow = name => {
    this.props.navigation.navigate('Tracks', {
      country: name
    })
  }

  checkCountries = async () => {
    let offlineCountries = await appStorage.getCountries()
    if (offlineCountries && offlineCountries.length > 0) {
      this.props.saveLocalCountries(offlineCountries)
      this.setState({
        message: `Already fetched ${offlineCountries.length} countries`,
        animating: false,
        countries: offlineCountries
      })
    } else {
      this.props.getCountries()
    }
  }

  searchBarDidUpdate = text => {
    if (text === "") {
      this.search.blur()
      this.props.filterCountries("")
    } else {
      this.setState({
        searchValue: text
      })
      this.props.filterCountries(text.toLowerCase())
    }
  }

  render() {
    let { animating, message, countries, searchValue } = this.state
    return (
      <View style={styles.container}>
        {animating ? <LoaderScreen title="Fetching countries..." /> :
          <View style={styles.searchAndTableContainer}>
            <SearchBar
              ref={search => this.search = search}
              lightTheme
              value={searchValue}
              containerStyle={{ backgroundColor: 'white' }}
              inputStyle={{ backgroundColor: 'white' }}
              clearIcon={{ color: 'black' }}
              searchIcon
              onChangeText={this.searchBarDidUpdate}
              placeholder='Search your country...'
            />
            <TableView
              dataSource={countries}
              didSelectRow={this.didSelectRow}
              cell={CountryCell}
              separator={CountryCellSeparator}
            />
          </View>}
      </View>
    )
  }
}

CountriesPage.propTypes = {
  getCountries: PropTyes.func,
  filterCountries: PropTyes.func,
  saveLocalCountries: PropTyes.func,
  isFiltering: PropTyes.bool,
  filteredCountries: PropTyes.array,
  countries: PropTyes.array
}

mapStateToProps = state => {
  let { countries, isFiltering, filteredCountries } = state.countriesState
  return {
    countries,
    isFiltering,
    filteredCountries
  }
}

export default connect(mapStateToProps, { getCountries, filterCountries, saveLocalCountries })(CountriesPage)