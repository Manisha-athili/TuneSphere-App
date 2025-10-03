import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { playlistAPI } from '../services/api';

const PlaylistsScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadPlaylists();
    }, [])
  );

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

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlaylists();
    setRefreshing(false);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Error', 'Please enter a playlist name');
      return;
    }

    try {
      await playlistAPI.createPlaylist({
        name: newPlaylistName.trim(),
        songs: [],
      });
      
      setNewPlaylistName('');
      setShowCreateModal(false);
      Alert.alert('Success', 'Playlist created successfully');
      await loadPlaylists();
    } catch (error) {
      Alert.alert('Error', 'Failed to create playlist');
    }
  };

  const handleDeletePlaylist = (playlistId, playlistName) => {
    Alert.alert(
      'Delete Playlist',
      `Are you sure you want to delete "${playlistName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await playlistAPI.deletePlaylist(playlistId);
              Alert.alert('Success', 'Playlist deleted');
              await loadPlaylists();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete playlist');
            }
          },
        },
      ]
    );
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      className="bg-gray-800 p-4 rounded-lg mb-3 flex-row items-center"
      onPress={() => navigation.navigate('PlaylistDetail', { playlist: item })}
    >
      <View className="flex-1">
        <Text className="text-white text-lg font-bold mb-1">
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm">
          {item.songs?.length || 0} songs
        </Text>
      </View>
      <TouchableOpacity
        className="p-2"
        onPress={() => handleDeletePlaylist(item._id, item.name)}
      >
        <Text className="text-red-500 text-xl">🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
      <View className="p-5 pt-12 flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-white">My Playlists</Text>
        <TouchableOpacity
          className="bg-green-500 px-4 py-2 rounded-lg"
          onPress={() => setShowCreateModal(true)}
        >
          <Text className="text-white font-bold">+ New</Text>
        </TouchableOpacity>
      </View>

      {showCreateModal && (
        <View className="bg-gray-800 mx-5 p-4 rounded-lg mb-3">
          <Text className="text-white text-lg font-bold mb-3">
            Create New Playlist
          </Text>
          <TextInput
            className="bg-gray-700 text-white p-3 rounded-lg mb-3"
            placeholder="Playlist name"
            placeholderTextColor="#999"
            value={newPlaylistName}
            onChangeText={setNewPlaylistName}
          />
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-green-500 p-3 rounded-lg"
              onPress={handleCreatePlaylist}
            >
              <Text className="text-white text-center font-bold">Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-gray-700 p-3 rounded-lg"
              onPress={() => {
                setShowCreateModal(false);
                setNewPlaylistName('');
              }}
            >
              <Text className="text-white text-center font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {playlists.length === 0 ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-white text-xl font-bold mb-2.5">
            No playlists yet
          </Text>
          <Text className="text-gray-400 text-sm text-center mb-5">
            Create your first playlist to organize your favorite songs
          </Text>
          <TouchableOpacity
            className="bg-green-500 px-6 py-3 rounded-lg"
            onPress={() => setShowCreateModal(true)}
          >
            <Text className="text-white font-bold">Create Playlist</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item._id}
          renderItem={renderPlaylistItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#10b981"
            />
          }
        />
      )}
    </View>
  );
};

export default PlaylistsScreen;