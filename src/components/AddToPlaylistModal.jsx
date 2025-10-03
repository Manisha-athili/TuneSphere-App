import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { playlistAPI } from '../services/api';

const AddToPlaylistModal = ({ visible, onClose, song }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      loadPlaylists();
    }
  }, [visible]);

  const loadPlaylists = async () => {
    try {
      const response = await playlistAPI.getAllPlaylists();
      setPlaylists(response.data || []);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await playlistAPI.addSongToPlaylist(playlistId, song.id);
      Alert.alert('Success', 'Song added to playlist');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add song to playlist');
    }
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      className="bg-gray-700 p-4 rounded-lg mb-2 flex-row items-center justify-between"
      onPress={() => handleAddToPlaylist(item._id)}
    >
      <View className="flex-1">
        <Text className="text-white text-base font-bold">{item.name}</Text>
        <Text className="text-gray-400 text-sm">
          {item.songs?.length || 0} songs
        </Text>
      </View>
      <Text className="text-green-500 text-xl">+</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View className="bg-gray-900 rounded-t-3xl p-5 max-h-[80%]">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">Add to Playlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 text-2xl">×</Text>
            </TouchableOpacity>
          </View>

          {song && (
            <View className="bg-gray-800 p-3 rounded-lg mb-4">
              <Text className="text-white text-sm font-bold" numberOfLines={1}>
                {song.title}
              </Text>
              <Text className="text-gray-400 text-xs" numberOfLines={1}>
                {song.artist}
              </Text>
            </View>
          )}

          {loading ? (
            <View className="py-10">
              <ActivityIndicator size="large" color="#10b981" />
            </View>
          ) : playlists.length === 0 ? (
            <View className="py-10 items-center">
              <Text className="text-gray-400 text-center mb-4">
                No playlists yet
              </Text>
              <Text className="text-gray-500 text-sm text-center">
                Create a playlist first from the Profile section
              </Text>
            </View>
          ) : (
            <FlatList
              data={playlists}
              keyExtractor={(item) => item._id}
              renderItem={renderPlaylistItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddToPlaylistModal;