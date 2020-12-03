import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryTabView from './HistoryTabView';
import NumberTabView from './NumberTabView';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="History"
        options={{ title: '당첨결과' }}
        component={HistoryTabView}
      />
      <Tab.Screen
        name="Number"
        options={{ title: '번호생성' }}
        component={NumberTabView}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
