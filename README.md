# 🎵 TuneSphere Frontend

React Native (Expo) mobile application for TuneSphere music streaming platform.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Styling with NativeWind](#styling-with-nativewind)
- [Navigation](#navigation)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

---

## 🎯 Overview

The TuneSphere frontend is a cross-platform mobile application built with React Native and Expo. It provides a seamless music streaming experience on iOS, Android, and Web platforms.

### Key Features

- 🎵 Music playback and streaming
- 🔐 User authentication and profiles
- 📝 Playlist creation and management
- 🔍 Music search and discovery
- 📱 Cross-platform support (iOS, Android, Web)
- 🎨 Modern UI with TailwindCSS (NativeWind)
- 📡 Real-time API integration

---

## 🛠 Tech Stack

- **React Native** (v0.81.4) - Mobile framework
- **Expo** (~54.0.12) - Development platform
- **React Navigation** (v7) - Navigation library
- **NativeWind** (v4.2.1) - TailwindCSS for React Native
- **Axios** (v1.12.2) - HTTP client
- **AsyncStorage** (v2.2.0) - Local storage
- **JWT Decode** (v4.0.0) - Token decoding
- **React Native WebView** - Web content rendering

---

## 📁 Project Structure

```
frontend/
│
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
├── tailwind.config.js          # TailwindCSS configuration
├── metro.config.js             # Metro bundler configuration
│
├── src/
│   ├── screens/               # Application screens
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── ForgotPasswordScreen.js
│   │   ├── home/
│   │   │   ├── HomeScreen.js
│   │   │   ├── MusicPlayerScreen.js
│   │   │   └── SearchScreen.js
│   │   ├── playlist/
│   │   │   ├── PlaylistScreen.js
│   │   │   ├── CreatePlaylistScreen.js
│   │   │   └── PlaylistDetailScreen.js
│   │   ├── profile/
│   │   │   ├── ProfileScreen.js
│   │   │   └── EditProfileScreen.js
│   │   └── admin/
│   │       └── AdminDashboard.js
│   │
│   ├── components/            # Reusable components
│   │   ├── common/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Card.js
│   │   │   └── Loading.js
│   │   ├── music/
│   │   │   ├── MusicCard.js
│   │   │   ├── MusicPlayer.js
│   │   │   └── PlaylistCard.js
│   │   └── navigation/
│   │       └── TabBar.js
│   │
│   ├── navigation/            # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── BottomTabNavigator.js
│   │
│   ├── services/              # API services
│   │   ├── api.js            # Axios configuration
│   │   ├── authService.js    # Authentication API
│   │   ├── musicService.js   # Music API
│   │   ├── playlistService.js # Playlist API
│   │   └── userService.js    # User API
│   │
│   ├── context/              # React Context
│   │   ├── AuthContext.js
│   │   └── MusicContext.js
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useMusic.js
│   │   └── usePlaylist.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── storage.js       # AsyncStorage helpers
│   │   ├── validation.js    # Form validation
│   │   └── helpers.js       # General helpers
│   │
│   ├── constants/            # Constants
│   │   ├── colors.js
│   │   └── config.js        # API configuration
│   │
│   └── assets/               # Static assets
│       ├── images/
│       ├── icons/
│       └── fonts/
│
└── .gitignore
```

---

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - Install globally:
  ```bash
  npm install -g expo-cli
  ```
- **Git** - [Download](https://git-scm.com/)

### For Development:

- **Expo Go App** - Install on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### For Building (Optional):

- **EAS CLI** - For production builds:
  ```bash
  npm install -g eas-cli
  ```
- **Android Studio** - For Android emulator
- **Xcode** - For iOS simulator (macOS only)

---

## 🚀 Installation

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all dependencies from `package.json`:

```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-navigation/bottom-tabs": "^7.4.7",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.26",
    "axios": "^1.12.2",
    "expo": "~54.0.12",
    "expo-status-bar": "~3.0.8",
    "jwt-decode": "^4.0.0",
    "nativewind": "^4.2.1",
    "react": "19.1.0",
    "react-native": "0.81.4",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-webview": "13.15.0",
    "tailwindcss": "^3.4.18"
  }
}
```
assets :

https://res.cloudinary.com/doiezptnn/image/upload/v1759546222/Screenshot_2025-10-04_081901_emna3g.png


### Step 3: Clear Cache (if needed)

```bash
# Clear Expo cache
expo start -c

# Or clear npm cache
npm cache clean --force
```

---

## ⚙️ Configuration

### Step 1: Create Configuration File

Create `src/constants/config.js`:

```javascript
// src/constants/config.js

const ENV = {
  development: {
    API_URL: 'http://localhost:5000/api',
    // For physical device, use your computer's IP:
    // API_URL: 'http://192.168.1.16:5000/api',
  },
  production: {
    API_URL: 'https://your-production-api.com/api',
  },
};

const getEnvVars = () => {
  // __DEV__ is a global variable set by React Native
  if (__DEV__) {
    return ENV.development;
  }
  return ENV.production;
};

export default getEnvVars();
```

### Step 2: Configure API Service

Create or update `src/services/api.js`:

```javascript
// src/services/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../constants/config';

// Create axios instance
const api = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      await AsyncStorage.removeItem('authToken');
      // Navigate to login screen
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 3: Configure Tailwind (NativeWind)

Ensure `tailwind.config.js` exists:

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#191414',
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
```

Update `babel.config.js`:

```javascript
// babel.config.js

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

### Step 4: Configure App.json

Update `app.json` with your app details:

```json
{
  "expo": {
    "name": "TuneSphere",
    "slug": "tunesphere",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#191414"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tunesphere.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#191414"
      },
      "package": "com.tunesphere.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## 🎮 Running the App

### Start Expo Development Server

```bash
# Start Expo
npm start

# Or with specific options
expo start
```

This will open Expo DevTools in your browser and show a QR code.

### Running on Different Platforms

#### 📱 Physical Device (Recommended)

1. **Install Expo Go** on your phone
2. **Ensure same WiFi** - Phone and computer must be on the same network
3. **Scan QR code**:
   - **iOS**: Use Camera app to scan QR code
   - **Android**: Use Expo Go app to scan QR code

**Important**: Update API_URL to use your computer's local IP:
```javascript
// For physical device testing
API_URL: 'http://192.168.1.16:5000/api'
```

To find your local IP:
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig | grep "inet "
```

#### 🤖 Android Emulator

```bash
npm run android
# Or
expo start --android
```

**Prerequisites**: Android Studio with emulator installed

#### 🍎 iOS Simulator (macOS only)

```bash
npm run ios
# Or
expo start --ios
```

**Prerequisites**: Xcode with simulator installed

#### 🌐 Web Browser

```bash
npm run web
# Or
expo start --web
```

Opens in default browser at `http://localhost:19006`

---

## 🎨 Styling with NativeWind

NativeWind brings TailwindCSS to React Native:

### Basic Usage

```javascript
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-secondary p-4">
      <Text className="text-white text-2xl font-bold">
        Welcome to TuneSphere
      </Text>
      <View className="bg-primary p-4 rounded-lg mt-4">
        <Text className="text-white text-center">
          Play Music
        </Text>
      </View>
    </View>
  );
}
```

### Custom Colors

Define in `tailwind.config.js` and use in components:

```javascript
<View className="bg-primary">
  <Text className="text-accent">Hello</Text>
</View>
```

### Responsive Design

```javascript
<View className="w-full md:w-1/2 lg:w-1/3">
  {/* Content */}
</View>
```

---

## 🧭 Navigation

### Navigation Structure

```javascript
// src/navigation/AppNavigator.js

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Bottom Tab Navigation

```javascript
// src/navigation/BottomTabNavigator.js

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import PlaylistScreen from '../screens/playlist/PlaylistScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Playlists" component={PlaylistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

---

## 📡 API Integration

### Authentication Service

```javascript
// src/services/authService.js

import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // Register
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Logout
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};
```

### Music Service

```javascript
// src/services/musicService.js

import api from './api';

export const musicService = {
  // Get all music
  getAllMusic: async () => {
    const response = await api.get('/music');
    return response.data;
  },

  // Get music by ID
  getMusicById: async (id) => {
    const response = await api.get(`/music/${id}`);
    return response.data;
  },

  // Search music
  searchMusic: async (query) => {
    const response = await api.get('/music/search', {
      params: { q: query },
    });
    return response.data;
  },
};
```

---

## 🔄 State Management

### Using React Context

```javascript
// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          await logout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### Custom Hook

```javascript
// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## 🏗️ Building for Production

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Configure EAS Build

```bash
eas build:configure
```

### Build for Android

```bash
# Build APK (for testing)
eas build --platform android --profile preview

# Build AAB (for Play Store)
eas build --platform android --profile production
```

### Build for iOS

```bash
# Build for App Store
eas build --platform ios --profile production

# Build for simulator
eas build --platform ios --profile preview
```

### Submit to Stores

```bash
# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

---

## 🐛 Troubleshooting

### Cannot Connect to Backend

**Problem**: Network request failed

**Solutions**:
```javascript
// 1. Check API URL
console.log('API URL:', config.API_URL);

// 2. For physical device, use local IP
API_URL: 'http://192.168.1.16:5000/api'

// 3. Check backend is running
curl http://localhost:5000/health

// 4. Test network connectivity
ping 192.168.1.16
```

### Expo Start Issues

**Problem**: Expo won't start or shows errors

**Solutions**:
```bash
# Clear cache
expo start -c

# Reset Metro bundler
npx react-native start --reset-cache

# Reinstall node_modules
rm -rf node_modules
npm install

# Clear watchman cache (macOS/Linux)
watchman watch-del-all
```

### NativeWind Styles Not Working

**Problem**: TailwindCSS classes not applying

**Solutions**:
```bash
# 1. Check babel.config.js includes nativewind
# 2. Restart Metro bundler
npm start -- --reset-cache

# 3. Reinstall dependencies
npm install
```

### JWT Token Issues

**Problem**: Authentication not persisting

**Solutions**:
```javascript
// Check AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Debug token
const token = await AsyncStorage.getItem('authToken');
console.log('Stored token:', token);

// Clear storage
await AsyncStorage.clear();
```

### Build Errors

**Problem**: Build fails with EAS

**Solutions**:
```bash
# Check eas.json configuration
# Verify app.json settings
# Check for iOS bundle identifier / Android package conflicts
# Review build logs
eas build:list
```

---

## 🚀 Deployment

### Web Deployment (Netlify/Vercel)

```bash
# Build for web
expo build:web

# Output in web-build/
# Deploy web-build folder to hosting service
```

### OTA Updates (Over-The-Air)

```bash
# Publish update
eas update --branch production

# Users get update without app store submission
```

---

## 📝 Development Tips

### Hot Reload

- Shake device and select "Enable Fast Refresh"
- Or press `r` in Expo CLI to reload

### Debugging

```bash
# Open React DevTools
expo start --dev-client

# Debug in browser
# Press 'j' in Expo CLI to open debugger
```

### Useful Commands

```bash
# Clear cache
expo start -c

# Run on specific device
expo start --ios
expo start --android

# Open in browser
expo start --web

# Tunnel (for network issues)
expo start --tunnel
```

---

## 📧 Support

For frontend-specific issues:
- Check Expo documentation: https://docs.expo.dev
- Review React Navigation docs: https://reactnavigation.org
- Check device/emulator network settings
- Review console logs in Expo CLI

---

## 🎉 Next Steps

1. ✅ Backend running? Check [Backend README](../backend/README.md)
2. ✅ Configure API endpoints
3. ✅ Test on physical device
4. ✅ Build and deploy

---

**Frontend App Ready! 🎵**

Start streaming with TuneSphere!