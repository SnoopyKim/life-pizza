import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResultTabView from './ResultTabView';
import CreateTabView from './CreateTabView';
import PickTabView from './PickTabView';
import HistoryTabView from './HistoryTabView';
import listIcon from '../images/format-list-text.png';
import ballIcon from '../images/billiards.png';
import pointIcon from '../images/hand-pointing-left.png';
import historyIcon from '../images/history.png';
import { THEME_COLORS } from '../style/color';
import { getTabBarIconStyle, getTabBarLabelStyle } from '../style';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const renderResultTabIcon = ({ focused, color, size }) => {
        return <Image source={listIcon} style={getTabBarIconStyle(focused)} />;
    };
    const renderResultLabel = ({ focused, color, position }) => {
        return focused ? <Text style={getTabBarLabelStyle()}>당첨결과</Text> : <View />;
    };

    const renderCreateTabIcon = ({ focused, color, size }) => {
        return <Image source={ballIcon} style={getTabBarIconStyle(focused)} />;
    };
    const renderCreateLabel = ({ focused, color, position }) => {
        return focused ? <Text style={getTabBarLabelStyle()}>번호생성</Text> : <View />;
    };

    const renderPickTabIcon = ({ focused, color, size }) => {
        return (
            <Image
                source={pointIcon}
                style={[
                    getTabBarIconStyle(focused),
                    { transform: [{ rotate: '-30deg' }, { scale: 1.3 }] },
                ]}
            />
        );
    };
    const renderPickLabel = ({ focused, color, position }) => {
        return focused ? <Text style={getTabBarLabelStyle()}>번호선택</Text> : <View />;
    };

    const renderHistoryTabIcon = ({ focused, color, size }) => {
        return <Image source={historyIcon} style={getTabBarIconStyle(focused)} />;
    };
    const renderHistoryLabel = ({ focused, color, position }) => {
        return focused ? <Text style={getTabBarLabelStyle()}>히스토리</Text> : <View />;
    };

    return (
        <Tab.Navigator
            initialRouteName="Result"
            tabBarOptions={{ style: styles.tabBar }}
            backBehavior={'none'}>
            <Tab.Screen
                name="Result"
                options={{
                    tabBarIcon: renderResultTabIcon,
                    tabBarLabel: renderResultLabel,
                }}
                component={ResultTabView}
            />
            <Tab.Screen
                name="Number"
                options={{
                    tabBarIcon: renderCreateTabIcon,
                    tabBarLabel: renderCreateLabel,
                }}
                component={CreateTabView}
            />
            <Tab.Screen
                name="Pick"
                options={{
                    tabBarIcon: renderPickTabIcon,
                    tabBarLabel: renderPickLabel,
                }}
                component={PickTabView}
            />
            <Tab.Screen
                name="History"
                options={{
                    tabBarIcon: renderHistoryTabIcon,
                    tabBarLabel: renderHistoryLabel,
                }}
                component={HistoryTabView}
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
