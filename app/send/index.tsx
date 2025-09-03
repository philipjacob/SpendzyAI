import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
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

// Sample data for recent recipients
const recentRecipients = [
  { id: '1', name: 'Sarah M.', image: require('../../assets/images/profile-avatar.png') },
  { id: '2', name: 'John D.', image: require('../../assets/images/profile-avatar.png') },
  { id: '3', name: 'Emma W.', image: require('../../assets/images/profile-avatar.png') },
  { id: '4', name: 'Michael B.', image: require('../../assets/images/profile-avatar.png') },
  { id: '5', name: 'Lisa T.', image: require('../../assets/images/profile-avatar.png') },
];

// Sample data for payment methods
const paymentMethods = [
  { id: '1', name: 'Spendzy Balance', icon: 'wallet-outline', balance: '$1,240.50' },
  { id: '2', name: 'Bank Account (...4567)', icon: 'card-outline', balance: '$3,450.75' },
  { id: '3', name: 'Credit Card (...8901)', icon: 'card-outline', balance: 'Available' },
];

export default function SendMoneyScreen(){
  const navigator= useNavigation();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [note, setNote] = useState('');
  
  // Format amount as currency
  const formatAmount = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return amount; // Return previous valid amount
    }
    
    // Format with decimal places
    if (parts.length === 2) {
      if (parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
      }
      return parts[0] + '.' + parts[1];
    }
    
    return numericValue;
  };
  
  const handleAmountChange = (text) => {
    const formattedAmount = formatAmount(text);
    setAmount(formattedAmount);
  };
  
  const handleSelectRecipient = (selectedRecipient) => {
    setRecipient(selectedRecipient);
  };
  
  const handleSendMoney = () => {
    // Validate inputs
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (!recipient) {
      alert('Please select a recipient');
      return;
    }
    
    // Process transaction
    alert(`Sending $${amount} to ${recipient.name}`);
    // In a real app, you would call your API here
    
    // Navigate back or to confirmation screen
    navigator.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigator.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#1A2138" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Send Money</Text>
            <View style={styles.headerRight} />
          </View>
          
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <View style={styles.currencyContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="0.00"
                placeholderTextColor="#8E9AAF"
                keyboardType="decimal-pad"
                autoFocus
              />
            </View>
            <Text style={styles.amountLabel}>Enter amount</Text>
          </View>
          
          {/* Recent Recipients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <FlatList
              data={recentRecipients}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.recipientItem,
                    recipient?.id === item.id ? styles.selectedRecipient : {}
                  ]}
                  onPress={() => handleSelectRecipient(item)}
                >
                  <Image source={item.image} style={styles.recipientImage} />
                  <Text style={styles.recipientName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.recipientsList}
            />
          </View>
          
          {/* Search Recipients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>To</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#8E9AAF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Name, email, or phone number"
                placeholderTextColor="#8E9AAF"
              />
            </View>
            
            {/* AI Suggestion */}
            {searchQuery.length > 0 && (
              <View style={styles.aiSuggestionContainer}>
                <View style={styles.aiIconContainer}>
                  <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.aiSuggestionText}>
                  We found 3 contacts matching "{searchQuery}". Tap to select.
                </Text>
              </View>
            )}
          </View>
          
          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethodItem,
                  selectedPaymentMethod === method.id ? styles.selectedPaymentMethod : {}
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <View style={styles.paymentMethodLeft}>
                  <View style={styles.paymentMethodIcon}>
                    <Ionicons name={method.icon} size={20} color="#2D6BFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentMethodName}>{method.name}</Text>
                    <Text style={styles.paymentMethodBalance}>{method.balance}</Text>
                  </View>
                </View>
                <View style={styles.radioButton}>
                  {selectedPaymentMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Note */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Note (Optional)</Text>
            <View style={styles.noteContainer}>
              <TextInput
                style={styles.noteInput}
                value={note}
                onChangeText={setNote}
                placeholder="What's this for?"
                placeholderTextColor="#8E9AAF"
                multiline
                maxLength={100}
              />
            </View>
          </View>
          
          {/* Fee Information */}
          <View style={styles.feeContainer}>
            <Text style={styles.feeText}>
              Fee: <Text style={styles.feeAmount}>$0.00</Text> • Arrives instantly
            </Text>
          </View>
          
          {/* Security Message */}
          <View style={styles.securityContainer}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#36D1B7" />
            <Text style={styles.securityText}>
              Your transaction is protected by Spendzy's secure encryption
            </Text>
          </View>
          
          {/* Send Button */}
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!amount || !recipient) ? styles.sendButtonDisabled : {}
            ]}
            onPress={handleSendMoney}
            disabled={!amount || !recipient}
          >
            <Text style={styles.sendButtonText}>Send Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
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
  amountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 4,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A2138',
    minWidth: 150,
    textAlign: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#8E9AAF',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 12,
  },
  recipientsList: {
    paddingRight: 20,
  },
  recipientItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  selectedRecipient: {
    transform: [{ scale: 1.05 }],
  },
  recipientImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  recipientName: {
    fontSize: 12,
    color: '#1A2138',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A2138',
  },
  aiSuggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
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
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderWidth: 1,
    borderColor: '#2D6BFF',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  paymentMethodBalance: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2D6BFF',
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  noteInput: {
    fontSize: 16,
    color: '#1A2138',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  feeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  feeText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  feeAmount: {
    fontWeight: '600',
    color: '#1A2138',
  },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  securityText: {
    fontSize: 12,
    color: '#8E9AAF',
    marginLeft: 8,
  },
  sendButton: {
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
  sendButtonDisabled: {
    backgroundColor: '#A0B0D9',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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