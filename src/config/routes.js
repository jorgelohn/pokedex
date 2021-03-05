import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';
import {NavigationContainer} from '@react-navigation/native';

export default (MainNavigator) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{header: () => null}}
        />

        <Stack.Screen name="Pokemon" component={Pokemon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
