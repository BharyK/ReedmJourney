import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './pages/dashboard/dashboard'; // Example screen

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {/* <Drawer.Screen name="Profile" component={Profile} /> */}
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}