import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AddCategoryBudgetModal from './addcategorybudget';
const { width } = Dimensions.get('window');

// Sample data for budget categories
const budgetCategories = [
  { 
    id: '1', 
    name: 'Food & Groceries', 
    icon: require('../../assets/images/grocery-logo.png'),
    allocated: 500,
    spent: 350,
    color: '#36D1B7',
  },
  { 
    id: '2', 
    name: 'Transportation', 
    icon: require('../../assets/images/transport-logo.png'),
    allocated: 200,
    spent: 180,
    color: '#2D6BFF',
  },
  { 
    id: '3', 
    name: 'Shopping', 
    icon: require('../../assets/images/shopping-logo.png'),
    allocated: 300,
    spent: 320,
    color: '#FF9F43',
  },
  { 
    id: '4', 
    name: 'Entertainment', 
    icon: require('../../assets/images/entertainment-logo.png'),
    allocated: 200,
    spent: 150,
    color: '#8C54FF',
  },
  { 
    id: '5', 
    name: 'Dining Out', 
    icon: require('../../assets/images/restaurant-logo.png'),
    allocated: 250,
    spent: 200,
    color: '#FF6B6B',
  },
];

// Sample data for spending trend
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1800, 1900, 1700, 2100, 1800, 1650],
      color: (opacity = 1) => `rgba(45, 107, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(45, 107, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(142, 154, 175, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#2D6BFF',
  },
};

export default function BudgetScreen() {
  const navigator= useNavigation();
  const [selectedMonth, setSelectedMonth] = useState('August');
  
  // Calculate total budget and spent
  const totalBudget = budgetCategories.reduce((sum, category) => sum + category.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);

  const handleAddCategory = (categoryData) => {
    console.log('New category budget:', categoryData);
  };
  const getProgressColor = (spent, allocated) => {
    const ratio = spent / allocated;
    if (ratio > 1) return '#FF6B6B'; // Over budget - red
    if (ratio > 0.8) return '#FF9F43'; // Close to budget - yellow
    return '#36D1B7'; // Under budget - green
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="options-outline" size={24} color="#1A2138" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#2D6BFF" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{selectedMonth} 2025</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#2D6BFF" />
          </TouchableOpacity>
        </View>
        
        {/* Budget Overview Card */}
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Monthly Budget</Text>
          
          <View style={styles.budgetCircleContainer}>
            <View style={styles.budgetCircle}>
              <Text style={styles.percentText}>{Math.round(percentSpent)}%</Text>
              <Text style={styles.percentLabel}>spent</Text>
            </View>
          </View>
          
          <View style={styles.budgetDetails}>
            <View style={styles.budgetDetailItem}>
              <Text style={styles.detailLabel}>Total Budget</Text>
              <Text style={styles.detailValue}>${totalBudget}</Text>
            </View>
            <View style={styles.budgetDetailItem}>
              <Text style={styles.detailLabel}>Spent</Text>
              <Text style={styles.detailValue}>${totalSpent}</Text>
            </View>
            <View style={styles.budgetDetailItem}>
              <Text style={styles.detailLabel}>Remaining</Text>
              <Text style={[styles.detailValue, styles.remainingValue]}>${remaining}</Text>
            </View>
          </View>
        </View>
        
        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.insightsTitle}>Budget Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            You're on track with most categories, but your Shopping expenses are 7% over budget. Consider adjusting your Shopping budget or reducing expenses in this category.
          </Text>
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>View Recommendations</Text>
          </TouchableOpacity>
        </View>
        <AddCategoryBudgetModal
          visible={addCategoryModalVisible}
          onClose={() => setAddCategoryModalVisible(false)}
          onAdd={handleAddCategory}
        />
        {/* Category Breakdown */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setAddCategoryModalVisible(true)}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Category</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesCard}>
          {budgetCategories.map((category) => {
            const percentSpent = (category.spent / category.allocated) * 100;
            const progressColor = getProgressColor(category.spent, category.allocated);
            
            return (
              <View key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryLeft}>
                    <Image source={category.icon} style={styles.categoryIcon} />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="#8E9AAF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.categoryProgressContainer}>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { width: `${Math.min(percentSpent, 100)}%`, backgroundColor: progressColor }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{Math.round(percentSpent)}%</Text>
                </View>
                
                <View style={styles.categoryAmounts}>
                  <Text style={styles.spentAmount}>${category.spent} spent</Text>
                  <Text style={styles.allocatedAmount}>of ${category.allocated}</Text>
                </View>
              </View>
            );
          })}
        </View>
        
        {/* Spending Trend */}
        <View style={styles.trendCard}>
          <Text style={styles.cardTitle}>Spending Trend</Text>
          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Dashboard')}>
                <Ionicons name="home-outline" size={24} color="#8E9AAF" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                <Ionicons name="pie-chart-outline" size={24} color="#2D6BFF" onPress={()=>navigator.navigate('Budget')} />
                <Text style={[styles.navText, styles.activeNavText]}>Budget</Text>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Space for bottom nav
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginHorizontal: 16,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 16,
  },
  budgetCircleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#36D1B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2138',
  },
  percentLabel: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  budgetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetDetailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E9AAF',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  remainingValue: {
    color: '#36D1B7',
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D6BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  categoriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
  },
  categoryProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E9AAF',
    width: 36,
    textAlign: 'right',
  },
  categoryAmounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spentAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A2138',
    marginRight: 4,
  },
  allocatedAmount: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
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