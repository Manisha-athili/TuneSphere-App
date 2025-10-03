import "./global.css";
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { PlayerProvider } from './src/context/PlayerContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <AppNavigator />
      </PlayerProvider>
    </AuthProvider>
  );
}