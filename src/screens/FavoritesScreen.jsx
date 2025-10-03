import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { userAPI } from '../services/api';
import MusicCard from '../components/MusicCard';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const response = await userAPI.getFavorites();
      setFavorites(response.data.favorites || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const renderFavoriteItem = ({ item }) => (
    <MusicCard
      song={item}
      onPress={() => navigation.navigate('Player', { song: item })}
    />
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
        <Text className="text-3xl font-bold text-white">❤️ Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-white text-xl font-bold mb-2.5">
            No favorites yet
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Add songs to your favorites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
          renderItem={renderFavoriteItem}
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

export default FavoritesScreen;