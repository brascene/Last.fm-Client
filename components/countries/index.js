import React from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchBar } from 'react-native-elements'

import styles from './styles'
import { getCountries, filterCountries, saveLocalCountries } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

import TableView from '../common/tableView'
import CountryCell, { CountryCellSeparator } from './country_cell'
import LoaderScreen from '../common/loader'
import AlertScreen from '../common/alert'

class CountriesPage extends React.Component {
  static navigationOptions = {
    title: 'Countries',
  }

  state = {
    animating: true,
    countries: [],
    searchValue: '',
    countriesError: false,
  }

  componentDidMount() {
    this.checkCountries()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFiltering) {
      this.setState({
        animating: false,
        countries: nextProps.filteredCountries,
      })
    }
    if (nextProps.countries.length > 0 && !nextProps.countriesError) {
      this.setState({
        animating: false,
        countries: nextProps.countries,
        countriesError: false,
      })
    }
    if (nextProps.countriesError) {
      this.setState({
        animating: false,
        countriesError: nextProps.countriesError,
      })
      AlertScreen('Request error', nextProps.countriesErrorText, () => {})
    }
  }

  didSelectRow = (name) => {
    const { navigation } = this.props
    navigation.navigate('Tracks', {
      country: name,
    })
  }

  checkCountries = async () => {
    const offlineCountries = await appStorage.getCountries()
    const { saveLocalCountries, getCountries } = this.props
    if (offlineCountries && offlineCountries.length === 0) { // > 0
      saveLocalCountries(offlineCountries)
      this.setState({
        animating: false,
        countries: offlineCountries,
      })
    } else {
      getCountries()
    }
  }

  searchBarDidUpdate = (text) => {
    const { filterCountries } = this.props
    if (text === '') {
      this.search.blur()
      filterCountries('')
    } else {
      this.setState({
        searchValue: text,
      })
      filterCountries(text.toLowerCase())
    }
  }

  render() {
    const {
      animating, countries, searchValue, countriesError,
    } = this.state
    return (
      <View style={styles.container}>
        {animating ? <LoaderScreen title="Fetching countries..." />
          : (
            <View style={styles.searchAndTableContainer}>
              {countriesError ? (
                <View style={styles.reloadView}>
                  <Button
                    title="Try again"
                    onPress={() => {
                      this.props.getCountries()
                      this.setState({ animating: true })
                    }}
                  />
                </View>
              ) : (
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
                    placeholder="Search your country..."
                  />
                  <TableView
                    dataSource={countries}
                    didSelectRow={this.didSelectRow}
                    cell={CountryCell}
                    separator={CountryCellSeparator}
                  />
                </View>
              )}
            </View>
          )}
      </View>
    )
  }
}

CountriesPage.propTypes = {
  getCountries: PropTypes.func.isRequired,
  filterCountries: PropTypes.func.isRequired,
  saveLocalCountries: PropTypes.func.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  filteredCountries: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  countriesError: PropTypes.bool,
  countriesErrorText: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => {
  const {
    countries, isFiltering, filteredCountries, hasError, error,
  } = state.countriesState
  return {
    countries,
    isFiltering,
    filteredCountries,
    countriesError: hasError,
    countriesErrorText: error,
  }
}

export default connect(mapStateToProps, {
  getCountries,
  filterCountries,
  saveLocalCountries,
})(CountriesPage)
