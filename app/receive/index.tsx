import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Clipboard,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ReceiveMoneyScreen(){
  const navigator= useNavigation();
  const [activeTab, setActiveTab] = useState('qrCode');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [paymentLink, setPaymentLink] = useState('https://spendzy.ai/pay/johndoe123');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Sample user data
  const userData = {
    name: 'John Doe',
    accountId: 'johndoe123',
    bankName: 'First National Bank',
    accountNumber: '•••• •••• •••• 4567',
    routingNumber: '072403352',
  };
  
  // Sample recent requests
  const recentRequests = [
    { id: '1', name: 'Sarah M.', amount: '$25.00', date: 'Today, 10:30 AM', status: 'Pending' },
    { id: '2', name: 'Michael B.', amount: '$120.00', date: 'Yesterday', status: 'Completed' },
    { id: '3', name: 'Emma W.', amount: '$45.50', date: '22 Aug, 2025', status: 'Completed' },
  ];
  
  const handleTabChange = (tab) => {
    // Animate tab change
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveTab(tab);
      slideAnim.setValue(50);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };
  
  const handleCopyToClipboard = (text, label) => {
    Clipboard.setString(text);
    Alert.alert(`${label} copied to clipboard`);
  };
  
  const handleShare = async () => {
    try {
      let shareMessage = `Request money from me on Spendzy AI!\n`;
      
      if (amount) {
        shareMessage += `Amount: $${amount}\n`;
      }
      
      if (note) {
        shareMessage += `Note: ${note}\n`;
      }
      
      shareMessage += `Link: ${paymentLink}`;
      
      await Share.share({
        message: shareMessage,
        title: 'Spendzy AI Payment Request',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share payment request');
    }
  };
  
  const handleGenerateLink = () => {
    // In a real app, you would generate a unique link with the amount and note
    let link = `https://spendzy.ai/pay/johndoe123`;
    
    if (amount) {
      link += `?amount=${amount}`;
    }
    
    if (note) {
      link += `${amount ? '&' : '?'}note=${encodeURIComponent(note)}`;
    }
    
    setPaymentLink(link);
    Alert.alert('Success', 'Payment link generated successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigator.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A2138" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Receive Money</Text>
          <View style={styles.headerRight} />
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'qrCode' ? styles.activeTab : {}]}
            onPress={() => handleTabChange('qrCode')}
          >
            <Text style={[styles.tabText, activeTab === 'qrCode' ? styles.activeTabText : {}]}>
              QR Code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'paymentLink' ? styles.activeTab : {}]}
            onPress={() => handleTabChange('paymentLink')}
          >
            <Text style={[styles.tabText, activeTab === 'paymentLink' ? styles.activeTabText : {}]}>
              Payment Link
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'bankDetails' ? styles.activeTab : {}]}
            onPress={() => handleTabChange('bankDetails')}
          >
            <Text style={[styles.tabText, activeTab === 'bankDetails' ? styles.activeTabText : {}]}>
              Bank Details
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Tab Content */}
        <Animated.View 
          style={[
            styles.tabContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {activeTab === 'qrCode' && (
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCodeWrapper}>
                <QRCode
                  value={paymentLink}
                  size={200}
                  color="#1A2138"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <Text style={styles.qrCodeText}>
                Scan this QR code to send money to {userData.name}
              </Text>
              <View style={styles.accountInfoContainer}>
                <Text style={styles.accountInfoLabel}>Account ID</Text>
                <View style={styles.accountInfoRow}>
                  <Text style={styles.accountInfoValue}>{userData.accountId}</Text>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => handleCopyToClipboard(userData.accountId, 'Account ID')}
                  >
                    <Ionicons name="copy-outline" size={20} color="#2D6BFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          
          {activeTab === 'paymentLink' && (
            <View style={styles.paymentLinkContainer}>
              <View style={styles.linkContainer}>
                <Text style={styles.linkLabel}>Your Payment Link</Text>
                <View style={styles.linkRow}>
                  <Text style={styles.linkValue} numberOfLines={1}>
                    {paymentLink}
                  </Text>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => handleCopyToClipboard(paymentLink, 'Payment link')}
                  >
                    <Ionicons name="copy-outline" size={20} color="#2D6BFF" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.aiSuggestionContainer}>
                <View style={styles.aiIconContainer}>
                  <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.aiSuggestionText}>
                  Adding an amount and note makes it easier for others to pay you correctly.
                </Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount (Optional)</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0.00"
                    placeholderTextColor="#8E9AAF"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Note (Optional)</Text>
                <TextInput
                  style={styles.noteInput}
                  value={note}
                  onChangeText={setNote}
                  placeholder="What's this for?"
                  placeholderTextColor="#8E9AAF"
                />
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.generateButton}
                  onPress={handleGenerateLink}
                >
                  <Text style={styles.generateButtonText}>Generate Link</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.shareButton}
                  onPress={handleShare}
                >
                  <Text style={styles.shareButtonText}>Share</Text>
                  <Ionicons name="share-outline" size={20} color="#FFFFFF" style={styles.shareIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {activeTab === 'bankDetails' && (
            <View style={styles.bankDetailsContainer}>
              <View style={styles.bankCard}>
                <View style={styles.bankCardHeader}>
                  <Text style={styles.bankName}>{userData.bankName}</Text>
                  <Image
                    source={require('../../assets/images/bank-logo.png')}
                    style={styles.bankLogo}
                    resizeMode="contain"
                  />
                </View>
                
                <Text style={styles.accountNumber}>{userData.accountNumber}</Text>
                
                <View style={styles.bankDetailRow}>
                  <Text style={styles.bankDetailLabel}>Account Holder</Text>
                  <Text style={styles.bankDetailValue}>{userData.name}</Text>
                </View>
                
                <View style={styles.bankDetailRow}>
                  <Text style={styles.bankDetailLabel}>Routing Number</Text>
                  <View style={styles.bankDetailValueRow}>
                    <Text style={styles.bankDetailValue}>{userData.routingNumber}</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => handleCopyToClipboard(userData.routingNumber, 'Routing number')}
                    >
                      <Ionicons name="copy-outline" size={20} color="#2D6BFF" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.bankDetailRow}>
                  <Text style={styles.bankDetailLabel}>Account Number</Text>
                  <View style={styles.bankDetailValueRow}>
                    <Text style={styles.bankDetailValue}>**** 4567</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => handleCopyToClipboard('12345674567', 'Account number')}
                    >
                      <Ionicons name="copy-outline" size={20} color="#2D6BFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.shareDetailsButton} onPress={handleShare}>
                <Text style={styles.shareDetailsButtonText}>Share Bank Details</Text>
                <Ionicons name="share-outline" size={20} color="#2D6BFF" />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
        
        {/* Recent Payment Requests */}
        <View style={styles.recentRequestsContainer}>
          <Text style={styles.recentRequestsTitle}>Recent Payment Requests</Text>
          
          {recentRequests.map((request) => (
            <View key={request.id} style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>{request.name}</Text>
                <Text style={styles.requestDate}>{request.date}</Text>
              </View>
              <View style={styles.requestAmountContainer}>
                <Text style={styles.requestAmount}>{request.amount}</Text>
                <View style={[
                  styles.requestStatus,
                  request.status === 'Completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                  <Text style={[
                    styles.requestStatusText,
                    request.status === 'Completed' ? styles.statusCompletedText : styles.statusPendingText
                  ]}>
                    {request.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}  onPress={()=>navigator.navigate('Dashboard')}>
              <Ionicons name="home-outline" size={24} color="#8E9AAF" />
              <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
              <Ionicons name="pie-chart-outline" size={24} color="#8E9AAF" onPress={()=>navigator.navigate('Budget')} />
              <Text style={styles.navText}>Budget</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={()=>navigator.navigate('Transactions')}>
              <Ionicons name="list" size={24} color="#2D6BFF" />
              <Text style={[styles.navText, styles.activeNavText]}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Investments')} >
              <Ionicons name="trending-up" size={24} color="#8E9AAF" />
              <Text style={styles.navText}>Investments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Goals')}>
              <Ionicons name="trophy" size={24} color="#8E9AAF" />
              <Text style={styles.navText}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}  onPress={()=>navigator.navigate('Profile')}>
              <Ionicons name="person-outline" size={24} color="#8E9AAF" />
              <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    marginBottom:20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2138',
  },
  headerRight: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F0F5FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E9AAF',
  },
  activeTabText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  tabContent: {
    marginBottom: 24,
  },
  qrCodeContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  qrCodeText: {
    fontSize: 14,
    color: '#8E9AAF',
    textAlign: 'center',
    marginBottom: 24,
  },
  accountInfoContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  accountInfoLabel: {
    fontSize: 12,
    color: '#8E9AAF',
    marginBottom: 8,
  },
  accountInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  copyButton: {
    padding: 8,
  },
  paymentLinkContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  linkContainer: {
    marginBottom: 16,
  },
  linkLabel: {
    fontSize: 12,
    color: '#8E9AAF',
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  linkValue: {
    fontSize: 14,
    color: '#1A2138',
    flex: 1,
    marginRight: 8,
  },
  aiSuggestionContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  aiIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiSuggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
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
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: '#1A2138',
  },
  noteInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1A2138',
    height: 56,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  generateButton: {
    flex: 1,
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#2D6BFF',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  shareIcon: {
    marginLeft: 4,
  },
  bankDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  bankCard: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bankCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  bankLogo: {
    width: 40,
    height: 24,
  },
  accountNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 24,
  },
  bankDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankDetailLabel: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  bankDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
  },
  bankDetailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareDetailsButton: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareDetailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D6BFF',
    marginRight: 8,
  },
  recentRequestsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  recentRequestsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 16,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  requestAmountContainer: {
    alignItems: 'flex-end',
  },
  requestAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  requestStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: '#E6FFF9',
  },
  statusPending: {
    backgroundColor: '#FFF2E6',
  },
  requestStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statusCompletedText: {
    color: '#36D1B7',
  },
  statusPendingText: {
    color: '#FF9F43',
  },
   bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#8E9AAF',
    marginTop: 4,
  },
  activeNavText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
});