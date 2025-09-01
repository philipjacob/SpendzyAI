import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  View
} from 'react-native';

// Sample data for categories
const categories = [
  { id: 'food', name: 'Food', icon: require('../../assets/images//restaurant-logo.png') },
  { id: 'shopping', name: 'Shopping', icon: require('../../assets/images//shopping-logo.png') },
  { id: 'transport', name: 'Transport', icon: require('../../assets/images//transport-logo.png') },
  { id: 'entertainment', name: 'Entertainment', icon: require('../../assets/images//entertainment-logo.png') },
  { id: 'income', name: 'Income', icon: require('../../assets/images//income-logo.png') },
  { id: 'grocery', name: 'Grocery', icon: require('../../assets/images//grocery-logo.png') },
];

// Sample data for payment methods
const paymentMethods = [
  { id: 'cash', name: 'Cash' },
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'bank', name: 'Bank Transfer' },
  { id: 'mobile', name: 'Mobile Payment' },
];

export default function AddTransactionScreen() {
  const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState('expense'); // 'expense' or 'income'
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [merchant, setMerchant] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [hasReceipt, setHasReceipt] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const handleSaveTransaction = () => {
    // Validate inputs
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    // Create transaction object
    const transaction = {
      type: transactionType,
      amount: parseFloat(amount),
      date: date,
      category: selectedCategory,
      merchant: merchant,
      paymentMethod: selectedPaymentMethod,
      notes: notes,
      isRecurring: isRecurring,
      hasReceipt: hasReceipt,
    };
    
    // In a real app, you would save this transaction to your database
    console.log('Saving transaction:', transaction);
    
    // Navigate back to transactions screen
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
            <Text style={styles.headerTitle}>Add New Transaction</Text>
            <View style={styles.headerRight} />
          </View>
          
          {/* Transaction Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'expense' ? styles.activeToggleButton : {},
                { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
              ]}
              onPress={() => setTransactionType('expense')}
            >
              <Text
                style={[
                  styles.toggleText,
                  transactionType === 'expense' ? styles.activeToggleText : {}
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'income' ? styles.activeToggleButton : {},
                { borderTopRightRadius: 12, borderBottomRightRadius: 12 }
              ]}
              onPress={() => setTransactionType('income')}
            >
              <Text
                style={[
                  styles.toggleText,
                  transactionType === 'income' ? styles.activeToggleText : {}
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#8E9AAF"
              keyboardType="decimal-pad"
              autoFocus
            />
          </View>
          
          {/* Date Selector */}
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.labelContainer}>
              <Ionicons name="calendar-outline" size={20} color="#8E9AAF" />
              <Text style={styles.label}>Date</Text>
            </View>
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          {/* Category Selector */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory?.id === category.id ? styles.selectedCategoryButton : {}
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Image source={category.icon} style={styles.categoryIcon} />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory?.id === category.id ? styles.selectedCategoryText : {}
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Merchant Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Merchant/Payee</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="business-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={merchant}
                onChangeText={setMerchant}
                placeholder="Enter merchant name"
                placeholderTextColor="#8E9AAF"
              />
            </View>
          </View>
          
          {/* Payment Method Selector */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethodsContainer}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodButton,
                    selectedPaymentMethod?.id === method.id ? styles.selectedPaymentMethodButton : {}
                  ]}
                  onPress={() => setSelectedPaymentMethod(method)}
                >
                  <Text
                    style={[
                      styles.paymentMethodText,
                      selectedPaymentMethod?.id === method.id ? styles.selectedPaymentMethodText : {}
                    ]}
                  >
                    {method.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Notes Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes</Text>
            <View style={styles.textInputWrapper}>
              <Ionicons name="create-outline" size={20} color="#8E9AAF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes (optional)"
                placeholderTextColor="#8E9AAF"
                multiline
              />
            </View>
          </View>
          
          {/* Receipt Upload */}
          <TouchableOpacity
            style={styles.receiptContainer}
            onPress={() => setHasReceipt(!hasReceipt)}
          >
            <View style={styles.receiptLeft}>
              <Ionicons
                name={hasReceipt ? "document" : "document-outline"}
                size={24}
                color={hasReceipt ? "#2D6BFF" : "#8E9AAF"}
              />
              <Text style={[styles.receiptText, hasReceipt ? styles.activeReceiptText : {}]}>
                Add Receipt Photo
              </Text>
            </View>
            {hasReceipt ? (
              <Ionicons name="checkmark-circle" size={24} color="#2D6BFF" />
            ) : (
              <Ionicons name="add-circle-outline" size={24} color="#8E9AAF" />
            )}
          </TouchableOpacity>
          
          {/* Recurring Transaction Toggle */}
          <TouchableOpacity
            style={styles.recurringContainer}
            onPress={() => setIsRecurring(!isRecurring)}
          >
            <View style={styles.recurringLeft}>
              <Ionicons
                name={isRecurring ? "repeat" : "repeat-outline"}
                size={24}
                color={isRecurring ? "#2D6BFF" : "#8E9AAF"}
              />
              <Text style={[styles.recurringText, isRecurring ? styles.activeRecurringText : {}]}>
                Recurring Transaction
              </Text>
            </View>
            <View style={[styles.toggleSwitch, isRecurring ? styles.activeToggleSwitch : {}]}>
              <View style={[styles.toggleThumb, isRecurring ? styles.activeToggleThumb : {}]} />
            </View>
          </TouchableOpacity>
          
          {/* AI Suggestion */}
          <View style={styles.aiSuggestionContainer}>
            <View style={styles.aiIconContainer}>
              <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.aiSuggestionText}>
              Based on your spending patterns, this looks like your weekly grocery shopping at Whole Foods.
            </Text>
          </View>
          
          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveTransaction}
          >
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#2D6BFF',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E9AAF',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1A2138',
    marginLeft: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  categoryButton: {
    width: '33.33%',
    paddingHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedCategoryButton: {
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#8E9AAF',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 8,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
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
  paymentMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  paymentMethodButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  selectedPaymentMethodButton: {
    backgroundColor: '#2D6BFF',
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  selectedPaymentMethodText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  receiptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptText: {
    fontSize: 16,
    color: '#8E9AAF',
    marginLeft: 12,
  },
  activeReceiptText: {
    color: '#2D6BFF',
  },
  recurringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  recurringLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recurringText: {
    fontSize: 16,
    color: '#8E9AAF',
    marginLeft: 12,
  },
  activeRecurringText: {
    color: '#2D6BFF',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E1E5EB',
    padding: 2,
  },
  activeToggleSwitch: {
    backgroundColor: '#2D6BFF',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  activeToggleThumb: {
    transform: [{ translateX: 20 }],
  },
  aiSuggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 16,
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
    lineHeight: 20,
  },
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
