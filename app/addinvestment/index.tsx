import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Investment types with icons
const investmentTypes = [
  { id: 'stocks', name: 'Stocks', icon: 'trending-up-outline' },
  { id: 'etfs', name: 'ETFs', icon: 'stats-chart-outline' },
  { id: 'crypto', name: 'Crypto', icon: 'logo-bitcoin' },
  { id: 'bonds', name: 'Bonds', icon: 'document-text-outline' },
  { id: 'real_estate', name: 'Real Estate', icon: 'home-outline' },
  { id: 'fixed_deposits', name: 'Fixed Deposits', icon: 'lock-closed-outline' },
  { id: 'mutual_funds', name: 'Mutual Funds', icon: 'pie-chart-outline' },
];

// Sample trending investments
const trendingInvestments = [
  { id: '1', name: 'Apple Inc.', ticker: 'AAPL', price: '$198.45', change: '+1.2%', positive: true },
  { id: '2', name: 'Tesla', ticker: 'TSLA', price: '$245.30', change: '-0.8%', positive: false },
  { id: '3', name: 'Vanguard S&P 500 ETF', ticker: 'VOO', price: '$450.75', change: '+0.5%', positive: true },
  { id: '4', name: 'Bitcoin', ticker: 'BTC', price: '$65,240.50', change: '+2.3%', positive: true },
];

