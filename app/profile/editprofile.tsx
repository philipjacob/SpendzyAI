import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const EditProfileModal = ({ visible, onClose, userData, onSave }) => {
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');
  const [currency, setCurrency] = useState(userData?.currency || 'USD');
  const [profileImage, setProfileImage] = useState(userData?.profileImage || null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  
  const currencies = [
    { code: 'USD', name: 'USD - United States Dollar' },
    { code: 'EUR', name: 'EUR - Euro' },
    { code: 'GBP', name: 'GBP - British Pound' },
    { code: 'CAD', name: 'CAD - Canadian Dollar' },
    { code: 'AUD', name: 'AUD - Australian Dollar' },
    { code: 'JPY', name: 'JPY - Japanese Yen' },
    { code: 'CNY', name: 'CNY - Chinese Yuan' },
    { code: 'INR', name: 'INR - Indian Rupee' },
  ];
  
  const handleSave = () => {
    onSave({
      fullName,
      phoneNumber,
      currency,
      profileImage,
    });
    onClose();
  };
  
  const pickImage = async () => {
    // Request permissions
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to change your profile picture!');
        return;
      }
    }
    
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  const handleCurrencySelect = (currencyCode) => {
    setCurrency(currencyCode);
    setShowCurrencyDropdown(false);
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            {/* Profile Picture */}
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageWrapper}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <View style={styles.profilePlaceholder}>
                    <Text style={styles.profilePlaceholderText}>
                      {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                    </Text>
                  </View>
                )}
                <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={styles.formContainer}>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#8E9AAF"
                />
              </View>
              
              {/* Email Input (Disabled) */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={[styles.textInput, styles.disabledInput]}
                  value={userData?.email || 'user@example.com'}
                  editable={false}
                />
              </View>
              
              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#8E9AAF"
                  keyboardType="phone-pad"
                />
              </View>
              
              {/* Currency Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Currency Preference</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <Text style={styles.dropdownButtonText}>
                    {currencies.find(c => c.code === currency)?.name || 'Select currency'}
                  </Text>
                  <Ionicons
                    name={showCurrencyDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#8E9AAF"
                  />
                </TouchableOpacity>
                
                {showCurrencyDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled={true}>
                      {currencies.map((item) => (
                        <TouchableOpacity
                          key={item.code}
                          style={[
                            styles.dropdownItem,
                            currency === item.code ? styles.selectedDropdownItem : {}
                          ]}
                          onPress={() => handleCurrencySelect(item.code)}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              currency === item.code ? styles.selectedDropdownItemText : {}
                            ]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </ScrollView>
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    minHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2138',
    textAlign: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePlaceholderText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D6BFF',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  formContainer: {
    minHeight: 300,
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
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A2138',
    backgroundColor: '#F7F9FC',
  },
  disabledInput: {
    backgroundColor: '#F0F0F0',
    color: '#8E9AAF',
  },
  dropdownButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1A2138',
  },
  dropdownMenu: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedDropdownItem: {
    backgroundColor: '#F0F5FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1A2138',
  },
  selectedDropdownItemText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
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
    height: 48,
    backgroundColor: '#2D6BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EditProfileModal;