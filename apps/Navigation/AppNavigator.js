import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListData from '../Pages/ListData';
import FormData from '../Pages/FormData';

const Stack = createNativeStackNavigator();

class AppNavigator extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListData"
            component={ListData}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FormData"
            component={FormData}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
