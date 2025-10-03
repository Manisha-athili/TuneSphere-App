import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  ScrollView,
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

  const getEmbedUrl = () => {
    const platform = song.platform?.toLowerCase();
    
    if (platform === 'youtube') {
      const videoId = song.url?.split('v=')[1]?.split('&')[0] || song.id;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (platform === 'spotify') {
      const trackId = song.url?.split('/track/')[1]?.split('?')[0] || song.id;
      return `https://open.spotify.com/embed/track/${trackId}`;
    }
    
    return null;
  };

  const handlePlaySong = () => {
    const url = song.url;
    
    if (Platform.OS === 'web') {
      // On web, open in new tab
      window.open(url, '_blank');
    } else {
      // On mobile, open in external app
      Linking.openURL(url).catch(err => {
        Alert.alert('Error', 'Could not open the link');
        console.error('Error opening URL:', err);
      });
    }
  };

  // Web iframe component
  const WebPlayer = () => {
    const embedUrl = getEmbedUrl();
    
    if (!embedUrl) {
      return (
        <View className="bg-gray-800 p-6 rounded-lg mx-5 mb-5">
          <Text className="text-white text-center mb-4">
            Embedded player not available for {song.platform}
          </Text>
          <TouchableOpacity
            className="bg-green-500 p-3 rounded-lg"
            onPress={handlePlaySong}
          >
            <Text className="text-white text-center font-bold">
              Open in {song.platform}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="mx-5 mb-5">
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{ borderRadius: 10 }}
          title="Music Player"
        />
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <TouchableOpacity 
        className="mt-10 ml-5 mb-5"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-green-500 text-base">Back</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: song.thumbnail || 'https://via.placeholder.com/300' }}
        className="w-11/12 h-72 rounded-2xl mb-8 mx-auto"
        resizeMode="cover"
      />

      <View className="items-center mb-5 px-5">
        <Text className="text-white text-2xl font-bold text-center mb-2.5">
          {song.title}
        </Text>
        <Text className="text-gray-400 text-lg mb-2 text-center">
          {song.artist}
        </Text>
        <Text className="text-green-500 text-sm capitalize">
          {song.platform}
        </Text>
        {song.duration && (
          <Text className="text-gray-500 text-sm mt-1">
            {song.duration}
          </Text>
        )}
      </View>

      {/* Show iframe player on web */}
      {Platform.OS === 'web' && <WebPlayer />}

      <View className="items-center mb-8 px-5">
        <TouchableOpacity 
          onPress={toggleFavorite} 
          className="flex-row items-center bg-gray-800 px-5 py-3 rounded-full mb-3"
        >
          <Text className="text-xl mr-2">{isFavorite ? '❤️' : '🤍'}</Text>
          <Text className="text-white text-sm">
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-500 px-8 py-4 rounded-full"
          onPress={handlePlaySong}
        >
          <Text className="text-white text-lg font-bold">
            {Platform.OS === 'web' ? 'Open in New Tab' : `Open in ${song.platform}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 pb-10">
        <View className="bg-gray-800 p-4 rounded-lg">
          <Text className="text-gray-400 text-sm mb-2">Platform: {song.platform}</Text>
          {song.duration && (
            <Text className="text-gray-400 text-sm mb-2">Duration: {song.duration}</Text>
          )}
          <Text className="text-gray-400 text-sm">
            {Platform.OS === 'web' 
              ? 'Player embedded above or click button to open in new tab'
              : `Click button to open in ${song.platform} app`
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayerScreen;