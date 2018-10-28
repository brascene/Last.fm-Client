import store from 'react-native-simple-store'
import config from './config'

export class Storage {
  constructor() {
    this.COUNTRIES = []
    this.COUNTRIES_KEY = config.StorageKeys.countries
    this.API_SIG_KEY = config.StorageKeys.api_sig
    this.SESSION_KEY = config.StorageKeys.session_key
    this.USERNAME_KEY = config.StorageKeys.username
  }

  async storeApiSig(api_sig) {
    await store.save(this.API_SIG_KEY, api_sig)
  }

  async storeCountries(countries) {
    await store.save(this.COUNTRIES_KEY, countries)
  }

  async storeUsername(username) {
    await store.save(this.USERNAME_KEY, username)
  }

  async storeSessionKey(key) {
    await store.save(this.SESSION_KEY, key)
  }

  async getCountries() {
    const countries = await store.get(this.COUNTRIES_KEY)
    return countries
  }

  async getUsername() {
    const username = await store.get(this.USERNAME_KEY)
    return username
  }

  async getSessionKey() {
    const session_key = await store.get(this.SESSION_KEY)
    return session_key
  }

  async getApiSig() {
    const api_sig = await store.get(this.API_SIG_KEY)
    return api_sig
  }

  deleteCountries() {
    return store.delete(this.COUNTRIES_KEY)
  }

  deleteApiSig() {
    return store.delete(this.API_SIG_KEY)
  }

  deleteSessionKey() {
    return store.delete(this.SESSION_KEY)
  }

  deleteUsername() {
    return store.delete(this.USERNAME_KEY)
  }
}

export const appStorage = new Storage()
