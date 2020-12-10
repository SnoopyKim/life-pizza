import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebviewScreen() {
    return (
        <WebView
            source={{
                uri: 'https://www.dhlottery.co.kr/common.do?method=main',
            }}
        />
    );
}

const styles = StyleSheet.create({});
