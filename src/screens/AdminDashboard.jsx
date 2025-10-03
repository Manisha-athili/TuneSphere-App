import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { adminAPI } from '../services/api';

const AdminDashboard = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-950">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-950"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />
      }
    >
      <View className="p-5 pt-12">
        <Text className="text-3xl font-bold text-white mb-2">Admin Dashboard</Text>
        <Text className="text-gray-400 text-sm">Manage your music app</Text>
      </View>

      {/* Statistics Cards */}
      <View className="px-5">
        <View className="flex-row flex-wrap justify-between">
          <View className="bg-blue-900 p-4 rounded-lg mb-3 w-[48%]">
            <Text className="text-blue-200 text-sm mb-1">Total Users</Text>
            <Text className="text-white text-3xl font-bold">{stats?.totalUsers || 0}</Text>
          </View>

          <View className="bg-green-900 p-4 rounded-lg mb-3 w-[48%]">
            <Text className="text-green-200 text-sm mb-1">Total Songs</Text>
            <Text className="text-white text-3xl font-bold">{stats?.totalSongs || 0}</Text>
          </View>

          <View className="bg-purple-900 p-4 rounded-lg mb-3 w-[48%]">
            <Text className="text-purple-200 text-sm mb-1">Playlists</Text>
            <Text className="text-white text-3xl font-bold">{stats?.totalPlaylists || 0}</Text>
          </View>

          <View className="bg-orange-900 p-4 rounded-lg mb-3 w-[48%]">
            <Text className="text-orange-200 text-sm mb-1">Admins</Text>
            <Text className="text-white text-3xl font-bold">{stats?.totalAdmins || 0}</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="p-5">
        <Text className="text-xl font-bold text-white mb-3">Recent Activity (7 days)</Text>
        <View className="bg-gray-800 p-4 rounded-lg mb-3">
          <Text className="text-gray-400 text-sm">New Users</Text>
          <Text className="text-white text-2xl font-bold">{stats?.recentUsers || 0}</Text>
        </View>
        <View className="bg-gray-800 p-4 rounded-lg">
          <Text className="text-gray-400 text-sm">New Songs</Text>
          <Text className="text-white text-2xl font-bold">{stats?.recentSongs || 0}</Text>
        </View>
      </View>

      {/* Admin Actions */}
      <View className="p-5">
        <Text className="text-xl font-bold text-white mb-3">Admin Actions</Text>

        <TouchableOpacity
          className="bg-gray-800 p-4 rounded-lg mb-3 flex-row items-center"
          onPress={() => navigation.navigate('ManageUsers')}
        >
          <Text className="text-2xl mr-3">👥</Text>
          <Text className="flex-1 text-white text-base">Manage Users</Text>
          <Text className="text-gray-400 text-xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-800 p-4 rounded-lg mb-3 flex-row items-center"
          onPress={() => navigation.navigate('TopSongs')}
        >
          <Text className="text-2xl mr-3">📈</Text>
          <Text className="flex-1 text-white text-base">Top Songs</Text>
          <Text className="text-gray-400 text-xl">›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-800 p-4 rounded-lg mb-3 flex-row items-center"
          onPress={() => navigation.navigate('FeaturedPlaylists')}
        >
          <Text className="text-2xl mr-3">⭐</Text>
          <Text className="flex-1 text-white text-base">Featured Playlists</Text>
          <Text className="text-gray-400 text-xl">›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;