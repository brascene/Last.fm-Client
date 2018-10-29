import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import config from '../../../api/config'
import * as types from '../../../redux/actions/types'
import * as trackActions from '../../../redux/actions/tracks'

const mockTracks = [
  {
    name: 'The Less I Know the Better',
  },
  {
    name: 'Creep',
  },
]

const expectedActions = {
  success: {
    type: types.TRACKS_REQUEST_SUCCESS, payload: { tracks: mockTracks },
  },
  fired: {
    type: types.TRACKS_REQUEST,
  },
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

function nockApi() {
  const endpoint = '?method=geo.gettoptracks&country=spain&api_key=792a09a80600cef2b341ae0436ad42f6&format=json&limit=50'
  nock(config.FM.baseURL, {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  }).post(endpoint)
    .reply(200, {
      tracks: mockTracks,
    })
}

it('Case: Fetching top tracks successfull', async () => {
  nockApi()
  const store = mockStore()
  store.dispatch(trackActions.getTopTracks('spain'))
  expect(store.getActions()[0]).toEqual(expectedActions['fired'])
})
