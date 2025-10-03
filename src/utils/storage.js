import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

class Storage {
  // Save data
  async save(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Get data
  async get(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  // Remove data
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  // Clear all data
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Auth specific methods
  async saveToken(token) {
    return await this.save(STORAGE_KEYS.TOKEN, token);
  }

  async getToken() {
    return await this.get(STORAGE_KEYS.TOKEN);
  }

  async removeToken() {
    return await this.remove(STORAGE_KEYS.TOKEN);
  }

  async saveUser(user) {
    return await this.save(STORAGE_KEYS.USER, user);
  }

  async getUser() {
    return await this.get(STORAGE_KEYS.USER);
  }

  async removeUser() {
    return await this.remove(STORAGE_KEYS.USER);
  }

  // Recently played
  async saveRecentlyPlayed(songs) {
    return await this.save(STORAGE_KEYS.RECENTLY_PLAYED, songs);
  }

  async getRecentlyPlayed() {
    return await this.get(STORAGE_KEYS.RECENTLY_PLAYED) || [];
  }

  async addToRecentlyPlayed(song) {
    try {
      const recentlyPlayed = await this.getRecentlyPlayed();
      
      // Remove if already exists
      const filtered = recentlyPlayed.filter(s => s.id !== song.id);
      
      // Add to beginning
      filtered.unshift(song);
      
      // Keep only last 50
      const limited = filtered.slice(0, 50);
      
      return await this.saveRecentlyPlayed(limited);
    } catch (error) {
      console.error('Error adding to recently played:', error);
      return false;
    }
  }
}

export default new Storage();