import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStackNavigator from './navigation/HomeStackNavigator';
import ComparePokemonScreen from './screens/ComparePokemonScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Compare Pokemon') {
                iconName = 'compare';
              }

              return <MaterialIcons name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
          />
          <Tab.Screen
            name="Compare Pokemon"
            component={ComparePokemonScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
