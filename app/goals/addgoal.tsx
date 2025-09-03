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

const AddGoalModal = ({ visible, onClose, onAdd }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [enableRollover, setEnableRollover] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  
  const categories = [
    { id: 'house', name: 'House', icon: require('../../assets/images/house-logo.png') },
    { id: 'car', name: 'Car', icon: require('../../assets/images/car-logo.png') },
    { id: 'vacation', name: 'Vacation', icon: require('../../assets/images/vacation-logo.png') },
    { id: 'education', name: 'Education', icon: require('../../assets/images/education-logo.png') },
    { id: 'emergency', name: 'Emergency', icon: require('../../assets/images/health-logo.png') },
    { id: 'retirement', name: 'Retirement', icon: require('../../assets/images/retirement-logo.png') },
  ];
  
  const handleAdd = () => {
    // Validate inputs
    if (!goalName || !goalAmount || !selectedCategory) {
      // Show error message
      return;
    }
    
    // Create new goal object
    const newGoal = {
      name: goalName,
      amount: parseFloat(goalAmount),
      category: selectedCategory,
      enableRollover,
      enableNotifications,
    };
    
    // Pass to parent component
    onAdd(newGoal);
    
    // Reset form
    resetForm();
    
    // Close modal
    onClose();
  };
  
  const resetForm = () => {
    setGoalName('');
    setGoalAmount('');
    setSelectedCategory(null);
    setEnableRollover(false);
    setEnableNotifications(true);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Goal</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
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
                    selectedCategory === category.id ? styles.selectedCategory : {}
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Image source={category.icon} style={styles.categoryIcon} />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id ? styles.selectedCategoryText : {}
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Goal Name Input */}
            <Text style={styles.inputLabel}>Goal Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter goal name"
                value={goalName}
                onChangeText={setGoalName}
              />
            </View>
            
            {/* Goal Amount Input */}
            <Text style={styles.inputLabel}>Goal Amount</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={goalAmount}
                onChangeText={setGoalAmount}
              />
            </View>
            
            {/* Toggle Options */}
            <View style={styles.toggleContainer}>
              <View style={styles.toggleItem}>
                <Text style={styles.toggleLabel}>Enable Monthly Rollover</Text>
                <Switch
                  value={enableRollover}
                  onValueChange={setEnableRollover}
                  trackColor={{ false: '#E1E5EB', true: '#2D6BFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.toggleItem}>
                <Text style={styles.toggleLabel}>Enable Notifications</Text>
                <Switch
                  value={enableNotifications}
                  onValueChange={setEnableNotifications}
                  trackColor={{ false: '#E1E5EB', true: '#2D6BFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.addButton,
                (!goalName || !goalAmount || !selectedCategory) ? styles.addButtonDisabled : {}
              ]}
              onPress={handleAdd}
              disabled={!goalName || !goalAmount || !selectedCategory}
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
    minHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 16,
    maxHeight: '80%',
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
    marginBottom: 20,
  },
  categoryButton: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    margin: '1.5%',
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
  },
  selectedCategory: {
    backgroundColor: '#E6EFFF',
    borderWidth: 1,
    borderColor: '#2D6BFF',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  selectedCategoryText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 8,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7F9FC',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1A2138',
  },
  toggleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toggleLabel: {
    fontSize: 14,
    color: '#1A2138',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E9AAF',
  },
  addButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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

export default AddGoalModal;