import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation= useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback>
          <View style={styles.inner}>
            {/* Logo and App Name */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/SpendzyLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Spendzy AI</Text>
            </View>

            {/* Welcome Message */}
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subText}>Sign in to manage your finances</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.textInputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.textInputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#8E9AAF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Alternative Login Options */}
            <View style={styles.altLoginContainer}>
              <Text style={styles.altLoginText}>Or login with</Text>
              <View style={styles.biometricOptions}>
                <TouchableOpacity style={styles.biometricButton}>
                  <Ionicons name="finger-print-outline" size={24} color="#2D6BFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.biometricButton}>
                  <Icon name="face-recognition" size={24} color="#2D6BFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Option */}
            <ThemedView style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <ThemedText style={styles.signupLink}>Sign up</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom:20,
  },
  keyboardAvoid: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D6BFF',
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 8,
    alignContent: 'center',
    textAlign: 'center',   
  },
  subText: {
    fontSize: 16,
    color: '#1A2138',
    marginBottom: 32,
    alignContent: 'center',
    textAlign: 'center',  
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 8,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7F9FC',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#1A2138',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  loginButton: {
    backgroundColor: '#2D6BFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#2D6BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  altLoginContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  altLoginText: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 16,
  },
  biometricOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  biometricButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F7F9FC',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
});

