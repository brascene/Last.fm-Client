import countriesReducer from '../../../redux/reducers/countriesReducer'
import * as types from '../../../redux/actions/types'

const initialState = {
  countries: [],
  loading: false,
  hasError: false,
  error: '',
  isFiltering: false,
  filterValue: '',
  filteredCountries: [],
}

const mockCountries = [{ name: 'Bosnia' }, { name: 'Croatia' }, { name: 'Serbia' }, { name: 'Herzegovina' }]

it('Case: default', () => {
  expect(countriesReducer(undefined, {})).toEqual(initialState)
})

it('Case: countries fetched', () => {
  expect(countriesReducer(initialState, {
    type: types.COUNTRIES_REQUEST_SUCCESS,
    payload: mockCountries,
  })).toEqual({
    ...initialState,
    countries: mockCountries,
  })
})

it('Case: countries error', () => {
  expect(countriesReducer(initialState, {
    type: types.COUNTRIES_REQUEST_FAILURE,
    payload: 'failed countries',
  })).toEqual({
    ...initialState,
    hasError: true,
    error: 'failed countries',
  })
})

it('Case: filterin conuntries', () => {
  expect(countriesReducer({ ...initialState, countries: mockCountries }, {
    type: types.FILTER_COUNTRIES,
    payload: 'b',
  })).toEqual({
    ...initialState,
    countries: mockCountries,
    isFiltering: true,
    filterValue: 'b',
    filteredCountries: [{ name: 'Bosnia' }],
  })
})

it('Case: save countries', () => {
  expect(countriesReducer(initialState, {
    type: types.SAVE_LOCAL_COUNTRIES,
    payload: mockCountries,
  })).toEqual({
    ...initialState,
    countries: mockCountries,
  })
})

it('Case: Clear countries', () => {
  expect(countriesReducer(initialState, {
    type: types.FILTER_COUNTRIES_CLEAR,
  })).toEqual(initialState)
})
