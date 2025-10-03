import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const TrendingSection = ({ songs, onSongPress, title = 'Trending Now' }) => {
  // Debug: Log the songs data
  console.log('TrendingSection - Songs:', songs);
  console.log('TrendingSection - Songs length:', songs?.length);

  // Early return if no songs
  if (!songs || songs.length === 0) {
    console.log('TrendingSection - No songs to display');
    return null;
  }

  const renderTrendingItem = ({ item, index }) => {
    console.log('Rendering trending item:', item?.title);
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => onSongPress(item)}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <Image
          source={{ uri: item.thumbnail || item.albumArt || 'https://via.placeholder.com/150' }}
          style={styles.image}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title || 'Unknown Title'}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {item.artist || 'Unknown Artist'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        horizontal
        data={songs}
        keyExtractor={(item, index) => `trending-${item._id || item.id || index}`}
        renderItem={renderTrendingItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#10b981',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#374151',
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    color: '#9ca3af',
    fontSize: 12,
  },
});

export default TrendingSection;