import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
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

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigation= useNavigation();
  
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

          {/* Create Account Heading */}
          <Text style={styles.headerText}>Create Account</Text>
          <Text style={styles.subText}>Sign up to start managing your finances</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="person-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

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
                placeholder="Create a password"
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
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
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

          {/* Terms and Conditions */}
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View style={styles.checkbox}>
              {agreeToTerms && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[
              styles.signupButton, 
              (!fullName || !email || !password || !confirmPassword || !agreeToTerms || password !== confirmPassword) 
                ? styles.signupButtonDisabled 
                : {}
            ]}
            disabled={!fullName || !email || !password || !confirmPassword || !agreeToTerms || password !== confirmPassword}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Social Sign Up */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or sign up with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#1A2138" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#1A2138" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#1A2138" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Option */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
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
    marginBottom: 24,
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
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
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
    marginTop: 8,
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
  errorText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2D6BFF',
    marginRight: 12,
    backgroundColor: '#2d6bffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#8E9AAF',
    flex: 1,
  },
  termsLink: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  signupButton: {
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
  signupButtonDisabled: {
    backgroundColor: '#A0B0D9',
    shadowOpacity: 0,
    elevation: 0,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialText: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F7F9FC',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
