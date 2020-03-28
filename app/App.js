import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import ActivitiesScreen from './screens/activitiesScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: false,
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{}}/>
        <Stack.Screen name="Activities" component={ActivitiesScreen} options={{}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
