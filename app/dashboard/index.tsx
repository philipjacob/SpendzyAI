import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigator= useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/SpendzyLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Spendzy AI</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../../assets/images/profile-avatar.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Account Balance Card */}
        <LinearGradient
          colors={['#2D6BFF', '#36D1B7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>$12,846.15</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceChange}>
              <Ionicons name="arrow-up" size={16} color="#36D1B7" />
              <Text style={styles.balanceChangeText}>+$1,240 this month</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All Accounts</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={()=>navigator.navigate('SendMoney')}>
            <View style={[styles.actionIcon, { backgroundColor: '#E6EFFF' }]}>
              <Ionicons name="arrow-up" size={20} color="#2D6BFF" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E6FFF9' }]}>
              <Ionicons name="arrow-down" size={20} color="#36D1B7" />
            </View>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF2E6' }]}>
              <Ionicons name="card-outline" size={20} color="#FF9F43" />
            </View>
            <Text style={styles.actionText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#F0E6FF' }]}>
              <Ionicons name="add" size={20} color="#8C54FF" />
            </View>
            <Text style={styles.actionText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* AI Insights Card */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.insightsTitle}>AI Financial Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            You've spent 15% less on dining this month compared to last month. Great job sticking to your budget!
          </Text>
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>View All Insights</Text>
          </TouchableOpacity>
        </View>

        {/* Budget Progress */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Progress</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.budgetScroll}>
          <View style={styles.budgetCard}>
            <View style={styles.budgetIconContainer}>
              <Ionicons name="fast-food-outline" size={24} color="#FF9F43" />
            </View>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetCategory}>Food & Drinks</Text>
              <Text style={styles.budgetAmount}>$450/$600</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '75%', backgroundColor: '#FF9F43' }]} />
              </View>
            </View>
          </View>

          <View style={styles.budgetCard}>
            <View style={[styles.budgetIconContainer, { backgroundColor: '#E6FFF9' }]}>
              <Ionicons name="car-outline" size={24} color="#36D1B7" />
            </View>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetCategory}>Transportation</Text>
              <Text style={styles.budgetAmount}>$120/$200</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '60%', backgroundColor: '#36D1B7' }]} />
              </View>
            </View>
          </View>

          <View style={styles.budgetCard}>
            <View style={[styles.budgetIconContainer, { backgroundColor: '#E6EFFF' }]}>
              <Ionicons name="home-outline" size={24} color="#2D6BFF" />
            </View>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetCategory}>Housing</Text>
              <Text style={styles.budgetAmount}>$950/$1000</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '95%', backgroundColor: '#2D6BFF' }]} />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          <View style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: '#E6EFFF' }]}>
              <Ionicons name="cart-outline" size={20} color="#2D6BFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>Grocery Store</Text>
              <Text style={styles.transactionDate}>Today, 10:30 AM</Text>
            </View>
            <Text style={styles.transactionAmount}>-$56.32</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: '#E6FFF9' }]}>
              <Ionicons name="cafe-outline" size={20} color="#36D1B7" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>Coffee Shop</Text>
              <Text style={styles.transactionDate}>Today, 8:45 AM</Text>
            </View>
            <Text style={styles.transactionAmount}>-$4.50</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: '#F0E6FF' }]}>
              <Ionicons name="wallet-outline" size={20} color="#8C54FF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>Salary Deposit</Text>
              <Text style={styles.transactionDate}>Yesterday, 9:00 AM</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.incomeAmount]}>+$2,450.00</Text>
          </View>
        </View>

        {/* Spending Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spending Overview</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>This Month</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spendingCard}>
          <View style={styles.spendingChart}>
            {/* This would be replaced with an actual chart component */}
            <View style={styles.chartPlaceholder}>
              <View style={[styles.chartSegment, { backgroundColor: '#2D6BFF', transform: [{ rotate: '0deg' }], width: 70, height: 70 }]} />
              <View style={[styles.chartSegment, { backgroundColor: '#36D1B7', transform: [{ rotate: '100deg' }], width: 70, height: 70 }]} />
              <View style={[styles.chartSegment, { backgroundColor: '#FF9F43', transform: [{ rotate: '170deg' }], width: 70, height: 70 }]} />
              <View style={[styles.chartSegment, { backgroundColor: '#8C54FF', transform: [{ rotate: '260deg' }], width: 70, height: 70 }]} />
            </View>
          </View>
          <View style={styles.spendingCategories}>
            <View style={styles.categoryItem}>
              <View style={styles.categoryDot} />
              <Text style={styles.categoryName}>Food & Drinks</Text>
              <Text style={styles.categoryAmount}>$450</Text>
              <Text style={styles.categoryPercentage}>30%</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: '#36D1B7' }]} />
              <Text style={styles.categoryName}>Transportation</Text>
              <Text style={styles.categoryAmount}>$120</Text>
              <Text style={styles.categoryPercentage}>8%</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: '#FF9F43' }]} />
              <Text style={styles.categoryName}>Housing</Text>
              <Text style={styles.categoryAmount}>$950</Text>
              <Text style={styles.categoryPercentage}>63%</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: '#8C54FF' }]} />
              <Text style={styles.categoryName}>Entertainment</Text>
              <Text style={styles.categoryAmount}>$180</Text>
              <Text style={styles.categoryPercentage}>12%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
  scrollContent: {
    paddingBottom: 80, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D6BFF',
    marginLeft: 8,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  balanceCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceChangeText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  seeAllButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  seeAllText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#1A2138',
  },
  insightsCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    paddingHorizontal: 20,
    marginBottom: 12,
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
  budgetScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  budgetCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  budgetIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF2E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  budgetInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  budgetCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  budgetAmount: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  transactionList: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
  },
  incomeAmount: {
    color: '#36D1B7',
  },
  spendingCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  spendingChart: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chartPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  chartSegment: {
    position: 'absolute',
    borderRadius: 35,
  },
  spendingCategories: {
    marginTop: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2D6BFF',
    marginRight: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 12,
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#8E9AAF',
    width: 40,
    textAlign: 'right',
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
  activeNavText: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
});