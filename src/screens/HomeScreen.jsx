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
  const [allSongs, setAllSongs] = useState([]); // Store all songs
  const [displayedSongs, setDisplayedSongs] = useState([]); // Filtered songs to display
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  // Filter songs whenever platform changes
  useEffect(() => {
    filterSongs();
  }, [selectedPlatform, allSongs]);

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

  const filterSongs = () => {
    if (selectedPlatform === 'all') {
      setDisplayedSongs(allSongs);
    } else {
      const filtered = allSongs.filter(song => 
        song.platform?.toLowerCase() === selectedPlatform.toLowerCase()
      );
      setDisplayedSongs(filtered);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await musicAPI.searchSongs(searchQuery);
      setAllSongs(response.data); // Store all results
      // filterSongs will be called automatically by useEffect
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    // filterSongs will be called automatically by useEffect
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setAllSongs([]);
    setDisplayedSongs([]);
    setSearchQuery('');
    setSelectedPlatform('all');
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
        <Text className="text-3xl font-bold text-white">TuneSphere App</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />

      <PlatformTabs
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handlePlatformChange}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" className="mt-12" />
      ) : (
        <FlatList
          data={displayedSongs}
          keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
          renderItem={renderSongItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            displayedSongs.length === 0 && (
              <>
                <TrendingSection
                  songs={trendingSongs}
                  onSongPress={(song) => navigation.navigate('Player', { song })}
                  title="Trending Now"
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
            !loading && displayedSongs.length === 0 && allSongs.length > 0 && (
              <View className="items-center py-10">
                <Text className="text-gray-400 text-base">
                  No {selectedPlatform} songs found
                </Text>
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