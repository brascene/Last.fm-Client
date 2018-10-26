import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTyes from 'prop-types'
import { SearchBar } from 'react-native-elements'

import styles from './styles'
import { getCountries, filterCountries, saveLocalCountries } from '../../redux/actions'
import { appStorage } from '../../api/Storage'

import TableView from '../common/tableView'
import CountryCell, { CountryCellSeparator } from './country_cell'
import LoaderScreen from '../common/loader'

class CountriesPage extends React.Component {
  static navigationOptions = {
    title: 'Countries',
  }

  state = {
    animating: true,
    countries: [],
    searchValue: '',
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
    } else if (nextProps.countries.length > 0) {
      this.setState({
        animating: false,
        countries: nextProps.countries,
      })
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
    if (offlineCountries && offlineCountries.length > 0) {
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
      animating, countries, searchValue,
    } = this.state
    return (
      <View style={styles.container}>
        {animating ? <LoaderScreen title="Fetching countries..." />
          : (
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
    )
  }
}

CountriesPage.propTypes = {
  getCountries: PropTyes.func.isRequired,
  filterCountries: PropTyes.func.isRequired,
  saveLocalCountries: PropTyes.func.isRequired,
  isFiltering: PropTyes.bool.isRequired,
  filteredCountries: PropTyes.array.isRequired,
  countries: PropTyes.array.isRequired,
  navigation: PropTyes.shape({
    navigate: PropTyes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => {
  const { countries, isFiltering, filteredCountries } = state.countriesState
  return {
    countries,
    isFiltering,
    filteredCountries,
  }
}

export default connect(mapStateToProps, {
  getCountries,
  filterCountries,
  saveLocalCountries,
})(CountriesPage)
