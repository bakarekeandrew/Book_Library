// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import AddEditBookScreen from '../Screens/AddEditBookScreen';
import BookDetailScreen from '../Screens/BookDetailsScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeProvider';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ()=> {

  return (
    <Stack.Navigator>
    <Stack.Screen name = "Home" options={{headerShown: false}} component={HomeScreen} />
    <Stack.Screen name = "BookDetails" component={BookDetailScreen} />
  </Stack.Navigator>
  );
 
}

export default function AppNavigator(){
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Add/Edit') {
              iconName = 'create';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
        }}
      
      >
        <Tab.Screen name="Home" options={{ headerShown:false }} component={HomeStack} />
        <Tab.Screen name="Add/Edit" component={AddEditBookScreen} />
        {/* <Stack.Screen name="BookDetail" component={BookDetailScreen} /> */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

