import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginCustomer from './screens/customer/Login';
import CustomerServices from './screens/customer/Services';
import CustomHeader from './components/common/Header/Header';
import { StyleSheet } from 'react-native';
import MapScreen from './components/customer/test/MapServices';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={LoginCustomer}
          name='LoginCustomer'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={CustomerServices}
          name='CustomerServices'
          options={{headerTitle: 'Services', headerStyle: styles.whiteHeader, headerTitleAlign: 'center', headerTitleStyle: styles.whiteHeaderTitle, headerTintColor: '#EF4F5F'}}
        />
        <Stack.Screen
          component={MapScreen}
          name='MapScreen'
          options={{headerTitle: 'Map', headerStyle: styles.whiteHeader, headerTitleAlign: 'center', headerTitleStyle: styles.whiteHeaderTitle, headerTintColor: '#EF4F5F'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
    whiteHeader: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    whiteHeaderTitle: {
        color: '#EF4F5F',
        fontFamily: 'Poppins_700Bold'
    }
})