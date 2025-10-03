// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Change this to your backend URL
  TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  RECENTLY_PLAYED: 'recently_played',
};

// Platform Types
export const PLATFORMS = {
  YOUTUBE: 'youtube',
  SPOTIFY: 'spotify',
  JIOSAAVN: 'jiosaavn',
};

// Colors
export const COLORS = {
  primary: '#1DB954',
  background: '#1a1a1a',
  card: '#2a2a2a',
  text: '#fff',
  textSecondary: '#999',
  error: '#ff4444',
  success: '#00C851',
  warning: '#ffbb33',
};

// Dimensions
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// API Endpoints
export const ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ADMIN_LOGIN: '/auth/admin/login',

  // User
  PROFILE: '/users/profile',
  FAVORITES: '/users/favorites',
  RECENTLY_PLAYED: '/users/recently-played',

  // Music
  SEARCH: '/music/search',
  TRENDING: '/music/trending',
  SONG_BY_ID: '/music',
  PLATFORM_SONGS: '/music/platform',

  // Playlist
  PLAYLISTS: '/playlists',
  FEATURED_PLAYLISTS: '/playlists/featured',

  // Admin
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  ADMIN_ACTIVITY: '/admin/activity',
  TOP_SONGS: '/admin/top-songs',
};

export default {
  API_CONFIG,
  STORAGE_KEYS,
  PLATFORMS,
  COLORS,
  SPACING,
  FONT_SIZES,
  VALIDATION,
  ENDPOINTS,
};