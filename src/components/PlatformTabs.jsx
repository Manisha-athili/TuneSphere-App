import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const PlatformTabs = ({ selectedPlatform, onSelectPlatform }) => {
  const platforms = [
    { id: 'all', name: 'All', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'spotify', name: 'Spotify', icon: '🎧' },
    { id: 'jiosaavn', name: 'JioSaavn', icon: '🎶' },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      {platforms.map((platform) => (
        <TouchableOpacity
          key={platform.id}
          className={`flex-row items-center py-2.5 px-4 rounded-full mr-2.5 ${
            selectedPlatform === platform.id ? 'bg-green-500' : 'bg-gray-800'
          }`}
          onPress={() => onSelectPlatform(platform.id)}
        >
          <Text className="text-base mr-1.5">{platform.icon}</Text>
          <Text
            className={`text-sm font-semibold ${
              selectedPlatform === platform.id ? 'text-white' : 'text-gray-400'
            }`}
          >
            {platform.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PlatformTabs;