import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const playSong = (song, playlistSongs = []) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    if (playlistSongs.length > 0) {
      setPlaylist(playlistSongs);
      const index = playlistSongs.findIndex(s => s._id === song._id || s.id === song.id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    
    let nextIndex = currentIndex + 1;
    if (nextIndex >= playlist.length) {
      nextIndex = isRepeat ? 0 : playlist.length - 1;
    }
    
    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = isRepeat ? playlist.length - 1 : 0;
    }
    
    setCurrentIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    // Implement shuffle logic here
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const value = {
    currentSong,
    isPlaying,
    playlist,
    currentIndex,
    isShuffle,
    isRepeat,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};