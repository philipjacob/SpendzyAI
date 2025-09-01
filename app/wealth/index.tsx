import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Sample data
const netWorthData = {
  assets: 325000,
  liabilities: 125000,
  netWorth: 200000,
  change: 15000,
  changePercent: 8.1,
};

const wealthDistribution = [
  {
    name: 'Cash',
    value: 50000,
    color: '#2D6BFF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Investments',
    value: 150000,
    color: '#36D1B7',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Real Estate',
    value: 100000,
    color: '#FF9F43',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Other Assets',
    value: 25000,
    color: '#8C54FF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

const assetCategories = [
  {
    id: '1',
    name: 'Cash & Equivalents',
    value: 50000,
    items: [
      { name: 'Checking Account', value: 15000 },
      { name: 'Savings Account', value: 25000 },
      { name: 'Emergency Fund', value: 10000 },
    ],
  },
  {
    id: '2',
    name: 'Investments',
    value: 150000,
    items: [
      { name: 'Stocks & ETFs', value: 75000 },
      { name: 'Retirement Accounts', value: 60000 },
      { name: 'Cryptocurrency', value: 15000 },
    ],
  },
  {
    id: '3',
    name: 'Real Estate',
    value: 100000,
    items: [
      { name: 'Primary Residence', value: 100000 },
    ],
  },
  {
    id: '4',
    name: 'Other Assets',
    value: 25000,
    items: [
      { name: 'Vehicle', value: 20000 },
      { name: 'Collectibles', value: 5000 },
    ],
  },
];

const liabilityCategories = [
  {
    id: '1',
    name: 'Mortgage',
    value: 90000,
    items: [
      { name: 'Primary Residence', value: 90000 },
    ],
  },
  {
    id: '2',
    name: 'Loans',
    value: 30000,
    items: [
      { name: 'Auto Loan', value: 15000 },
      { name: 'Student Loans', value: 15000 },
    ],
  },
  {
    id: '3',
    name: 'Credit Cards',
    value: 5000,
    items: [
      { name: 'Credit Card 1', value: 3000 },
      { name: 'Credit Card 2', value: 2000 },
    ],
  },
];

const wealthGoals = [
  {
    id: '1',
    name: 'Retirement Fund',
    target: 500000,
    current: 60000,
    progress: 12,
  },
  {
    id: '2',
    name: 'Home Down Payment',
    target: 50000,
    current: 25000,
    progress: 50,
  },
  {
    id: '3',
    name: 'Emergency Fund',
    target: 15000,
    current: 10000,
    progress: 67,
  },
];

const timePeriods = ['1M', '3M', '6M', '1Y', 'All'];

export default function WealthManagementScreen() {
  const navigation = useNavigation();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('1M');
  const [expandedAssetCategory, setExpandedAssetCategory] = useState(null);
  const [expandedLiabilityCategory, setExpandedLiabilityCategory] = useState(null);
  
  const toggleAssetCategory = (id) => {
    if (expandedAssetCategory === id) {
      setExpandedAssetCategory(null);
    } else {
      setExpandedAssetCategory(id);
    }
  };
  
  const toggleLiabilityCategory = (id) => {
    if (expandedLiabilityCategory === id) {
      setExpandedLiabilityCategory(null);
    } else {
      setExpandedLiabilityCategory(id);
    }
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A2138" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wealth Management</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Net Worth Summary Card */}
        <View style={styles.netWorthCard}>
          <Text style={styles.netWorthTitle}>Net Worth</Text>
          <Text style={styles.netWorthAmount}>${netWorthData.netWorth.toLocaleString()}</Text>
          <View style={styles.netWorthChange}>
            <Ionicons 
              name={netWorthData.change >= 0 ? "arrow-up" : "arrow-down"} 
              size={16} 
              color={netWorthData.change >= 0 ? "#36D1B7" : "#FF4D4F"} 
            />
            <Text style={[
              styles.netWorthChangeText,
              { color: netWorthData.change >= 0 ? "#36D1B7" : "#FF4D4F" }
            ]}>
              ${Math.abs(netWorthData.change).toLocaleString()} ({netWorthData.changePercent}%)
            </Text>
          </View>
          
          <View style={styles.netWorthBreakdown}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Assets</Text>
              <Text style={styles.breakdownValue}>${netWorthData.assets.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Liabilities</Text>
              <Text style={styles.breakdownValue}>${netWorthData.liabilities.toLocaleString()}</Text>
            </View>
          </View>
        </View>
        
        {/* Time Period Selector */}
        <View style={styles.timePeriodContainer}>
          {timePeriods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timePeriodButton,
                selectedTimePeriod === period ? styles.timePeriodButtonActive : {}
              ]}
              onPress={() => setSelectedTimePeriod(period)}
            >
              <Text style={[
                styles.timePeriodText,
                selectedTimePeriod === period ? styles.timePeriodTextActive : {}
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Wealth Distribution */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Wealth Distribution</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={wealthDistribution}
              width={width - 64}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
        
        {/* Financial Health Score */}
        <View style={styles.healthScoreCard}>
          <View style={styles.healthScoreHeader}>
            <Text style={styles.healthScoreTitle}>Financial Health Score</Text>
            <View style={styles.healthScoreBadge}>
              <Text style={styles.healthScoreValue}>82</Text>
            </View>
          </View>
          <View style={styles.healthScoreBar}>
            <View style={[styles.healthScoreProgress, { width: '82%' }]} />
          </View>
          <View style={styles.healthScoreLabels}>
            <Text style={styles.healthScoreLabel}>Poor</Text>
            <Text style={styles.healthScoreLabel}>Good</Text>
            <Text style={styles.healthScoreLabel}>Excellent</Text>
          </View>
          <View style={styles.aiAssessmentContainer}>
            <View style={styles.aiIconContainer}>
              <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.aiAssessmentText}>
              Your financial health is good! Consider increasing your emergency fund to reach the recommended 6 months of expenses.
            </Text>
          </View>
        </View>
        
        {/* Assets Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Assets</Text>
          {assetCategories.map((category) => (
            <View key={category.id} style={styles.categoryContainer}>
              <TouchableOpacity 
                style={styles.categoryHeader}
                onPress={() => toggleAssetCategory(category.id)}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryValue}>${category.value.toLocaleString()}</Text>
                  <Ionicons 
                    name={expandedAssetCategory === category.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#8E9AAF" 
                  />
                </View>
              </TouchableOpacity>
              
              {expandedAssetCategory === category.id && (
                <View style={styles.categoryItems}>
                  {category.items.map((item, index) => (
                    <View key={index} style={styles.categoryItem}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemValue}>${item.value.toLocaleString()}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Liabilities Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Liabilities</Text>
          {liabilityCategories.map((category) => (
            <View key={category.id} style={styles.categoryContainer}>
              <TouchableOpacity 
                style={styles.categoryHeader}
                onPress={() => toggleLiabilityCategory(category.id)}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryValue}>${category.value.toLocaleString()}</Text>
                  <Ionicons 
                    name={expandedLiabilityCategory === category.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#8E9AAF" 
                  />
                </View>
              </TouchableOpacity>
              
              {expandedLiabilityCategory === category.id && (
                <View style={styles.categoryItems}>
                  {category.items.map((item, index) => (
                    <View key={index} style={styles.categoryItem}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemValue}>${item.value.toLocaleString()}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Wealth Goals */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Wealth Goals</Text>
          {wealthGoals.map((goal) => (
            <View key={goal.id} style={styles.goalContainer}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalProgress}>{goal.progress}%</Text>
              </View>
              <View style={styles.goalBarContainer}>
                <View style={[styles.goalProgressBar, { width: `${goal.progress}%` }]} />
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalCurrent}>${goal.current.toLocaleString()}</Text>
                <Text style={styles.goalTarget}>Target: ${goal.target.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* AI Recommendations */}
        <View style={styles.recommendationsCard}>
          <View style={styles.recommendationsHeader}>
            <View style={styles.aiLargeIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="trending-up" size={20} color="#36D1B7" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>
              Consider reallocating 10% of your cash to index funds for better long-term growth.
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="shield-checkmark" size={20} color="#2D6BFF" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>
              Increase your emergency fund by $5,000 to reach the recommended 6-month coverage.
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="card" size={20} color="#FF9F43" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>
              Consolidate your credit card debt to reduce interest payments by approximately $450 annually.
            </Text>
          </View>
        </View>
        
        {/* Financial Planning Button */}
        <TouchableOpacity style={styles.planningButton}>
          <Text style={styles.planningButtonText}>Create Financial Plan</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.planningButtonIcon} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={24} color="#8E9AAF" />
            <Text style={styles.navText}>Home</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  netWorthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  netWorthTitle: {
    fontSize: 16,
    color: '#8E9AAF',
    marginBottom: 8,
  },
  netWorthAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 8,
  },
  netWorthChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  netWorthChangeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  netWorthBreakdown: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
  },
  breakdownDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  timePeriodContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timePeriodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  timePeriodButtonActive: {
    backgroundColor: '#F0F5FF',
  },
  timePeriodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E9AAF',
  },
  timePeriodTextActive: {
    color: '#2D6BFF',
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  healthScoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  healthScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  healthScoreBadge: {
    backgroundColor: '#36D1B7',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  healthScoreValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  healthScoreBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  healthScoreProgress: {
    height: '100%',
    backgroundColor: '#36D1B7',
    borderRadius: 4,
  },
  healthScoreLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  healthScoreLabel: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  aiAssessmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 12,
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
  aiAssessmentText: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
    lineHeight: 20,
  },
  categoryContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 8,
  },
  categoryItems: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 24,
    backgroundColor: '#F7F9FC',
  },
  itemName: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A2138',
  },
  goalContainer: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A2138',
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6BFF',
  },
  goalBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: '#2D6BFF',
    borderRadius: 4,
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalCurrent: {
    fontSize: 12,
    color: '#1A2138',
  },
  goalTarget: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiLargeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recommendationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138',
    lineHeight: 20,
  },
  planningButton: {
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
  planningButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  planningButtonIcon: {
    marginLeft: 4,
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