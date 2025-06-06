import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/WelcomeScreen';
import MonitoramentoScreen from './screens/MonitoramentoScreen';
import AlertasScreen from './screens/AlertasScreen';
import AcaoControleScreen from './screens/AcaoControleScreen';
import HistoricoScreen from './screens/HistoricoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Início') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Monitoramento') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === 'Alertas') {
              iconName = focused ? 'warning' : 'warning-outline';
            } else if (route.name === 'Ação e Controle') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Histórico') {
              iconName = focused ? 'time' : 'time-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#17a2b8',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Início" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Monitoramento" component={MonitoramentoScreen} />
        <Tab.Screen name="Alertas" component={AlertasScreen} />
        <Tab.Screen name="Ação e Controle" component={AcaoControleScreen} />
        <Tab.Screen name="Histórico" component={HistoricoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
