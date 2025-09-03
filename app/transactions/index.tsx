import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Sample data for transactions
const transactions = [
  {
    id: '1',
    date: 'Tuesday, Oct 26',
    items: [
      {
        id: '1',
        merchant: 'Starbucks',
        logo: require('../../assets/images/restaurant-logo.png'),
        category: 'Food',
        categoryIcon: require('../../assets/images/restaurant-logo.png'),
        amount: '-$5.75',
        details: 'Visa • Coffee run',
        isExpense: true,
      },
      {
        id: '2',
        merchant: 'Amazon',
        logo: require('../../assets/images/shopping-logo.png'),
        category: 'Shopping',
        categoryIcon: require('../../assets/images/shopping-logo.png'),
        amount: '-$45.00',
        details: 'Mastercard • New headphones',
        isExpense: true,
      },
    ],
  },
  {
    id:'2',
    date: 'Monday, Oct 25',
    items: [
      {
        id: '3',
        merchant: 'Salary Deposit',
        logo: require('../../assets/images/income-logo.png'),
        category: 'Income',
        categoryIcon: require('../../assets/images/income-logo.png'),
        amount: '+$2,500.00',
        details: 'Bank Transfer • Monthly Salary',
        isExpense: false,
      },
      {
        id: '4',
        merchant: 'Uber',
        logo: require('../../assets/images/transport-logo.png'),
        category: 'Transport',
        categoryIcon: require('../../assets/images/transport-logo.png'),
        amount: '-$12.50',
        details: 'Apple Pay • Ride home',
        isExpense: true,
      },
      {
        id: '5',
        merchant: 'Whole Foods',
        logo: require('../../assets/images/grocery-logo.png'),
        category: 'Food',
        categoryIcon: require('../../assets/images/grocery-logo.png'),
        amount: '-$85.20',
        details: 'Debit Card • Groceries',
        isExpense: true,
      },
    ],
  },
];

// Categories for filter
const categories = [
  { id: 'all', name: 'All' },
  { id: 'food', name: 'Food', icon: require('../../assets/images/restaurant-logo.png') },
  { id: 'shopping', name: 'Shopping', icon: require('../../assets/images/shopping-logo.png') },
  { id: 'transport', name: 'Transport', icon: require('../../assets/images/transport-logo.png') },
  { id: 'entertainment', name: 'Entertainment', icon: require('../../assets/images/entertainment-logo.png') },
  { id: 'income', name: 'Income', icon: require('../../assets/images/income-logo.png') },
];

// Date filters
const dateFilters = [
  { id: 'All', name: 'All' },
  { id: 'today', name: 'Today' },
  { id: 'week', name: 'Week' },
  { id: 'month', name: 'Month' },
  { id: 'custom', name: 'Custom' },
];

export default function TransactionsScreen(){
  const navigator = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('month');
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // In a real app, you would filter transactions based on the selected category
  };
  
  const handleDateFilterSelect = (filterId) => {
    setSelectedDateFilter(filterId);
    // In a real app, you would filter transactions based on the selected date range
  };
  
  const renderTransactionGroup = ({ item }) => (
    <View style={styles.transactionGroup}>
      <Text style={styles.dateHeader}>{item.date}</Text>
      {item.items.map((transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Image source={transaction.logo} style={styles.merchantLogo} />
            <View style={styles.transactionInfo}>
              <Text style={styles.merchantName}>{transaction.merchant}</Text>
              <View style={styles.categoryContainer}>
                <Image source={transaction.categoryIcon} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{transaction.category}</Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionRight}>
            <Text
              style={[
                styles.transactionAmount,
                transaction.isExpense ? styles.expenseAmount : styles.incomeAmount
              ]}
            >
              {transaction.amount}
            </Text>
            <Text style={styles.transactionDetails}>{transaction.details}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#1A2138" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="filter-outline" size={24} color="#1A2138" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* AI Insights */}
        <View style={styles.insightsContainer}>
          <View style={styles.insightsIconContainer}>
            <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.insightsText}>
            You spent 15% more on dining this month. Consider setting a budget!
          </Text>
        </View>
        <TouchableOpacity 
            style={styles.addButton} onPress={()=>navigator.navigate('AddTransaction')}>
            <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8E9AAF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor="#8E9AAF"
          />
        </View>
        
        {/* Date Filter */}
        <View style={styles.dateFilterContainer}>
          {dateFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.dateFilterButton,
                selectedDateFilter === filter.id ? styles.selectedDateFilter : {}
              ]}
              onPress={() => handleDateFilterSelect(filter.id)}
            >
              <Text
                style={[
                  styles.dateFilterText,
                  selectedDateFilter === filter.id ? styles.selectedDateFilterText : {}
                ]}
              >
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryFilterContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id ? styles.selectedCategory : {}
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              {category.icon && (
                <Image source={category.icon} style={styles.categoryButtonIcon} />
              )}
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id ? styles.selectedCategoryText : {}
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Transactions List */}
        <FlatList
          data={transactions}
          renderItem={renderTransactionGroup}
          keyExtractor={(item) => item.date}
          scrollEnabled={false}
        />
      </ScrollView>
      {/* Bottom Navigation */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2138',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 80, // Space for bottom nav
  },
  insightsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
  insightsIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightsText: {
    flex: 1,
    fontSize: 12,
    color: '#2D6BFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    height: 44, // Reduced height
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  dateFilterButton: {
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedDateFilter: {
    backgroundColor: '#2D6BFF',
  },
  dateFilterText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  selectedDateFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryFilterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#2D6BFF',
  },
  categoryButtonIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  transactionGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E9AAF',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  transactionInfo: {
    justifyContent: 'center',
  },
  merchantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseAmount: {
    color: '#FF4545',
  },
  incomeAmount: {
    color: '#36D1B7',
  },
  transactionDetails: {
    fontSize: 12,
    color: '#8E9AAF',
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