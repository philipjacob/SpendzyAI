import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation= useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.background}>
        {/* Decorative Elements */}
        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/SpendzyLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Spendzy AI</Text>
        </View>
        
        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Smart Finance,</Text>
          <Text style={styles.tagline}>Smarter You</Text>
          <Text style={styles.subTagline}>
            Take control of your finances with AI-powered insights
          </Text>
        </View>
        
        {/* AI Features Preview */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="analytics-outline" size={24} color="#2D6BFF" />
            </View>
            <Text style={styles.featureText}>Intelligent Tracking</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#2D6BFF" />
            </View>
            <Text style={styles.featureText}>Smart Insights</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="trophy" size={24} color="#2D6BFF" />
            </View>
            <Text style={styles.featureText}>Goal Optimization</Text>
          </View>
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Onboarding')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom:20,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#F7F9FC',
  },
  decorationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    zIndex: -1,
  },
  decorationPattern: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: '#2D6BFF',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D6BFF',
    marginTop: 12,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2138',
    textAlign: 'center',
  },
  subTagline: {
    fontSize: 16,
    color: '#8E9AAF',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: '80%',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.08,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2D6BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(45, 107, 255, 0.1)',
  },
  featureText: {
    fontSize: 14,
    color: '#1A2138',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: height * 0.08,
    marginBottom: 24,
  },
  getStartedButton: {
    backgroundColor: '#2D6BFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D6BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
});