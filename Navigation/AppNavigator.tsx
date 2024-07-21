// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import AddEditBookScreen from '../Screens/AddEditBookScreen';
import BookDetailScreen from '../Screens/BookDetailsScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator(){
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddEdit" component={AddEditBookScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

