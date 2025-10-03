import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { playlistAPI } from '../services/api';
import MusicCard from '../components/MusicCard';

const PlaylistDetailScreen = ({ route, navigation }) => {
  const { playlist } = route.params;
  const [playlistData, setPlaylistData] = useState(playlist);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaylistDetails();
  }, []);

  const loadPlaylistDetails = async () => {
    try {
      const response = await playlistAPI.getPlaylistById(playlist._id);
      setPlaylistData(response.data);
      // In a real app, you'd fetch full song details from the song IDs
      setSongs([]);
    } catch (error) {
      console.error('Error loading playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSong = (songId) => {
    Alert.alert(
      'Remove Song',
      'Remove this song from playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await playlistAPI.removeSongFromPlaylist(playlist._id, songId);
              Alert.alert('Success', 'Song removed from playlist');
              await loadPlaylistDetails();
            } catch (error) {
              Alert.alert('Error', 'Failed to remove song');
            }
          },
        },
      ]
    );
  };

  const renderSongItem = ({ item }) => (
    <View className="flex-row items-center">
      <View className="flex-1">
        <MusicCard
          song={item}
          onPress={() => navigation.navigate('Player', { song: item })}
        />
      </View>
      <TouchableOpacity
        className="p-2"
        onPress={() => handleRemoveSong(item.id)}
      >
        <Text className="text-red-500 text-xl">✕</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-950">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white mb-2">
          {playlistData.name}
        </Text>
        <Text className="text-gray-400 text-sm">
          {playlistData.songs?.length || 0} songs
        </Text>
      </View>

      {playlistData.songs?.length === 0 ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-white text-xl font-bold mb-2.5">
            No songs in this playlist
          </Text>
          <Text className="text-gray-400 text-sm text-center mb-5">
            Search for songs and add them to this playlist
          </Text>
          <TouchableOpacity
            className="bg-green-500 px-6 py-3 rounded-lg"
            onPress={() => navigation.navigate('Search')}
          >
            <Text className="text-white font-bold">Search Songs</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={renderSongItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
    </View>
  );
};

export default PlaylistDetailScreen;