export default function AddInvestmentScreen() {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [investmentName, setInvestmentName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState('');
  
  // Date picker state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  const handleAddInvestment = () => {
    // Validate inputs
    if (!investmentName || !purchasePrice || !quantity) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Process form data
    const investmentData = {
      type: selectedType,
      name: investmentName,
      purchasePrice,
      quantity,
      purchaseDate: date,
      notes,
      recurring: isRecurring ? { frequency, amount } : null,
    };
    
    // In a real app, you would save this data to your state management or API
    console.log('Investment data:', investmentData);
    
    // Navigate back or to confirmation screen
    alert('Investment added successfully!');
    navigation.goBack();
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
            <Text style={styles.headerTitle}>Add New Investment</Text>
            <View style={styles.headerRight} />
          </View>
          
          {/* Investment Type Selector */}
          <Text style={styles.sectionTitle}>Investment Type</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeContainer}
          >
            {investmentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id ? styles.selectedTypeButton : {}
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Ionicons 
                  name={type.icon} 
                  size={24} 
                  color={selectedType === type.id ? "#FFFFFF" : "#2D6BFF"} 
                />
                <Text 
                  style={[
                    styles.typeText,
                    selectedType === type.id ? styles.selectedTypeText : {}
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Search Field */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#8E9AAF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for investments..."
              placeholderTextColor="#8E9AAF"
            />
          </View>
          
          {/* Investment Details Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Investment Details</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name/Ticker *</Text>
              <TextInput
                style={styles.input}
                value={investmentName}
                onChangeText={setInvestmentName}
                placeholder="e.g., Apple Inc. (AAPL)"
                placeholderTextColor="#8E9AAF"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Purchase Price *</Text>
              <TextInput
                style={styles.input}
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                placeholder="e.g., 198.45"
                placeholderTextColor="#8E9AAF"
                keyboardType="decimal-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Number of Shares/Units *</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="e.g., 10"
                placeholderTextColor="#8E9AAF"
                keyboardType="decimal-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Purchase Date</Text>
              <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
                <Ionicons name="calendar-outline" size={20} color="#2D6BFF" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any additional notes like Interest Rate for Fixed Deposits, Address of Real Estate Investments..."
                placeholderTextColor="#8E9AAF"
                multiline
              />
            </View>
            
            {/* Recurring Investment Setup */}
            <View style={styles.recurringContainer}>
              <View style={styles.recurringHeader}>
                <Text style={styles.recurringTitle}>Set up recurring investment</Text>
                <TouchableOpacity 
                  style={styles.toggleContainer}
                  onPress={() => setIsRecurring(!isRecurring)}
                >
                  <View style={[
                    styles.toggleBackground,
                    isRecurring ? styles.toggleActive : {}
                  ]}>
                    <View style={[
                      styles.toggleCircle,
                      isRecurring ? styles.toggleCircleActive : {}
                    ]} />
                  </View>
                </TouchableOpacity>
              </View>
              
              {isRecurring && (
                <View style={styles.recurringOptions}>
                  <View style={styles.frequencyContainer}>
                    <Text style={styles.inputLabel}>Frequency</Text>
                    <View style={styles.frequencyButtons}>
                      {['weekly', 'monthly', 'quarterly'].map((freq) => (
                        <TouchableOpacity
                          key={freq}
                          style={[
                            styles.frequencyButton,
                            frequency === freq ? styles.activeFrequencyButton : {}
                          ]}
                          onPress={() => setFrequency(freq)}
                        >
                          <Text style={[
                            styles.frequencyText,
                            frequency === freq ? styles.activeFrequencyText : {}
                          ]}>
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={amount}
                      onChangeText={setAmount}
                      placeholder="e.g., 100"
                      placeholderTextColor="#8E9AAF"
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          
          {/* AI Suggestion */}
          <View style={styles.aiSuggestionContainer}>
            <View style={styles.aiIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.aiSuggestionContent}>
              <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
              <Text style={styles.aiSuggestionText}>
                Based on your portfolio, adding more tech stocks could help diversify your investments. Consider allocating 5-10% to reduce overall risk.
              </Text>
            </View>
          </View>
          
          {/* Trending Investments */}
          <View style={styles.trendingSection}>
            <Text style={styles.trendingTitle}>Trending Investments</Text>
            {trendingInvestments.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.trendingItem}
                onPress={() => {
                  setInvestmentName(item.name + ' (' + item.ticker + ')');
                  setPurchasePrice(item.price.replace('$', ''));
                }}
              >
                <View style={styles.trendingLeft}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingTicker}>{item.ticker}</Text>
                </View>
                <View style={styles.trendingRight}>
                  <Text style={styles.trendingPrice}>{item.price}</Text>
                  <Text style={[
                    styles.trendingChange,
                    item.positive ? styles.positiveChange : styles.negativeChange
                  ]}>
                    {item.change}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Add Investment Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddInvestment}
          >
            <Text style={styles.addButtonText}>Add Investment</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
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
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="trending-up-outline" size={24} color="#8E9AAF" />
                <Text style={styles.navText}>Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 16,
  },
  typeContainer: {
    paddingBottom: 16,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  selectedTypeButton: {
    backgroundColor: '#2D6BFF',
    borderColor: '#2D6BFF',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D6BFF',
    marginLeft: 8,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A2138',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A2138',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A2138',
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dateInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  dateText: {
    fontSize: 16,
    color: '#1A2138',
  },
  recurringContainer: {
    marginTop: 8,
  },
  recurringHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recurringTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  toggleContainer: {
    padding: 4,
  },
  toggleBackground: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E1E5EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#2D6BFF',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  recurringOptions: {
    marginTop: 8,
  },
  frequencyContainer: {
    marginBottom: 16,
  },
  frequencyButtons: {
    flexDirection: 'row',
  },
  frequencyButton: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  activeFrequencyButton: {
    backgroundColor: '#F0F5FF',
    borderColor: '#2D6BFF',
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E9AAF',
  },
  activeFrequencyText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  aiSuggestionContainer: {
    backgroundColor: '#F0F5FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiSuggestionContent: {
    flex: 1,
  },
  aiSuggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 8,
  },
  aiSuggestionText: {
    fontSize: 14,
    color: '#1A2138',
    lineHeight: 20,
  },
  trendingSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E1E5EB',
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  trendingLeft: {
    flex: 1,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  trendingTicker: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  trendingRight: {
    alignItems: 'flex-end',
  },
  trendingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  trendingChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#36D1B7',
  },
  negativeChange: {
    color: '#FF6B6B',
  },
  addButton: {
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
  addButtonText: {
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