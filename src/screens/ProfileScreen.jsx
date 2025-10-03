import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            await logout();
          },
          style: 'destructive'
        },
      ]
    );
  };

 const handleNavigation = (screen) => {
  if (screen === 'Favorites') {
    navigation.navigate('Favorites');
  } else if (screen === 'My Playlists') {
    navigation.navigate('Playlists');
  } else if (screen === 'Admin Dashboard') {
    navigation.navigate('AdminDashboard');
  } else if (screen === 'Settings') {
    navigation.navigate('Settings');
  } else if (screen === 'About') {
    navigation.navigate('About');
  } else {
    Alert.alert('Coming Soon', `${screen} feature will be available soon!`);
  }
};

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white">Profile</Text>
      </View>

      <View className="bg-gray-800 m-4 p-8 rounded-2xl items-center">
        <View className="w-20 h-20 rounded-full bg-green-500 justify-center items-center mb-4">
          <Text className="text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text className="text-white text-2xl font-bold mb-2">
          {user?.name || 'User'}
        </Text>
        <Text className="text-gray-400 text-base mb-2.5">
          {user?.email || ''}
        </Text>
        {isAdmin && (
          <View className="bg-green-500 px-3 py-1 rounded-xl mt-1">
            <Text className="text-white text-xs font-bold">Admin</Text>
          </View>
        )}
      </View>

      <View className="m-4">
        {isAdmin && (
          <TouchableOpacity 
            className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
            onPress={() => handleNavigation('Admin Dashboard')}
          >
            <Text className="text-2xl mr-4">📊</Text>
            <Text className="flex-1 text-white text-base">Admin Dashboard</Text>
            <Text className="text-gray-400 text-2xl">›</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('My Playlists')}
        >
          <Text className="text-2xl mr-4">🎵</Text>
          <Text className="flex-1 text-white text-base">My Playlists</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('Favorites')}
        >
          <Text className="text-2xl mr-4">❤️</Text>
          <Text className="flex-1 text-white text-base">Favorites</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('Edit Profile')}
        >
          <Text className="text-2xl mr-4">✏️</Text>
          <Text className="flex-1 text-white text-base">Edit Profile</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('Settings')}
        >
          <Text className="text-2xl mr-4">⚙️</Text>
          <Text className="flex-1 text-white text-base">Settings</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('About')}
        >
          <Text className="text-2xl mr-4">ℹ️</Text>
          <Text className="flex-1 text-white text-base">About</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="bg-red-500 m-4 p-4 rounded-lg items-center mb-8"
        onPress={handleLogout}
      >
        <Text className="text-white text-base font-bold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;