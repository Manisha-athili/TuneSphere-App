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
import AddToPlaylistModal from '../components/AddToPlaylistModal';

const PlayerScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  
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

 // PlayerScreen.jsx - Update toggleFavorite
const toggleFavorite = async () => {
  try {
    if (isFavorite) {
      // Remove from favorites
      await userAPI.removeFavorite(song._id || song.id || song.songId);
      setIsFavorite(false);
      Alert.alert('Success', 'Removed from favorites');
    } else {
      // Add to favorites - send full song object
      await userAPI.addFavorite({
        songId: song._id || song.id || song.songId,
        title: song.title,
        artist: song.artist,
        platform: song.platform,
        thumbnail: song.thumbnail,
        url: song.url,
        duration: song.duration,
      });
      setIsFavorite(true);
      Alert.alert('Success', 'Added to favorites');
    }
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
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(err => {
        Alert.alert('Error', 'Could not open the link');
        console.error('Error opening URL:', err);
      });
    }
  };

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
        <Text className="text-green-500 text-base">← Back</Text>
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

      {Platform.OS === 'web' && <WebPlayer />}

      <View className="items-center mb-8 px-5">
        <View className="flex-row gap-3 mb-4">
          <TouchableOpacity 
            onPress={toggleFavorite} 
            className="flex-row items-center bg-gray-800 px-5 py-3 rounded-full"
          >
            <Text className="text-xl mr-2">{isFavorite ? '❤️' : '🤍'}</Text>
            <Text className="text-white text-sm">
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setShowPlaylistModal(true)}
            className="flex-row items-center bg-gray-800 px-5 py-3 rounded-full"
          >
            <Text className="text-xl mr-2">➕</Text>
            <Text className="text-white text-sm">Playlist</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-green-500 px-8 py-4 rounded-full w-full"
          onPress={handlePlaySong}
        >
          <Text className="text-white text-lg font-bold text-center">
            {Platform.OS === 'web' ? '▶️ Open in New Tab' : `▶️ Open in ${song.platform}`}
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

      <AddToPlaylistModal
        visible={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        song={song}
      />
    </ScrollView>
  );
};

export default PlayerScreen;