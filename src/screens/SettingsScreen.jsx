import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [darkMode, setDarkMode] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear specific cache items (not auth data)
              await AsyncStorage.removeItem('cached_songs');
              Alert.alert('Success', 'Cache cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white mb-2">Settings</Text>
        <Text className="text-gray-400 text-sm">Customize your experience</Text>
      </View>

      {/* Playback Settings */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-bold text-white mb-3">Playback</Text>

        <View className="bg-gray-800 rounded-lg">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
            <View className="flex-1">
              <Text className="text-white text-base">Autoplay</Text>
              <Text className="text-gray-400 text-sm">Continue playing similar songs</Text>
            </View>
            <Switch
              value={autoplay}
              onValueChange={setAutoplay}
              trackColor={{ false: '#4b5563', true: '#10b981' }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity className="p-4">
            <Text className="text-white text-base mb-1">Streaming Quality</Text>
            <Text className="text-gray-400 text-sm">High</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-bold text-white mb-3">Notifications</Text>

        <View className="bg-gray-800 rounded-lg p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-base">Push Notifications</Text>
              <Text className="text-gray-400 text-sm">Get updates about new releases</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#4b5563', true: '#10b981' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Appearance */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-bold text-white mb-3">Appearance</Text>

        <View className="bg-gray-800 rounded-lg p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-base">Dark Mode</Text>
              <Text className="text-gray-400 text-sm">Always enabled</Text>
            </View>
            <Switch
              value={darkMode}
              disabled
              trackColor={{ false: '#4b5563', true: '#10b981' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Storage */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-bold text-white mb-3">Storage</Text>

        <View className="bg-gray-800 rounded-lg">
          <TouchableOpacity className="p-4 border-b border-gray-700">
            <Text className="text-white text-base mb-1">Download Location</Text>
            <Text className="text-gray-400 text-sm">Internal Storage</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4" onPress={handleClearCache}>
            <Text className="text-white text-base mb-1">Clear Cache</Text>
            <Text className="text-gray-400 text-sm">Free up storage space</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-bold text-white mb-3">Account</Text>

        <View className="bg-gray-800 rounded-lg">
          <TouchableOpacity 
            className="p-4 border-b border-gray-700"
            onPress={() => navigation.navigate('Profile')}
          >
            <Text className="text-white text-base">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="p-4 border-b border-gray-700"
            onPress={() => Alert.alert('Coming Soon', 'Change password feature coming soon!')}
          >
            <Text className="text-white text-base">Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4">
            <Text className="text-red-500 text-base">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Legal */}
      <View className="px-5 mb-10">
        <Text className="text-xl font-bold text-white mb-3">Legal</Text>

        <View className="bg-gray-800 rounded-lg">
          <TouchableOpacity 
            className="p-4 border-b border-gray-700"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy will open here')}
          >
            <Text className="text-white text-base">Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="p-4 border-b border-gray-700"
            onPress={() => Alert.alert('Terms of Service', 'Terms of Service will open here')}
          >
            <Text className="text-white text-base">Terms of Service</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="p-4"
            onPress={() => Alert.alert('Licenses', 'Open Source Licenses will show here')}
          >
            <Text className="text-white text-base">Open Source Licenses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
