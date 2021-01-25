import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainScreen from './routes/MainScreen';
import WebviewScreen from './routes/WebviewScreen';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { THEME_COLORS } from './style/color';
import webIcon from './images/web.png';
import PopupWrapper from './components/Popup';

const Stack = createStackNavigator();

const App = () => {
    StatusBar.setBackgroundColor(THEME_COLORS.MIDNIGHT_BLACK, true);

    return (
        <PopupWrapper>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: styles.header,
                        headerTintColor: THEME_COLORS.GRAY_100,
                        headerTitleAlign: 'center',
                        headerTitleStyle: styles.headerTitle,
                        ...TransitionPresets.SlideFromRightIOS, // 화면 이동 시 슬라이드 설정 (iOS만 되는 것 아님!)
                    }}>
                    <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={({ navigation, route }) => ({
                            title: '인생피자',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('Webview')}>
                                    <Image source={webIcon} style={styles.navIcon} />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Webview"
                        component={WebviewScreen}
                        options={{ title: '동행복권', header: () => <View /> }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PopupWrapper>
    );
};

export default App;

const styles = StyleSheet.create({
    header: {
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
        height: 50,
    },
    headerTitle: {
        fontSize: 22,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    navIcon: {
        marginEnd: 20,
        tintColor: THEME_COLORS.GRAY_100,
        width: 25,
        height: 25,
    },
});
