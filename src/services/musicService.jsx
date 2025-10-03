import api from './api';
import Storage from '../utils/storage';
import { ENDPOINTS } from '../utils/constants';

class MusicService {
  async searchSongs(query) {
    try {
      const response = await api.get(`${ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Search failed',
        data: [],
      };
    }
  }

  async getTrendingSongs() {
    try {
      const response = await api.get(ENDPOINTS.TRENDING);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get trending songs',
        data: [],
      };
    }
  }

  async getSongById(id) {
    try {
      const response = await api.get(`${ENDPOINTS.SONG_BY_ID}/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get song',
        data: null,
      };
    }
  }

  async getSongsByPlatform(platform) {
    try {
      const response = await api.get(`${ENDPOINTS.PLATFORM_SONGS}/${platform}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get songs',
        data: [],
      };
    }
  }

  async addToRecentlyPlayed(song) {
    try {
      await Storage.addToRecentlyPlayed(song);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add to recently played',
      };
    }
  }

  async getRecentlyPlayed() {
    try {
      const songs = await Storage.getRecentlyPlayed();
      return {
        success: true,
        data: songs,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get recently played',
        data: [],
      };
    }
  }

  async toggleFavorite(songId) {
    try {
      const response = await api.get(ENDPOINTS.FAVORITES);
      let favorites = response.data.favorites || [];

      if (favorites.includes(songId)) {
        favorites = favorites.filter(id => id !== songId);
      } else {
        favorites.push(songId);
      }

      await api.put(ENDPOINTS.FAVORITES, { favorites });

      return {
        success: true,
        isFavorite: favorites.includes(songId),
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update favorites',
      };
    }
  }

  async getFavorites() {
    try {
      const response = await api.get(ENDPOINTS.FAVORITES);
      return {
        success: true,
        data: response.data.favorites || [],
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get favorites',
        data: [],
      };
    }
  }

  async isFavorite(songId) {
    try {
      const result = await this.getFavorites();
      if (result.success) {
        return result.data.includes(songId);
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default new MusicService();