import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const TrendingSection = ({ songs, onSongPress, title = 'Trending Now' }) => {
  const renderTrendingItem = ({ item, index }) => (
    <TouchableOpacity 
      className="w-35 mr-4 bg-gray-800 rounded-lg p-2.5"
      onPress={() => onSongPress(item)}
    >
      <View className="absolute top-1.5 right-1.5 bg-green-500 w-6 h-6 rounded-full justify-center items-center z-10">
        <Text className="text-white text-xs font-bold">{index + 1}</Text>
      </View>
      <Image
        source={{ uri: item.thumbnail || 'https://via.placeholder.com/80' }}
        className="w-full h-30 rounded-lg mb-2"
      />
      <View className="px-1">
        <Text className="text-white text-sm font-bold mb-1" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-gray-400 text-xs" numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-5">
      <Text className="text-xl font-bold text-white mb-4 px-4">{title}</Text>
      <FlatList
        horizontal
        data={songs}
        keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
        renderItem={renderTrendingItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default TrendingSection;