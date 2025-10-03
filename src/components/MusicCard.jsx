import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const MusicCard = ({ song, onPress, showPlatform = true }) => {
  return (
    <TouchableOpacity 
      className="flex-row bg-gray-800 p-2.5 rounded-lg mb-2.5 items-center"
      onPress={onPress}
    >
      <Image
        source={{ uri: song.thumbnail || 'https://via.placeholder.com/60' }}
        className="w-15 h-15 rounded-lg"
      />
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>
          {song.title}
        </Text>
        <Text className="text-gray-400 text-sm mb-1" numberOfLines={1}>
          {song.artist}
        </Text>
        {showPlatform && (
          <Text className="text-green-500 text-xs capitalize">{song.platform}</Text>
        )}
      </View>
      <TouchableOpacity className="p-2.5">
        <Text className="text-gray-400 text-xl">⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MusicCard;