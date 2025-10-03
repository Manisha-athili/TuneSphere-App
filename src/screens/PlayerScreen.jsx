import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { usePlayer } from '../context/PlayerContext';
import { userAPI } from '../services/api';
import PlayerControls from '../components/PlayerControls';

const PlayerScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { 
    isPlaying, 
    togglePlayPause, 
    playNext, 
    playPrevious,
    isShuffle,
    isRepeat,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const response = await userAPI.getFavorites();
      const favorites = response.data.favorites || [];
      setIsFavorite(favorites.includes(song._id || song.id));
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await userAPI.getFavorites();
      let favorites = response.data.favorites || [];
      
      if (isFavorite) {
        favorites = favorites.filter(id => id !== (song._id || song.id));
      } else {
        favorites.push(song._id || song.id);
      }
      
      await userAPI.updateFavorites(favorites);
      setIsFavorite(!isFavorite);
      Alert.alert('Success', isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  return (
    <View className="flex-1 bg-gray-950 p-5">
      <TouchableOpacity 
        className="mt-10 mb-5"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-green-500 text-base">← Back</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: song.thumbnail || 'https://via.placeholder.com/300' }}
        className="w-full h-72 rounded-2xl mb-8"
      />

      <View className="items-center mb-5">
        <Text className="text-white text-2xl font-bold text-center mb-2.5">
          {song.title}
        </Text>
        <Text className="text-gray-400 text-lg mb-2">
          {song.artist}
        </Text>
        <Text className="text-green-500 text-sm capitalize">
          {song.platform}
        </Text>
      </View>

      <View className="items-center mb-8">
        <TouchableOpacity 
          onPress={toggleFavorite} 
          className="flex-row items-center bg-gray-800 px-5 py-3 rounded-full"
        >
          <Text className="text-xl mr-2">{isFavorite ? '❤️' : '🤍'}</Text>
          <Text className="text-white text-sm">
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>

      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onPrevious={playPrevious}
        onNext={playNext}
        isShuffle={isShuffle}
        isRepeat={isRepeat}
        onShuffle={toggleShuffle}
        onRepeat={toggleRepeat}
      />

      {song.url && (
        <TouchableOpacity 
          className="bg-gray-800 p-4 rounded-lg items-center mt-5"
          onPress={() => {
            Alert.alert('Open', `Open in ${song.platform}`);
          }}
        >
          <Text className="text-white text-base">Open in {song.platform}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayerScreen;