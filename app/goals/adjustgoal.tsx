import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const AdjustGoalModal = ({ visible, onClose, goalData, onSave }) => {
  const [amount, setAmount] = useState('');
  const [savedamount, setSavedAmount] = useState('');
  const [modalAnimation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (visible) {
      setAmount(goalData?.target ? goalData.target.toString() : '');
      setSavedAmount(goalData?.saved ? goalData.saved.toString() : '');
      
      Animated.spring(modalAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, goalData]);
  
  const handleAmountChange = (text) => {
    // Remove non-numeric characters except decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    
    setAmount(numericValue);
  };
  const handleSavedChange = (text) => {
    // Remove non-numeric characters except decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    
    setSavedAmount(numericValue);
  };
  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    onSave({
      ...goalData,
      target: parseFloat(amount),
      saved: parseFloat(savedamount)
    });
    
    onClose();
  };
  
  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  
  const backdropOpacity = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>
      
      <Animated.View 
        style={[
          styles.modalContainer,
          { transform: [{ translateY: modalTranslateY }] }
        ]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adjust Goal Amount</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#8E9AAF" />
              </TouchableOpacity>
            </View>
            
            {/* Goal Info */}
            <View style={styles.goalInfo}>
              <View style={styles.goalIconContainer}>
                <Ionicons name={goalData?.icon || 'trophy'} size={24} color="#2D6BFF" />
              </View>
              <Text style={styles.goalName}>{goalData?.name || 'Goal'}</Text>
            </View>
            
            {/* Current Amount */}
            <View style={styles.currentAmountContainer}>
              <Text style={styles.currentAmountLabel}>Current Target</Text>
              <Text style={styles.currentAmount}>
                ${goalData?.target ? goalData.target.toLocaleString() : '0'}
              </Text>
            </View>
            
            {/* New Amount Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Target Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="#8E9AAF"
                  autoFocus
                />
              </View>
            </View>
            {/* New Saved Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Saved Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={savedamount}
                  onChangeText={handleSavedChange}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="#8E9AAF"
                />
              </View>
            </View>
            {/* Saved Amount Note */}
            <View style={styles.savedAmountContainer}>
              <Ionicons name="information-circle-outline" size={20} color="#8E9AAF" />
              <Text style={styles.savedAmountText}>
                Your saved amount of ${goalData?.saved ? goalData.saved.toLocaleString() : '0'}
              </Text>
            </View>
            
            {/* AI Suggestion */}
            <View style={styles.aiSuggestionContainer}>
              <View style={styles.aiIconContainer}>
                <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.aiSuggestionText}>
                Based on your income and expenses, we recommend a target of ${goalData?.recommended || '5,000'}.
              </Text>
            </View>
            
            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.saveButton,
                  (!amount || parseFloat(amount) <= 0) ? styles.saveButtonDisabled : {}
                ]}
                onPress={handleSave}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2138',
  },
  closeButton: {
    padding: 5,
  },
  goalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  currentAmountContainer: {
    marginBottom: 20,
  },
  currentAmountLabel: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 4,
  },
  currentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
  },
  inputContainer: {
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7F9FC',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: 56,
    fontSize: 18,
    color: '#1A2138',
  },
  savedAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  savedAmountText: {
    fontSize: 14,
    color: '#8E9AAF',
    marginLeft: 8,
    flex: 1,
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
    color: '#2D6BFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E9AAF',
  },
  saveButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#2D6BFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D6BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#A0B0D9',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AdjustGoalModal;