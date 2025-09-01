import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './login/index';
import SignupScreen from './signup/index';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}