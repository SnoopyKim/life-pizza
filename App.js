import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './routes/MainScreen';
import WebviewScreen from './routes/WebviewScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Webview" component={WebviewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
