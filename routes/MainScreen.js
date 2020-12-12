import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryTabView from './HistoryTabView';
import NumberTabView from './NumberTabView';
import listIcon from '../images/format-list-text.png';
import ballIcon from '../images/billiards.png';
import { THEME_COLORS } from '../style/color';
import { getTabBarIconStyle, getTabBarLabelStyle } from '../style';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const renderHistoryTabIcon = ({ focused, color, size }) => {
        return <Image source={listIcon} style={getTabBarIconStyle(focused)} />;
    };

    const renderHistoryLabel = ({ focused, color, position }) => {
        return focused ? (
            <Text source={listIcon} style={getTabBarLabelStyle()}>
                당첨결과
            </Text>
        ) : (
            <View />
        );
    };

    const renderNumberTabIcon = ({ focused, color, size }) => {
        return <Image source={ballIcon} style={getTabBarIconStyle(focused)} />;
    };

    const renderNumberLabel = ({ focused, color, position }) => {
        return focused ? (
            <Text source={listIcon} style={getTabBarLabelStyle()}>
                번호생성
            </Text>
        ) : (
            <View />
        );
    };

    return (
        <Tab.Navigator
            initialRouteName="History"
            tabBarOptions={{
                style: styles.tabBar,
            }}>
            <Tab.Screen
                name="History"
                options={{
                    tabBarIcon: renderHistoryTabIcon,
                    tabBarLabel: renderHistoryLabel,
                }}
                component={HistoryTabView}
            />
            <Tab.Screen
                name="Number"
                options={{
                    tabBarIcon: renderNumberTabIcon,
                    tabBarLabel: renderNumberLabel,
                }}
                component={NumberTabView}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
    },
});
