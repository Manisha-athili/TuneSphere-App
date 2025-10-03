import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const PlayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext,
  isShuffle,
  isRepeat,
  onShuffle,
  onRepeat,
}) => {
  return (
    <View className="items-center">
      <View className="flex-row justify-between w-3/5 mb-5">
        <TouchableOpacity onPress={onShuffle} className="p-2.5">
          <Text className={`text-xl ${isShuffle ? 'opacity-100 text-green-500' : 'opacity-60'}`}>
            🔀
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onRepeat} className="p-2.5">
          <Text className={`text-xl ${isRepeat ? 'opacity-100 text-green-500' : 'opacity-60'}`}>
            🔁
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center w-full">
        <TouchableOpacity onPress={onPrevious} className="p-4">
          <Text className="text-3xl">⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onPlayPause} 
          className="bg-green-500 w-20 h-20 rounded-full justify-center items-center mx-8"
        >
          <Text className="text-4xl">{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} className="p-4">
          <Text className="text-3xl">⏭️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerControls;