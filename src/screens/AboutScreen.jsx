import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

const AboutScreen = () => {
  const appVersion = '1.0.0';
  const buildNumber = '1';

  const openLink = (url, title) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', `Could not open ${title}`);
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <View className="items-center mb-8">
          <Text className="text-6xl mb-4">🎵</Text>
          <Text className="text-3xl font-bold text-white mb-2">TuneSphere</Text>
          <Text className="text-gray-400 text-base">Your Music, All Platforms</Text>
        </View>

        {/* Version Info */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-400">Version</Text>
            <Text className="text-white">{appVersion}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Build Number</Text>
            <Text className="text-white">{buildNumber}</Text>
          </View>
        </View>

        {/* Features */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-white mb-3">Features</Text>
          <View className="bg-gray-800 rounded-lg p-4">
            <Text className="text-white mb-2">✅ Search across YouTube, Spotify & JioSaavn</Text>
            <Text className="text-white mb-2">✅ Create and manage playlists</Text>
            <Text className="text-white mb-2">✅ Save favorite songs</Text>
            <Text className="text-white mb-2">✅ Beautiful dark mode interface</Text>
            <Text className="text-white">✅ Admin dashboard for management</Text>
          </View>
        </View>

        {/* Developer Info */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-white mb-3">Developer</Text>
          <View className="bg-gray-800 rounded-lg p-4">
            <Text className="text-white text-base mb-2">Developed by Your Team</Text>
            <Text className="text-gray-400 text-sm">Made with React Native & MongoDB</Text>
          </View>
        </View>

        {/* Links */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-white mb-3">Links</Text>
          <View className="bg-gray-800 rounded-lg">
            <TouchableOpacity
              className="p-4 border-b border-gray-700"
              onPress={() => openLink('https://github.com', 'GitHub')}
            >
              <Text className="text-white text-base">GitHub Repository</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4 border-b border-gray-700"
              onPress={() => openLink('https://example.com', 'Website')}
            >
              <Text className="text-white text-base">Official Website</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4 border-b border-gray-700"
              onPress={() => Alert.alert('Support', 'Email: support@tunesphere.com')}
            >
              <Text className="text-white text-base">Contact Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4"
              onPress={() => Alert.alert('Rate Us', 'Thank you for using TuneSphere!')}
            >
              <Text className="text-white text-base">Rate This App</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tech Stack */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-white mb-3">Built With</Text>
          <View className="bg-gray-800 rounded-lg p-4">
            <Text className="text-white mb-2">• React Native & Expo</Text>
            <Text className="text-white mb-2">• Node.js & Express</Text>
            <Text className="text-white mb-2">• MongoDB Database</Text>
            <Text className="text-white mb-2">• NativeWind (Tailwind CSS)</Text>
            <Text className="text-white mb-2">• YouTube, Spotify & JioSaavn APIs</Text>
            <Text className="text-white">• JWT Authentication</Text>
          </View>
        </View>

        {/* Copyright */}
        <View className="items-center py-6">
          <Text className="text-gray-400 text-sm mb-2">
            © 2025 TuneSphere. All rights reserved.
          </Text>
          <Text className="text-gray-500 text-xs">
            Made with ❤️ for music lovers
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;