import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform, // Add this import
  ActivityIndicator, // Add this if you're using it
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isAdmin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      // Use browser's native confirm for web
      const confirmed = window.confirm(`${title}\n\n${message}`);
      if (confirmed) {
        // Find the destructive button and trigger its onPress
        const logoutButton = buttons.find(btn => btn.style === 'destructive');
        if (logoutButton && logoutButton.onPress) {
          logoutButton.onPress();
        }
      } else {
        // Find the cancel button and trigger its onPress
        const cancelButton = buttons.find(btn => btn.style === 'cancel');
        if (cancelButton && cancelButton.onPress) {
          cancelButton.onPress();
        }
      }
    } else {
      // Use React Native Alert for mobile
      Alert.alert(title, message, buttons);
    }
  };

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('Cancel pressed')
        },
        { 
          text: 'Logout', 
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              // Show error alert
              showAlert('Error', 'Failed to logout. Please try again.', [{ text: 'OK' }]);
            } finally {
              setIsLoggingOut(false);
            }
          },
          style: 'destructive'
        },
      ]
    );
  };

  const handleNavigation = (screen) => {
    if (screen === 'Favorites') {
      navigation.navigate('Favorites');
    } else if (screen === 'My Playlists') {
      navigation.navigate('Playlists');
    } else if (screen === 'Admin Dashboard') {
      navigation.navigate('AdminDashboard');
    } else if (screen === 'Settings') {
      navigation.navigate('Settings');
    } else if (screen === 'About') {
      navigation.navigate('About');
    } else {
      showAlert('Coming Soon', `${screen} feature will be available soon!`, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white">Profile</Text>
      </View>

      <View className="bg-gray-800 m-4 p-8 rounded-2xl items-center">
        <View className="w-20 h-20 rounded-full bg-green-500 justify-center items-center mb-4">
          <Text className="text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text className="text-white text-2xl font-bold mb-2">
          {user?.name || 'User'}
        </Text>
        <Text className="text-gray-400 text-base mb-2.5">
          {user?.email || ''}
        </Text>
        {isAdmin && (
          <View className="bg-green-500 px-3 py-1 rounded-xl mt-1">
            <Text className="text-white text-xs font-bold">Admin</Text>
          </View>
        )}
      </View>

      <View className="m-4">
        {isAdmin && (
          <TouchableOpacity 
            className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
            onPress={() => handleNavigation('Admin Dashboard')}
          >
            <Text className="text-2xl mr-4">📊</Text>
            <Text className="flex-1 text-white text-base">Admin Dashboard</Text>
            <Text className="text-gray-400 text-2xl">›</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('My Playlists')}
        >
          <Text className="text-2xl mr-4">🎵</Text>
          <Text className="flex-1 text-white text-base">My Playlists</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('Favorites')}
        >
          <Text className="text-2xl mr-4">❤️</Text>
          <Text className="flex-1 text-white text-base">Favorites</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('Settings')}
        >
          <Text className="text-2xl mr-4">⚙️</Text>
          <Text className="flex-1 text-white text-base">Settings</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-2.5"
          onPress={() => handleNavigation('About')}
        >
          <Text className="text-2xl mr-4">ℹ️</Text>
          <Text className="flex-1 text-white text-base">About</Text>
          <Text className="text-gray-400 text-2xl">›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="bg-red-500 m-4 p-4 rounded-lg items-center mb-8"
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-base font-bold">Logout</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;