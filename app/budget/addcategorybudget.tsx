import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Sample category data
const categories = [
  { id: 'food', name: 'Food', icon: require('../../assets/images/restaurant-logo.png') },
  { id: 'shopping', name: 'Shopping', icon: require('../../assets/images/shopping-logo.png') },
  { id: 'transport', name: 'Transport', icon: require('../../assets/images/transport-logo.png') },
  { id: 'entertainment', name: 'Entertainment', icon: require('../../assets/images/entertainment-logo.png') },
  { id: 'bills', name: 'Bills', icon: require('../../assets/images/bills-logo.png') },
  { id: 'health', name: 'Health', icon: require('../../assets/images/health-logo.png') },
  { id: 'education', name: 'Education', icon: require('../../assets/images/education-logo.png') },
  { id: 'travel', name: 'Travel', icon: require('../../assets/images/travel-logo.png') },
];

const AddCategoryBudgetModal = ({ visible, onClose, onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [rollover, setRollover] = useState(false);
  const [recurring, setRecurring] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const handleAmountChange = (text) => {
    // Allow only numbers and decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };
  
  const handleAdd = () => {
    if (!selectedCategory || !amount) {
      // Show error or validation message
      return;
    }
    
    onAdd({
      category: selectedCategory,
      amount: parseFloat(amount),
      rollover,
      notifications,
      recurring,
    });
    
    // Reset form
    setSelectedCategory(null);
    setAmount('');
    setRollover(false);
    setRecurring(true);
    setNotifications(true);
    
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Budget Category</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#8E9AAF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {/* Category Selection */}
            <Text style={styles.sectionTitle}>Select Category</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory?.id === category.id ? styles.selectedCategory : {}
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
            
            {/* Budget Amount */}
            <Text style={styles.sectionTitle}>Budget Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#8E9AAF"
              />
            </View>
            
            {/* Options */}
            <View style={styles.optionItem}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Recurring</Text>
                <Text style={styles.optionDescription}>
                  This Budget will recur monthly
                </Text>
              </View>
              <Switch
                value={recurring}
                onValueChange={setRecurring}
                trackColor={{ false: '#E1E5EB', true: '#2D6BFF' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.optionItem}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Rollover Unused Budget</Text>
                <Text style={styles.optionDescription}>
                  Unused budget will be added to next month
                </Text>
              </View>
              <Switch
                value={rollover}
                onValueChange={setRollover}
                trackColor={{ false: '#E1E5EB', true: '#2D6BFF' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.optionItem}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Budget Notifications</Text>
                <Text style={styles.optionDescription}>
                  Get notified when approaching limit
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E1E5EB', true: '#2D6BFF' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </ScrollView>
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                (!selectedCategory || !amount) ? styles.addButtonDisabled : {}
              ]}
              onPress={handleAdd}
              disabled={!selectedCategory || !amount}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    minHeight: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2138',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
    maxHeight: 600,
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
    marginBottom: 12,
  },
  categoryButton: {
    width: '25%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
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
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: 56,
    fontSize: 24,
    color: '#1A2138',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E9AAF',
  },
  addButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2D6BFF',
  },
  addButtonDisabled: {
    backgroundColor: '#A0B0D9',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
export default AddCategoryBudgetModal;