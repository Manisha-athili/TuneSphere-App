import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { login, adminLogin } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = isAdminLogin 
      ? await adminLogin(email, password)
      : await login(email, password);
    
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-950"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5 justify-center">
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-white mb-2.5">🎵 Tune Sphere</Text>
          <Text className="text-lg text-gray-400">
            {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
          </Text>
        </View>

        <View className="w-full">
          <TextInput
            className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-base"
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-base"
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className={`bg-green-500 p-4 rounded-lg items-center mt-2.5 ${loading ? 'opacity-60' : ''}`}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold">
                {isAdminLogin ? 'Admin Login' : 'Login'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 items-center"
            onPress={() => setIsAdminLogin(!isAdminLogin)}
          >
            <Text className="text-green-500 text-sm">
              {isAdminLogin ? 'User Login' : 'Admin Login'}
            </Text>
          </TouchableOpacity>

          {!isAdminLogin && (
            <TouchableOpacity
              className="mt-5 items-center"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-gray-400 text-sm">
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;