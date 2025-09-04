import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit'; // You might need to install this: npm install react-native-svg react-native-svg-charts
import AddGoalModal from './addgoal';
import AdjustGoalModal from './adjustgoal';

const { width } = Dimensions.get('window');

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false 
};

const Colors = {
  primary: '#2D6BFF',
  secondary: '#36D1B7',
  background: '#F0F2F5',
  cardBackground: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  borderColor: '#E0E0E0',
  red: '#FF6B6B',
};

const goalsData = [
  {
    id: '1',
    name: 'House Down Payment',
    icon: 'home',
    saved: 12000,
    target: 20000,
    timeRemaining: '2 years left',
  },
  {
    id: '2',
    name: 'New Car Fund',
    icon: 'car',
    saved: 15000,
    target: 20000,
    timeRemaining: '1.5 years left',
  },
  {
    id: '3',
    name: 'Dream Vacation',
    icon: 'palm-tree',
    saved: 3000,
    target: 5000,
    timeRemaining: '9 months left',
  },
  {
    id: '4',
    name: 'Education Fund',
    icon: 'school',
    saved: 8000,
    target: 10000,
    timeRemaining: '1 year left',
  },
];


export default function GoalsScreen() {
  const totalSaved = goalsData.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTarget = goalsData.reduce((sum, goal) => sum + goal.target, 0);
  const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) : 0;
  const [isAddGoalModalVisible, setIsAddGoalModalVisible] = React.useState(false);
  const [adjustGoalModalVisible, setAdjustGoalModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleAddGoal = (newGoal) => {
    // Add the new goal to your goals list
    console.log('New goal added:', newGoal);
    // Update your goals state here
  };
  const handleAdjustGoal = (goal) => {
    setSelectedGoal(goal);
    setAdjustGoalModalVisible(true);
  };
  const handleSaveGoalAdjustment = (updatedGoal) => {
    // Update the goal in your state or database
    console.log('Updated goal:', updatedGoal);
    
    // In a real app, you would update your state or call an API
    // For example:
    // const updatedGoals = goalsData.map(goal => 
    //   goal.id === updatedGoal.id ? updatedGoal : goal
    // );
    // setGoalsData(updatedGoals);
  };
  const navigator = useNavigation();
  const getGoalIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return <FontAwesome5 name="home" size={24} color={Colors.primary} />;
      case 'car':
        return <Ionicons name="car" size={24} color={Colors.primary} />;
      case 'palm-tree':
        return <FontAwesome5 name="tree" size={24} color={Colors.primary} />; // Using 'tree' as 'palm-tree' might not be directly available in FontAwesome5
      case 'school':
        return <Ionicons name="school" size={24} color={Colors.primary} />;
      default:
        return <Ionicons name="cash-outline" size={24} color={Colors.primary} />;
    }
  };
  const data = {
    labels: ["home", "car", "vacation","education"], // optional
    data: [0.6, 0.75, 0.6, 0.8]
  };
  const AIRecommendationCard = () => (
    <View style={styles.aiRecommendationCard}>
      <MaterialCommunityIcons name="lightbulb-on" size={28} color={Colors.secondary} />
      <View style={styles.aiTextContainer}>
        <Text style={styles.aiRecommendationText}>
          Based on your spending, you can increase savings by <Text style={{ fontWeight: 'bold' }}>£200/month</Text> by optimizing your dining expenses.
        </Text>
        <TouchableOpacity style={styles.aiRecommendationButton}>
          <Text style={styles.aiRecommendationButtonText}>Explore Suggestions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goals</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity  onPress={() => setIsAddGoalModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={28} color="#8E9AAF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Filter Goals')} style={{ marginLeft: 15 }}>
            <Ionicons name="filter-outline" size={28} color="#8E9AAF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Overview Section */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.progressCircleContainer}>
            <ProgressChart
              data={data}
              width={400}
              height={300}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
            <View style={styles.progressTextOverlay}>
              <Text style={styles.progressPercentage}>{(totalProgress * 100).toFixed(0)}%</Text>
              <Text style={styles.progressLabel}>Total Savings Progress</Text>
              <Text style={styles.progressAmount}>
                £{totalSaved.toLocaleString()} of £{totalTarget.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
        <AddGoalModal
          visible={isAddGoalModalVisible}
          onClose={() => setIsAddGoalModalVisible(false)}
          onAdd={handleAddGoal}
        />
        <AdjustGoalModal
          visible={adjustGoalModalVisible}
          onClose={() => setAdjustGoalModalVisible(false)}
          goalData={selectedGoal}
          onSave={handleSaveGoalAdjustment}
        />
        {/* Active Goals Section */}
        <View style={styles.activeGoalsSection}>
          <Text style={styles.sectionTitle}>Active Goals</Text>
          <View style={styles.goalsGrid}>
            {goalsData.map((goal) => (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalCardHeader}>
                  {getGoalIcon(goal.icon)}
                  <Text style={styles.goalName}>{goal.name}</Text>
                </View>
                <Text style={styles.goalAmount}>
                  £{goal.saved.toLocaleString()} of £{goal.target.toLocaleString()}
                </Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${(goal.saved / goal.target) * 100}%` },
                    ]}
                  />
                </View>
                <View style={styles.adjustGoalContainer}>
                  <Text style={styles.goalTimeRemaining}>{goal.timeRemaining}</Text>
                  <TouchableOpacity style={styles.adjustGoalContainer}  onPress={() => handleAdjustGoal(goal)}>
                    <View style={styles.penRight}>  
                      <Image source={require('../../assets/images/adjust-goal-icon.png')} style={styles.adjustIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI-Powered Suggestions */}
        <View style={styles.aiSuggestionsSection}>
          <Text style={styles.sectionTitle}>AI-Powered Suggestions</Text>
          <AIRecommendationCard />
        </View>
      </ScrollView>

      {/* Bottom Navigation (Placeholder - integrate with your actual navigation) */}
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
                <Ionicons name="list" size={24}  color="#8E9AAF"/>
                <Text style={styles.navText}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={()=>navigator.navigate('Investments')} >
                <Ionicons name="trending-up" size={24} color="#8E9AAF" />
                <Text style={styles.navText}>Investments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={()=>navigator.navigate('Goals')}>
                <Ionicons name="trophy" size={24} color="#2D6BFF" />
                <Text style={[styles.navText,styles.activeNavText]}>Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}  onPress={()=>navigator.navigate('Profile')}>
                <Ionicons name="person-outline" size={24} color="#8E9AAF" />
                <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2138',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  scrollViewContent: {
    paddingBottom: 100, // Space for the bottom navigation
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  overviewSection: {
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressCircleContainer: {
    width: 400,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTextOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  progressAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 5,
  },
  activeGoalsSection: {
    marginTop: 10,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  goalCard: {
    backgroundColor: Colors.cardBackground,
    width: (width - 60) / 2, // 20px padding left/right, 20px space between cards
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adjustGoalContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  penRight: {
    paddingLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  adjustIcon:{
    height:40,
    width:40,
  },
  goalCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginLeft: 10,
    flexShrink: 1,
  },
  goalAmount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.borderColor,
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 5,
  },
  goalTimeRemaining: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  aiSuggestionsSection: {
    marginTop: 10,
  },
  aiRecommendationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  aiRecommendationText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 10,
  },
  aiRecommendationButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aiRecommendationButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  navText: {
    fontSize: 12,
    color: Colors.textSecondary,
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