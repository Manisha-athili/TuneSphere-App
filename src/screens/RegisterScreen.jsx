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

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message);
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
          <Text className="text-lg text-gray-400">Create Account</Text>
        </View>

        <View className="w-full">
          <TextInput
            className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-base"
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

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

          <TextInput
            className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-base"
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className={`bg-green-500 p-4 rounded-lg items-center mt-2.5 ${loading ? 'opacity-60' : ''}`}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-5 items-center"
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-gray-400 text-sm">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;