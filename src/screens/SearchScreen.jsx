import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { musicAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import PlatformTabs from '../components/PlatformTabs';
import MusicCard from '../components/MusicCard';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allSongs, setAllSongs] = useState([]); // Store all songs
  const [displayedSongs, setDisplayedSongs] = useState([]); // Filtered songs to display
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Filter songs whenever platform changes
  useEffect(() => {
    filterSongs();
  }, [selectedPlatform, allSongs]);

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

  const renderSongItem = ({ item }) => (
    <MusicCard
      song={item}
      onPress={() => navigation.navigate('Player', { song: item })}
    />
  );

  return (
    <View className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white">Search</Text>
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
      ) : displayedSongs.length > 0 ? (
        <FlatList
          data={displayedSongs}
          keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
          renderItem={renderSongItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-5">
          {allSongs.length > 0 && displayedSongs.length === 0 ? (
            <Text className="text-gray-400 text-base text-center">
              No {selectedPlatform} songs found
            </Text>
          ) : (
            <Text className="text-gray-400 text-base text-center">
              {searchQuery ? 'No results found' : 'Search for your favorite songs'}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchScreen;