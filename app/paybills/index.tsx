import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Sample data for upcoming bills
const upcomingBills = [
  { 
    id: '1', 
    name: 'Electricity Bill', 
    company: 'Power Co.', 
    logo: require('../../assets/images/power-logo.png'),
    amount: '$89.50', 
    dueDate: 'Aug 31, 2025',
    status: 'due',
    category: 'utilities',
    autopay: false,
  },
  { 
    id: '2', 
    name: 'Netflix Subscription', 
    company: 'Netflix', 
    logo: require('../../assets/images/netflix-logo.png'),
    amount: '$14.99', 
    dueDate: 'Sep 2, 2025',
    status: 'due',
    category: 'subscriptions',
    autopay: true,
  },
  { 
    id: '3', 
    name: 'Internet Service', 
    company: 'Fiber Net', 
    logo: require('../../assets/images/internet-logo.png'),
    amount: '$59.99', 
    dueDate: 'Sep 5, 2025',
    status: 'due',
    category: 'utilities',
    autopay: false,
  },
  { 
    id: '4', 
    name: 'Rent Payment', 
    company: 'Apartment LLC', 
    logo: require('../../assets/images/rent-logo.png'),
    amount: '$1,450.00', 
    dueDate: 'Sep 1, 2025',
    status: 'due',
    category: 'housing',
    autopay: false,
  },
];

// Sample data for recent payments
const recentPayments = [
  { 
    id: '1', 
    name: 'Water Bill', 
    company: 'City Water', 
    logo: require('../../assets/images/water-logo.png'),
    amount: '$45.75', 
    date: 'Aug 25, 2025',
    status: 'completed',
  },
  { 
    id: '2', 
    name: 'Phone Bill', 
    company: 'Mobile Inc.', 
    logo: require('../../assets/images/phone-logo.png'),
    amount: '$65.00', 
    date: 'Aug 20, 2025',
    status: 'completed',
  },
];

// Bill categories
const categories = [
  { id: 'all', name: 'All' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'subscriptions', name: 'Subscriptions' },
  { id: 'housing', name: 'Housing' },
  { id: 'insurance', name: 'Insurance' },
];

export default function PayBillsScreen() {
  const navigator= useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter bills based on active category and search query
  const filteredBills = upcomingBills.filter(bill => {
    const matchesCategory = activeCategory === 'all' || bill.category === activeCategory;
    const matchesSearch = bill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         bill.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handlePayBill = (bill) => {
    // In a real app, you would navigate to a payment screen or show a payment modal
    alert(`Processing payment for ${bill.name}: ${bill.amount}`);
  };
  
  const handleAddBill = () => {
    // In a real app, you would navigate to an add bill screen
    alert('Navigate to Add New Bill screen');
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
          <Text style={styles.headerTitle}>Pay Bills</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#1A2138" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8E9AAF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search bills..."
            placeholderTextColor="#8E9AAF"
          />
        </View>
        
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id ? styles.activeCategoryButton : {}
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category.id ? styles.activeCategoryText : {}
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.insightsTitle}>Bill Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            Bundle your Netflix and Spotify subscriptions to save $3.99/month with our partner discount.
          </Text>
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        
        {/* Upcoming Bills */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {filteredBills.length > 0 ? (
          <View style={styles.billsContainer}>
            {filteredBills.map((bill) => (
              <View key={bill.id} style={styles.billItem}>
                <View style={styles.billLeft}>
                  <Image source={bill.logo} style={styles.billLogo} />
                  <View style={styles.billInfo}>
                    <Text style={styles.billName}>{bill.name}</Text>
                    <Text style={styles.billCompany}>{bill.company}</Text>
                  </View>
                </View>
                <View style={styles.billRight}>
                  <View style={styles.billAmountContainer}>
                    <Text style={styles.billAmount}>{bill.amount}</Text>
                    <View style={styles.billDueContainer}>
                      <Text style={styles.billDueText}>Due {bill.dueDate}</Text>
                      {bill.autopay && (
                        <View style={styles.autopayBadge}>
                          <Text style={styles.autopayText}>Auto-pay</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => handlePayBill(bill)}
                  >
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No bills found</Text>
          </View>
        )}
        
        {/* Recent Payments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentPaymentsContainer}>
          {recentPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentLeft}>
                <Image source={payment.logo} style={styles.paymentLogo} />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{payment.name}</Text>
                  <Text style={styles.paymentDate}>{payment.date}</Text>
                </View>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentAmount}>{payment.amount}</Text>
                <View style={styles.paymentStatus}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Paid</Text>
                </View>
              </View>
            </View>
          ))}
        {/* Add New Bill Button */}
        <TouchableOpacity 
          style={styles.addBillButton}
          onPress={handleAddBill}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addBillText}>Add New Bill</Text>
        </TouchableOpacity>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A2138',
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#2D6BFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E9AAF',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  insightsText: {
    fontSize: 14,
    color: '#8E9AAF',
    lineHeight: 20,
    marginBottom: 16,
  },
  insightsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
  },
  insightsButtonText: {
    fontSize: 12,
    color: '#2D6BFF',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  sectionLink: {
    fontSize: 14,
    color: '#2D6BFF',
  },
  billsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  billInfo: {
    justifyContent: 'center',
  },
  billName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  billCompany: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmountContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  billAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  billDueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billDueText: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  autopayBadge: {
    backgroundColor: '#F0F5FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  autopayText: {
    fontSize: 10,
    color: '#2D6BFF',
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#2D6BFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  payButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyStateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  recentPaymentsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  paymentInfo: {
    justifyContent: 'center',
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  paymentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#36D1B7',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#36D1B7',
  },
  addBillButton: {
    backgroundColor: '#2D6BFF',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D6BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addBillText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
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