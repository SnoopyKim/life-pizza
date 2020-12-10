import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Image, Linking, StyleSheet, TouchableHighlight, View } from 'react-native';
import { WebView } from 'react-native-webview';
import iconArrow from '../images/chevron-down.png';
import iconBack from '../images/backspace-outline.png';
import iconOpen from '../images/open-in-new.png';
import { THEME_COLORS } from './../style/color';

const WEB_URL = 'https://www.dhlottery.co.kr/common.do?method=main';

export default function WebviewScreen({ navigation }) {
    const wvRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);

    const onAndroidBackPress = useCallback(() => {
        if (wvRef.current && canGoBack) {
            wvRef.current.goBack();
            return true;
        }
        return false;
    }, [canGoBack]);

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        return () => {
            handler.remove();
            // BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
        };
    }, [onAndroidBackPress]);

    return (
        <View style={styles.screen}>
            <WebView
                ref={wvRef}
                source={{
                    uri: WEB_URL,
                }}
                onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
            />
            {/* 웹뷰 컨트롤러 */}
            <View style={styles.controllerBox}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={THEME_COLORS.GRAY_600}
                    onPress={() => navigation.pop()}
                    onLongPress={() => navigation.pop()}>
                    <Image source={iconBack} style={styles.icon} />
                </TouchableHighlight>
                <View style={styles.dividing} />
                <TouchableHighlight
                    style={[styles.button, styles.prevButton]}
                    underlayColor={THEME_COLORS.GRAY_600}
                    onPress={() => wvRef.current.goBack()}>
                    <Image source={iconArrow} style={[styles.icon, styles.prevIcon]} />
                </TouchableHighlight>
                <View style={styles.dividing} />
                <TouchableHighlight
                    style={[styles.button, styles.nextButton]}
                    underlayColor={THEME_COLORS.GRAY_600}
                    onPress={() => wvRef.current.goForward()}>
                    <Image source={iconArrow} style={[styles.icon, styles.nextIcon]} />
                </TouchableHighlight>
                <View style={styles.dividing} />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={THEME_COLORS.GRAY_600}
                    onPress={() => {
                        Linking.openURL(WEB_URL);
                        navigation.pop();
                    }}>
                    <Image source={iconOpen} style={styles.icon} />
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    controllerBox: {
        height: 50,
        backgroundColor: THEME_COLORS.MIDNIGHT_DARK,
        flexDirection: 'row',
    },
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prevButton: {
        flex: 1,
    },
    nextButton: {
        flex: 1,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: THEME_COLORS.GRAY_50,
    },
    prevIcon: {
        transform: [{ rotate: '90deg' }, { scaleX: 2 }, { scaleY: 1.6 }],
    },
    nextIcon: {
        transform: [{ rotate: '270deg' }, { scaleX: 2 }, { scaleY: 1.6 }],
    },
    dividing: {
        width: 0.5,
        height: 30,
        marginVertical: 10,
        backgroundColor: THEME_COLORS.GRAY_50,
    },
});
