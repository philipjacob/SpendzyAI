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
  View,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Sample data for investments
const investments = [
  { 
    id: '1', 
    name: 'Apple Inc.', 
    ticker: 'AAPL', 
    logo: require('../../assets/images/apple-logo.png'),
    value: '$2,450.75', 
    shares: '15 shares',
    change: '+2.4%',
    positive: true,
  },
  { 
    id: '2', 
    name: 'Tesla', 
    ticker: 'TSLA', 
    logo: require('../../assets/images/tesla-logo.png'),
    value: '$1,840.30', 
    shares: '8 shares',
    change: '-1.2%',
    positive: false,
  },
  { 
    id: '3', 
    name: 'Vanguard S&P 500 ETF', 
    ticker: 'VOO', 
    logo: require('../../assets/images/vanguard-logo.png'),
    value: '$3,250.00', 
    shares: '10 shares',
    change: '+0.8%',
    positive: true,
  },
  { 
    id: '4', 
    name: 'Bitcoin', 
    ticker: 'BTC', 
    logo: require('../../assets/images/bitcoin-logo.png'),
    value: '$1,200.50', 
    shares: '0.025 BTC',
    change: '+5.7%',
    positive: true,
  },
];

// Sample data for asset allocation
const assetAllocation = [
  {
    name: 'Stocks',
    value: 65,
    color: '#2D6BFF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'ETFs',
    value: 20,
    color: '#36D1B7',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Crypto',
    value: 10,
    color: '#FF9F43',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Cash',
    value: 5,
    color: '#8C54FF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

// Sample data for performance chart
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [8000, 8500, 8200, 9000, 9500, 10000],
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

export default function InvestmentsScreen() {
  const navigator = useNavigation() // Placeholder for navigation prop
  const [timePeriod, setTimePeriod] = useState('1M');
  
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    // In a real app, you would fetch new data for the selected time period
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Investments Summary</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#1A2138" />
          </TouchableOpacity>
        </View>
        
        {/* Portfolio Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Investment Value</Text>
          <Text style={styles.summaryValue}>$10,741.55</Text>
          <View style={styles.summaryMetrics}>
            <View style={styles.metricItem}>
              <Ionicons name="arrow-up" size={16} color="#36D1B7" />
              <Text style={styles.metricValue}>+$842.30 (8.5%)</Text>
            </View>
            <Text style={styles.metricPeriod}>All Time</Text>
          </View>
          
          {/* Time Period Selector */}
          <View style={styles.timePeriodContainer}>
            {['1D', '1W', '1M', '1Y', 'All'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.timePeriodButton,
                  timePeriod === period ? styles.activeTimePeriodButton : {}
                ]}
                onPress={() => handleTimePeriodChange(period)}
              >
                <Text
                  style={[
                    styles.timePeriodText,
                    timePeriod === period ? styles.activeTimePeriodText : {}
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Performance Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Performance</Text>
          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
        
        {/* Asset Allocation */}
        <View style={styles.allocationCard}>
          <Text style={styles.cardTitle}>Asset Allocation</Text>
          <View style={styles.allocationContainer}>
            <PieChart
              data={assetAllocation}
              width={width - 40}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute={false}
            />
          </View>
        </View>
        
        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.insightsTitle}>AI Investment Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            Your portfolio is up 8.5% this year, outperforming the S&P 500 by 2.3%. Consider diversifying with more international stocks to reduce volatility.
          </Text>
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>View Detailed Analysis</Text>
          </TouchableOpacity>
        </View>
        
        {/* Investments List */}
        <View style={styles.investmentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Investments</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.investmentsList}>
            {investments.map((investment) => (
              <View key={investment.id} style={styles.investmentItem}>
                <View style={styles.investmentLeft}>
                  <Image source={investment.logo} style={styles.investmentLogo} />
                  <View style={styles.investmentInfo}>
                    <Text style={styles.investmentName}>{investment.name}</Text>
                    <Text style={styles.investmentTicker}>{investment.ticker}</Text>
                  </View>
                </View>
                <View style={styles.investmentRight}>
                  <Text style={styles.investmentValue}>{investment.value}</Text>
                  <View style={styles.investmentShares}>
                    <Text style={styles.sharesText}>{investment.shares}</Text>
                    <Text
                      style={[
                        styles.changeText,
                        investment.positive ? styles.positiveChange : styles.negativeChange
                      ]}
                    >
                      {investment.change}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={()=> navigator.navigate('AddInvestment')}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Investment</Text>
            </TouchableOpacity>
          </View>
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
            
            <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Transactions')}>
                <Ionicons name="list" size={24} color="#8E9AAF" />
                <Text style={styles.navText}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem,, styles.activeNavItem]} onPress={()=>navigator.navigate('Investments')} >
                <Ionicons name="trending-up" size={24} color="#2D6BFF" />
                <Text style={[styles.navText, styles.activeNavText]}>Investments</Text>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#8E9AAF',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 8,
  },
  summaryMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#36D1B7',
    marginLeft: 4,
  },
  metricPeriod: {
    fontSize: 14,
    color: '#8E9AAF',
  },
  timePeriodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 4,
  },
  timePeriodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimePeriodButton: {
    backgroundColor: '#2D6BFF',
  },
  timePeriodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E9AAF',
  },
  activeTimePeriodText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  allocationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  allocationContainer: {
    alignItems: 'center',
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  investmentsSection: {
    marginBottom: 24,
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
  investmentsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  investmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  investmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investmentLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  investmentInfo: {
    justifyContent: 'center',
  },
  investmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  investmentTicker: {
    fontSize: 12,
    color: '#8E9AAF',
  },
  investmentRight: {
    alignItems: 'flex-end',
  },
  investmentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2138',
    marginBottom: 4,
  },
  investmentShares: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sharesText: {
    fontSize: 12,
    color: '#8E9AAF',
    marginRight: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#36D1B7',
  },
  negativeChange: {
    color: '#FF6B6B',
  },
  addButton: {
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
  addButtonText: {
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