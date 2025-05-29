import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useColorModeValue} from 'native-base';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const activeIconColor = useColorModeValue('#FF4500', '#FF6347');
  const inactiveIconColor = useColorModeValue('#FF8C00', '#A0522D');

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Ana sayfa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Ayarlar') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: inactiveIconColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopWidth: 1,
          borderTopColor: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
          elevation: 0, // Android için gölgeyi kaldır
          shadowOpacity: 0, // iOS için gölgeyi kaldır
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Ana sayfa" component={HomeScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
