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
  View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigation= useNavigation();

  const validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleSendResetLink = () => {
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to verification code screen
      navigation.navigate('Verify', { email });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.inner}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A2138" />
          </TouchableOpacity>
          
          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/SpendzyLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Spendzy AI</Text>
          </View>

          {/* Forgot Password Heading */}
          <Text style={styles.headerText}>Forgot Password</Text>
          <Text style={styles.subText}>
            Enter your email address and we'll send you a link to reset your password
          </Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[
              styles.textInputWrapper,
              emailError ? styles.inputError : {}
            ]}>
              <Ionicons name="mail-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          {/* Send Reset Link Button */}
          <TouchableOpacity 
            style={[
              styles.resetButton,
              (!email || isSubmitting) ? styles.resetButtonDisabled : {}
            ]}
            onPress={handleSendResetLink}
            disabled={!email || isSubmitting}
          >
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.resetButtonText}>Sending...</Text>
                {/* You can add a loading indicator here */}
              </View>
            ) : (
              <Text style={styles.resetButtonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity 
            style={styles.loginContainer}
            onPress={() => navigation.navigate('Login')}
          >
            <Ionicons name="arrow-back" size={16} color="#2D6BFF" style={styles.loginIcon} />
            <Text style={styles.loginText}>Back to Login</Text>
          </TouchableOpacity>
          
          {/* AI Assistant Hint */}
          <View style={styles.aiAssistantContainer}>
            <View style={styles.aiIconContainer}>
              <Ionicons name="bulb-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.aiAssistantText}>
              Having trouble? Our AI assistant can help you recover your account through alternative verification methods.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D6BFF',
    marginTop: 8,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#8E9AAF',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
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
  inputError: {
    borderColor: '#FF6B6B',
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
  errorText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
  resetButton: {
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
  resetButtonDisabled: {
    backgroundColor: '#A0B0D9',
    shadowOpacity: 0,
    elevation: 0,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginIcon: {
    marginRight: 8,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  aiAssistantContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  aiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiAssistantText: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
    lineHeight: 20,
  },
});