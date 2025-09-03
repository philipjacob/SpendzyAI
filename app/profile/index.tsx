import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditProfileModal from './editprofile';

export default function ProfileSettingsScreen () {
  // Sample user data
    const navigator = useNavigation();
    const user = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        profilePhoto: require('../../assets/images/profile-avatar.png'),
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 (555) 123-4567',
        currency: 'USD',
        profileImage: null,
    });

  const handleSaveProfile = (updatedData) => {
    setUserData({
      ...userData,
      ...updatedData,
    });
    // Here you would typically make an API call to update the user profile
    console.log('Profile updated:', updatedData);
  };
  // State for toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);
  const [aiPersonalizationEnabled, setAiPersonalizationEnabled] = useState(true);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [biometricAuthEnabled, setBiometricAuthEnabled] = useState(true);
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(false);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [marketingEmailsEnabled, setMarketingEmailsEnabled] = useState(false);
  const [appUpdatesEnabled, setAppUpdatesEnabled] = useState(true);
  const [betaFeaturesEnabled, setBetaFeaturesEnabled] = useState(false);
  
  const renderSettingItem = (icon, title, hasToggle = false, toggleValue = false, onToggleChange = null, onPress = null) => {
    return (
      <TouchableOpacity 
        style={styles.settingItem}
        onPress={onPress}
        disabled={hasToggle || !onPress}
      >
        <View style={styles.settingItemLeft}>
          <Ionicons name={icon} size={22} color="#8E9AAF" style={styles.settingIcon} />
          <Text style={styles.settingText}>{title}</Text>
        </View>
        {hasToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggleChange}
            trackColor={{ false: '#E1E5EB', true: '#36D1B7' }}
            thumbColor="#FFFFFF"
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#8E9AAF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EditProfileModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            userData={userData}
            onSave={handleSaveProfile}
        />
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={user.profilePhoto} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}  onPress={() => setModalVisible(true)} >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {renderSettingItem('lock-closed-outline', 'Security', false, false, null, () => {})}
          {renderSettingItem('notifications-outline', 'Notifications', true, notificationsEnabled, setNotificationsEnabled)}
          {renderSettingItem('color-palette-outline', 'Appearance/Theme', false, false, null, () => {})}
          {renderSettingItem('cash-outline', 'Currency', false, false, null, () => {})}
          {renderSettingItem('language-outline', 'Language', false, false, null, () => {})}
        </View>
        
        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          {renderSettingItem('sync-outline', 'Data Synchronization', true, dataSyncEnabled, setDataSyncEnabled)}
          {renderSettingItem('bulb-outline', 'AI Preferences', true, aiPersonalizationEnabled, setAiPersonalizationEnabled)}
          {renderSettingItem('shield-checkmark-outline', 'Privacy Settings', false, false, null, () => {})}
          {renderSettingItem('help-circle-outline', 'Help & Support', false, false, null, () => {})}
          {renderSettingItem('information-circle-outline', 'About the App', false, false, null, () => {})}
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={24} color="#8E9AAF"  onPress={()=>navigator.navigate('Dashboard')}/>
            <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="pie-chart-outline" size={24} color="#8E9AAF" onPress={()=>navigator.navigate('Budget')} />
            <Text style={styles.navText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Transactions')}>
            <Ionicons name="list" size={24} color="#8E9AAF" />
            <Text style={styles.navText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Investments')} >
            <Ionicons name="trending-up" size={24} color="#8E9AAF" />
            <Text style={styles.navText}>Investments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Goals')}>
            <Ionicons name="trophy" size={24} color="#8E9AAF" />
            <Text style={styles.navText}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem,, styles.activeNavItem]}  onPress={()=>navigator.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} color="#2D6BFF" />
            <Text style={[styles.navText,styles.activeNavText]}>Profile</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  scrollContent: {
    paddingBottom: 100, // Space for bottom nav
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F0F5FF',
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1A2138',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
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
  navText: {
    fontSize: 12,
    color: '#8E9AAF',
    marginTop: 4,
  },
  activeNavItem: {
    alignItems: 'center',
  },
  activeNavText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
});

