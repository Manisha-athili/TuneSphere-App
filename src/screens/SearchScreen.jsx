import React, { useState } from 'react';
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
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

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

  const renderSongItem = ({ item }) => (
    <MusicCard
      song={item}
      onPress={() => navigation.navigate('Player', { song: item })}
    />
  );

  return (
    <View className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white">🔍 Search</Text>
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
      ) : songs.length > 0 ? (
        <FlatList
          data={songs}
          keyExtractor={(item, index) => `${item._id || item.id}-${index}`}
          renderItem={renderSongItem}
          contentContainerStyle={{ padding: 15 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-gray-400 text-base text-center">
            {searchQuery ? 'No results found' : 'Search for your favorite songs'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;