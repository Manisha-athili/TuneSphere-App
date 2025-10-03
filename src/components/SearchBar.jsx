import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ value, onChangeText, onSearch, placeholder = 'Search songs...' }) => {
  return (
    <View className="flex-row px-4 mb-4">
      <TextInput
        className="flex-1 bg-gray-800 text-white p-3 rounded-lg text-base"
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <TouchableOpacity 
        className="bg-green-500 p-3 rounded-lg ml-2.5 justify-center items-center w-12"
        onPress={onSearch}
      >
        <Text className="text-xl">🔍</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;