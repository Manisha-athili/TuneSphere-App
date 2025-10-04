import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.16:5000/api'; // Change to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
};

// User APIs
// api.jsx - Update userAPI
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (song) => api.post('/users/favorites', song),
  removeFavorite: (songId) => api.delete(`/users/favorites/${songId}`),
  updateFavorites: (favorites) => api.put('/users/favorites', { favorites }),
  getRecentlyPlayed: () => api.get('/users/recently-played'),
};

// Music APIs
export const musicAPI = {
  searchSongs: (query) => api.get(`/music/search?q=${query}`),
  getTrendingSongs: () => api.get('/music/trending'),
  getSongById: (id) => api.get(`/music/${id}`),
  getSongsByPlatform: (platform) => api.get(`/music/platform/${platform}`),
};

// Playlist APIs
export const playlistAPI = {
  getAllPlaylists: () => api.get('/playlists'),
  getPlaylistById: (id) => api.get(`/playlists/${id}`),
  createPlaylist: (data) => api.post('/playlists', data),
  updatePlaylist: (id, data) => api.put(`/playlists/${id}`, data),
  deletePlaylist: (id) => api.delete(`/playlists/${id}`),
  addSongToPlaylist: (id, songId) => api.put(`/playlists/${id}/add`, { songId }),
  removeSongFromPlaylist: (id, songId) => api.put(`/playlists/${id}/remove`, { songId }),
  getFeaturedPlaylists: () => api.get('/playlists/featured'),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getRecentActivity: (limit = 20) => api.get(`/admin/activity?limit=${limit}`),
  getTopSearchedSongs: (limit = 50, platform = 'all') => 
    api.get(`/admin/top-songs?limit=${limit}&platform=${platform}`),
  addFeaturedPlaylist: (playlistId) => api.post('/admin/featured-playlists', { playlistId }),
  removeFeaturedPlaylist: (id) => api.delete(`/admin/featured-playlists/${id}`),
  getFeaturedPlaylists: () => api.get('/admin/featured-playlists'),
  searchUsers: (query) => api.get(`/admin/users/search?query=${query}`),
};

export default api;