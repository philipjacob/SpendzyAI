import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as InAppPurchases from 'expo-in-app-purchases';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Constants
const COLORS = {
  primaryBlue: '#2D6BFF',
  secondaryGreen: '#36D1B7',
  textDark: '#1A2138',
  textLight: '#8E9AAF',
  background: '#F7F9FC',
  white: '#FFFFFF',
  border: '#E1E5EB',
  success: '#4CAF50',
  error: '#FF6347',
};

// Mock product IDs - replace with your actual product IDs
const PRODUCT_IDS = {
  android: {
    monthly: 'spendzy_premium_monthly',
    yearly: 'spendzy_premium_yearly',
  },
  ios: {
    monthly: 'com.spendzy.premium.monthly',
    yearly: 'com.spendzy.premium.yearly',
  },
};

export default function SubscriptionScreen(){
  
  const navigator = useNavigation(); 
  // State
  const [selectedPlan, setSelectedPlan] = useState('yearly'); // Default to yearly for better value
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Currency options
  const currencies = [
    { code: 'INR', symbol: '₹', monthlyPrice: 300, yearlyPrice: 3000 },
    { code: 'USD', symbol: '$', monthlyPrice: 3.99, yearlyPrice: 39.99 },
    { code: 'EUR', symbol: '€', monthlyPrice: 3.49, yearlyPrice: 34.99 },
    { code: 'GBP', symbol: '£', monthlyPrice: 2.99, yearlyPrice: 29.99 },
  ];

  // Get current currency data
  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  // Format price with currency symbol
  const formatPrice = (price) => {
    return `${currentCurrency.symbol}${price}`;
  };

  // Initialize in-app purchases
  useEffect(() => {
    const initializeIAP = async () => {
      try {
        await InAppPurchases.connectAsync();
        
        // Get product IDs based on platform
        const productIds = Platform.select({
          ios: [PRODUCT_IDS.ios.monthly, PRODUCT_IDS.ios.yearly],
          android: [PRODUCT_IDS.android.monthly, PRODUCT_IDS.android.yearly],
        });
        
        // Load products
        const { responseCode, results } = await InAppPurchases.getProductsAsync(productIds);
        
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          setProducts(results);
        }
        
        // Check subscription status
        const purchaseHistory = await InAppPurchases.getPurchaseHistoryAsync();
        if (purchaseHistory.results && purchaseHistory.results.length > 0) {
          // Check if any active subscriptions
          const activeSubscription = purchaseHistory.results.find(
            purchase => !purchase.acknowledged
          );
          setIsSubscribed(!!activeSubscription);
        }
        
        // Set up purchase listener
        InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
          if (responseCode === InAppPurchases.IAPResponseCode.OK) {
            results.forEach(purchase => {
              if (!purchase.acknowledged) {
                // Process the purchase
                processPurchase(purchase);
              }
            });
          } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
            Alert.alert('Purchase Canceled', 'You canceled the purchase.');
          } else {
            Alert.alert('Purchase Failed', `Error code: ${errorCode}`);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.log('Error initializing in-app purchases:', error);
        Alert.alert('Error', 'Failed to initialize payment system.');
      }
    };

    initializeIAP();

    // Cleanup
    return () => {
      InAppPurchases.disconnectAsync();
    };
  }, []);

  // Process purchase
  const processPurchase = async (purchase) => {
    try {
      // Acknowledge purchase to prevent refunding
      if (Platform.OS === 'android') {
        await InAppPurchases.acknowledgePurchaseAsync(purchase.purchaseToken);
      }
      
      // Save subscription info to storage
      await AsyncStorage.setItem('subscription', JSON.stringify({
        active: true,
        plan: selectedPlan,
        purchaseDate: new Date().toISOString(),
        expiryDate: calculateExpiryDate(),
      }));
      
      setIsSubscribed(true);
      
      // Show success message
      Alert.alert(
        'Subscription Successful',
        `Thank you for subscribing to Spendzy AI Premium ${selectedPlan} plan!`,
        [{ text: 'Continue', onPress: () => navigator.navigate('Home') }]
      );
    } catch (error) {
      console.log('Error processing purchase:', error);
      Alert.alert('Error', 'Failed to process your purchase.');
    }
  };

  // Calculate expiry date based on selected plan
  const calculateExpiryDate = () => {
    const now = new Date();
    if (selectedPlan === 'monthly') {
      return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
    } else {
      return new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
    }
  };

  // Handle subscription purchase
  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // Get product ID based on platform and selected plan
      const productId = Platform.select({
        ios: selectedPlan === 'monthly' ? PRODUCT_IDS.ios.monthly : PRODUCT_IDS.ios.yearly,
        android: selectedPlan === 'monthly' ? PRODUCT_IDS.android.monthly : PRODUCT_IDS.android.yearly,
      });
      
      // Start purchase flow
      await InAppPurchases.purchaseItemAsync(productId);
      
      // Note: Purchase result is handled in the purchase listener
    } catch (error) {
      console.log('Error making purchase:', error);
      Alert.alert('Error', 'Failed to initiate purchase.');
      setIsLoading(false);
    }
  };

  // Handle currency change
  const handleCurrencyChange = (currencyCode) => {
    setSelectedCurrency(currencyCode);
  };

  // Render currency selector
  const renderCurrencySelector = () => {
    return (
      <View style={styles.currencySelector}>
        <Text style={styles.sectionTitle}>Currency</Text>
        <View style={styles.currencyOptions}>
          {currencies.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              style={[
                styles.currencyOption,
                selectedCurrency === currency.code && styles.selectedCurrencyOption,
              ]}
              onPress={() => handleCurrencyChange(currency.code)}
            >
              <Text
                style={[
                  styles.currencyText,
                  selectedCurrency === currency.code && styles.selectedCurrencyText,
                ]}
              >
                {currency.symbol} {currency.code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Render payment method selector
  const renderPaymentMethods = () => {
    const paymentMethods = [
      { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
      { id: 'googlepay', name: 'Google Pay', icon: 'logo-google' },
      { id: 'applepay', name: 'Apple Pay', icon: 'logo-apple' },
      { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    ];

    // Filter out Apple Pay on Android and Google Pay on iOS
    const filteredMethods = paymentMethods.filter(method => {
      if (Platform.OS === 'ios' && method.id === 'googlepay') return false;
      if (Platform.OS === 'android' && method.id === 'applepay') return false;
      return true;
    });

    return (
      <View style={styles.paymentMethodsContainer}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          {filteredMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === method.id && styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <Ionicons
                name={method.icon}
                size={24}
                color={selectedPaymentMethod === method.id ? COLORS.white : COLORS.primaryBlue}
              />
              <Text
                style={[
                  styles.paymentMethodText,
                  selectedPaymentMethod === method.id && styles.selectedPaymentMethodText,
                ]}
              >
                {method.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Premium Subscription</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Logo and Intro */}
        <View style={styles.introSection}>
          <Image
            source={require('../../assets/images/SpendzyLogo.png')} // Replace with your actual logo path
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.introTitle}>Upgrade to Premium</Text>
          <Text style={styles.introText}>
            Unlock all features and take control of your finances
          </Text>
        </View>

        {/* Subscription Plans */}
        <View style={styles.plansContainer}>
          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.selectedPlanCard,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Monthly</Text>
              <View style={styles.radioButton}>
                {selectedPlan === 'monthly' && <View style={styles.radioButtonInner} />}
              </View>
            </View>
            <Text style={styles.planPrice}>
              {formatPrice(currentCurrency.monthlyPrice)}
              <Text style={styles.planPeriod}>/month</Text>
            </Text>
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>AI-powered insights</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>Unlimited goals</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>Ad-free experience</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Yearly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'yearly' && styles.selectedPlanCard,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Yearly</Text>
              <View style={styles.radioButton}>
                {selectedPlan === 'yearly' && <View style={styles.radioButtonInner} />}
              </View>
            </View>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 20%</Text>
            </View>
            <Text style={styles.planPrice}>
              {formatPrice(currentCurrency.yearlyPrice)}
              <Text style={styles.planPeriod}>/year</Text>
            </Text>
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>All monthly features</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>Investment tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.secondaryGreen} />
                <Text style={styles.featureText}>Priority support</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Currency Selector */}
        {renderCurrencySelector()}

        {/* Payment Methods */}
        {renderPaymentMethods()}

        {/* Subscribe Button */}
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          )}
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By subscribing, you agree to our{' '}
            <Text style={styles.termsLink} onPress={() => navigation.navigate('Terms')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.termsLink} onPress={() => navigation.navigate('Privacy')}>
              Privacy Policy
            </Text>
            . Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period. You can manage your subscription in your account settings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  placeholder: {
    width: 24,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  plansContainer: {
    marginBottom: 25,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: COLORS.primaryBlue,
    borderWidth: 2,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryBlue,
  },
  saveBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.secondaryGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  saveBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
    marginBottom: 15,
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.textLight,
  },
  planFeatures: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  currencySelector: {
    marginBottom: 25,
  },
  currencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  currencyOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCurrencyOption: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryBlue,
  },
  currencyText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  selectedCurrencyText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  paymentMethodsContainer: {
    marginBottom: 30,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
    minWidth: '45%',
  },
  selectedPaymentMethod: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryBlue,
  },
  paymentMethodText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  selectedPaymentMethodText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  subscribeButton: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primaryBlue,
    fontWeight: '500',
  },
});