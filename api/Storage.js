import store from "react-native-simple-store";
import config from "./config"

export class Storage {
  constructor() {
    this.COUNTRIES = [];
    this.COUNTRIES_KEY = config.StorageKeys.countries
  }

  async storeCountries(countries) {
    await store.save(this.COUNTRIES_KEY, countries);
  }

  async getCountries() {
    const countries = await store.get(this.COUNTRIES_KEY);
    return countries;
  }

  deleteCountries() {
    return store.delete(this.COUNTRIES_KEY);
  }
}

export const appStorage = new Storage();
