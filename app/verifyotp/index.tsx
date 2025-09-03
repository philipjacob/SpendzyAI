import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
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

export default function VerificationCodeScreen() {
  const navigator = useNavigation();
  const route = useRoute();
  const { email }:any = route.params || { email: 'your.email@example.com' };
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const inputRefs = useRef([]);
  
  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  const handleCodeChange = (text, index) => {
    // Allow only numbers
    if (!/^\d*$/.test(text)) return;
    
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto focus to next input
    if (text !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handleResendCode = () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(60);
      Alert.alert(
        'Code Resent',
        `A new verification code has been sent to ${email}`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };
  
  const handleVerify = () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter all 6 digits of the verification code');
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Navigate to reset password or next screen
      navigator.navigate('Reset');
    }, 1500);
  };
  
  // Format the timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

          {/* Verification Code Heading */}
          <Text style={styles.headerText}>Verification Code</Text>
          <Text style={styles.subText}>
            We've sent a 6-digit verification code to{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>

          {/* Code Input Fields */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.codeInput}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
          
          {/* Timer */}
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={16} color="#8E9AAF" />
            <Text style={styles.timerText}>
              Code expires in <Text style={styles.timeLeft}>{formatTime(timeLeft)}</Text>
            </Text>
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            style={[
              styles.verifyButton,
              (code.includes('') || isVerifying) ? styles.verifyButtonDisabled : {}
            ]}
            onPress={handleVerify}
            disabled={code.includes('') || isVerifying}
          >
            {isVerifying ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.verifyButtonText}>Verifying...</Text>
                {/* You can add a loading indicator here */}
              </View>
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>

          {/* Resend Code */}
          <TouchableOpacity 
            style={[
              styles.resendContainer,
              timeLeft > 0 ? styles.resendDisabled : {}
            ]}
            onPress={handleResendCode}
            disabled={timeLeft > 0 || isResending}
          >
            {isResending ? (
              <Text style={styles.resendingText}>Resending...</Text>
            ) : (
              <Text style={[styles.resendText, timeLeft > 0 ? styles.resendTextDisabled : {}]}>
                Resend Code
              </Text>
            )}
          </TouchableOpacity>
          
          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Ionicons name="help-circle-outline" size={20} color="#8E9AAF" />
            <Text style={styles.helpText}>
              Didn't receive the code? Check your spam folder or contact support.
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
    marginBottom:20,
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
    textAlign: 'center',
  },
  emailText: {
    fontWeight: '600',
    color: '#1A2138',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    backgroundColor: '#F7F9FC',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A2138',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: '#8E9AAF',
    marginLeft: 8,
  },
  timeLeft: {
    fontWeight: '600',
    color: '#2D6BFF',
  },
  verifyButton: {
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
  verifyButtonDisabled: {
    backgroundColor: '#A0B0D9',
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  resendTextDisabled: {
    color: '#8E9AAF',
  },
  resendingText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  helpContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    color: '#8E9AAF',
    marginLeft: 12,
    lineHeight: 20,
  },
});