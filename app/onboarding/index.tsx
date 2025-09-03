import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Track Your Finances',
    description: 'Automatically categorize transactions and monitor your spending patterns with ease.',
    image: require('../../assets/images/Onboarding1.png'),
  },
  {
    id: '2',
    title: 'Get Smart Insights',
    description: 'Receive AI-powered recommendations and personalized financial advice tailored to your habits.',
    image: require('../../assets/images/Onboarding2.png'),
  },
  {
    id: '3',
    title: 'Achieve Your Goals',
    description: 'Set financial goals and track your progress with intelligent assistance every step of the way.',
    image: require('../../assets/images/Onboarding3.png'),
  },
];

export default function OnboardingScreen(){
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation= useNavigation();
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Dashboard');
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
            source={require('../../assets/images/splash-icon.png')}
            style={{ display: 'none' }}
      />
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/SpendzyLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? styles.paginationDotActive : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: '#2D6BFF',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#8E9AAF',
    fontWeight: '600',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2138',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#8E9AAF',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#2D6BFF',
    width: 20,
  },
  paginationDotInactive: {
    backgroundColor: '#E1E5EB',
  },
  nextButton: {
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});