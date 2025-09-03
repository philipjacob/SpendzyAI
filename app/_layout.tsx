import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import React from 'react';
import 'react-native-reanimated';
import AddInvestmentScreen from './addinvestment/index';
import AddTransactionScreen from './addtransaction/index';
import BudgetScreen from './budget/index';
import DashboardScreen from './dashboard/index';
import ForgotPasswordScreen from './forgotpassword/index';
import GoalsScreen from './goals/index';
import InvestmentsScreen from './investment/index';
import LoginScreen from './login/index';
import OnboardingScreen from './onboarding/index';
import PayBillsScreen from './paybills/index';
import ProfileSettingsScreen from './profile/index';
import ReceiveMoneyScreen from './receive';
import ResetPasswordScreen from './resetpassword/index';
import SendMoneyScreen from './send';
import SignupScreen from './signup/index';
import TransactionsScreen from './transactions/index';
import VerificationCodeScreen from './verifyotp/index';
import WealthManagementScreen from './wealth/index';
import WelcomeScreen from './welcome/index';


export default function RootLayout() {
  const Stack = createStackNavigator();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="Reset" component={ResetPasswordScreen} />
      <Stack.Screen name="Verify" component={VerificationCodeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} /> 
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />  
      <Stack.Screen name="Wealth" component={WealthManagementScreen} />
      <Stack.Screen name="PayBills" component={PayBillsScreen} />
      <Stack.Screen name="Investments" component={InvestmentsScreen} />
      <Stack.Screen name="AddInvestment" component={AddInvestmentScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="Budget" component={BudgetScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Receive" component={ReceiveMoneyScreen} />
      <Stack.Screen name="Profile" component={ProfileSettingsScreen} />
           
    </Stack.Navigator>
  );
}
