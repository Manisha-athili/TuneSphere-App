import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { musicAPI, playlistAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import PlatformTabs from '../components/PlatformTabs';
import MusicCard from '../components/MusicCard';
import TrendingSection from '../components/TrendingSection';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [trendingRes, playlistsRes] = await Promise.all([
        musicAPI.getTrendingSongs(),
        playlistAPI.getFeaturedPlaylists(),
      ]);
      setTrendingSongs(trendingRes.data);
      setFeaturedPlaylists(playlistsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await musicAPI.searchSongs(searchQuery);
      let results = response.data;

      if (selectedPlatform !== 'all') {
        results = results.filter(song => song.platform === selectedPlatform);
      }

      setSongs(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setSongs([]);
    setSearchQuery('');
    await loadInitialData();
    setRefreshing(false);
  };

  const renderSongItem = ({ item }) => (
    <MusicCard
      song={item}
      onPress={() => navigation.navigate('Player', { song: item })}
    />
  );

  return (
    <View className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white">🎵 Music App</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />

      <PlatformTabs
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" className="mt-12" />
      ) : (
        <FlatList
          data={songs.length > 0 ? songs : []}
          keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
          renderItem={renderSongItem}
          ListHeaderComponent={
            songs.length === 0 && (
              <>
                <TrendingSection
                  songs={trendingSongs}
                  onSongPress={(song) => navigation.navigate('Player', { song })}
                  title="Trending Now 🔥"
                />
                
                {featuredPlaylists.length > 0 && (
                  <View className="my-5 px-4">
                    <Text className="text-xl font-bold text-white mb-4">Featured Playlists</Text>
                    {featuredPlaylists.map((playlist) => (
                      <View key={playlist._id} className="bg-gray-800 p-4 rounded-lg mb-2.5">
                        <Text className="text-white text-base font-bold mb-1">
                          {playlist.name}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                          {playlist.songs?.length || 0} songs
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )
          }
          ListEmptyComponent={
            !loading && songs.length === 0 && trendingSongs.length === 0 && (
              <View className="items-center py-10">
                <Text className="text-gray-400 text-base">No songs available</Text>
              </View>
            )
          }
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor="#10b981"
            />
          }
          contentContainerStyle={{ padding: 15 }}
        />
      )}
    </View>
  );
};

export default HomeScreen;