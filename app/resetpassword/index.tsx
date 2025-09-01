import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ResetPasswordScreen(){
  const navigation= useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Password strength calculation
  const calculatePasswordStrength = (password:any) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const passwordStrength = calculatePasswordStrength(password);
  
  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Medium';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };
  
  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#E1E5EB';
    if (passwordStrength === 1) return '#FF6B6B';
    if (passwordStrength === 2) return '#FFD166';
    if (passwordStrength === 3) return '#36D1B7';
    return '#2D6BFF';
  };
  
  const handleResetPassword = () => {
    // Validate password
    if (!password) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    if (passwordStrength < 2) {
      Alert.alert('Weak Password', 'Please create a stronger password with uppercase letters, numbers, or special characters');
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'Your password has been reset successfully',
        [
          { 
            text: 'Login Now', 
            onPress: () => navigation.navigate('Welcome') 
          }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/SpendzyLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Spendzy AI</Text>
          </View>

          {/* Reset Password Heading */}
          <Text style={styles.headerText}>Reset Password</Text>
          <Text style={styles.subText}>
            Create a new password for your account
          </Text>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a new password"
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
            
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  {[...Array(4)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.strengthBar,
                        { backgroundColor: index < passwordStrength ? getStrengthColor() : '#E1E5EB' }
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                  {getStrengthText()}
                </Text>
              </View>
            )}
            
            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password must contain:</Text>
              <View style={styles.requirementItem}>
                <Ionicons 
                  name={password.length >= 8 ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={password.length >= 8 ? "#36D1B7" : "#8E9AAF"} 
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least 8 characters</Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons 
                  name={/[A-Z]/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={/[A-Z]/.test(password) ? "#36D1B7" : "#8E9AAF"} 
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least 1 uppercase letter</Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons 
                  name={/[0-9]/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={/[0-9]/.test(password) ? "#36D1B7" : "#8E9AAF"} 
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least 1 number</Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons 
                  name={/[^A-Za-z0-9]/.test(password) ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={/[^A-Za-z0-9]/.test(password) ? "#36D1B7" : "#8E9AAF"} 
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least 1 special character</Text>
              </View>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#8E9AAF"
                />
              </TouchableOpacity>
            </View>
            {confirmPassword && password !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity 
            style={[
              styles.resetButton,
              (!password || !confirmPassword || password !== confirmPassword || isSubmitting) 
                ? styles.resetButtonDisabled 
                : {}
            ]}
            onPress={handleResetPassword}
            disabled={!password || !confirmPassword || password !== confirmPassword || isSubmitting}
          >
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.resetButtonText}>Updating...</Text>
                {/* You can add a loading indicator here */}
              </View>
            ) : (
              <Text style={styles.resetButtonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
          
          {/* Security Note */}
          <View style={styles.securityContainer}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#36D1B7" />
            <Text style={styles.securityText}>
              Your password is securely encrypted and never stored in plain text.
            </Text>
          </View>
        </ScrollView>
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
  scrollContainer: {
    padding: 24,
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#1A2138',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  strengthBars: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  requirementsContainer: {
    marginTop: 16,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementIcon: {
    marginRight: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#8E9AAF',
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
  securityContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0FBF8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
    marginLeft: 12,
    lineHeight: 20,
  },
});