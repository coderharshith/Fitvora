import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginScreen } from '../screens/LoginScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FloatingAddButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.floatingButtonWrap}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.floatingButton}>
      <View style={styles.plusVertical} />
      <View style={styles.plusHorizontal} />
    </View>
  </TouchableOpacity>
);

function MainTabs({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="MealPlan" 
        component={HomeScreen} // Placeholder for Meal Plan
        options={{
          title: 'Meal Plan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple-outline" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={HomeScreen} // Handled by custom button
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Cart');
          },
        }}
        options={{
          tabBarButton: (props) => <FloatingAddButton {...props} />
        }}
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    height: 90,
    paddingBottom: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  floatingButtonWrap: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.button,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  plusVertical: {
    width: 2,
    height: 20,
    backgroundColor: colors.buttonText,
    position: 'absolute',
  },
  plusHorizontal: {
    width: 20,
    height: 2,
    backgroundColor: colors.buttonText,
    position: 'absolute',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
  }
});
