import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';
import { THEME_COLORS } from './../style/color';
import { getHistoryData, getSingleResultData } from '../db';
import HistoryCard from './../components/HistoryCard';
import { ModelToHistory } from './../utils/data';

export default function HistoryTabView({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isEmptyArray(data)) {
            setLoading(true);
            const history = ModelToHistory(getHistoryData());
            console.log(history);
            setData(history);
        } else {
            setLoading(false);
        }
        console.log(data);
    }, [data]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);

    const renderCard = ({ item }) => (
        <HistoryCard data={{ result: getSingleResultData(item[0].round), history: item }} />
    );

    return (
        <View style={styles.screen}>
            <View style={styles.listContainer}>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => item[0].round.toString() + index}
                        initialNumToRender={12}
                        style={styles.scrollView}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
    },
    priceContainer: {
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: THEME_COLORS.GRAY_100,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    },
    scrollView: {
        paddingVertical: 10,
    },
    link: {
        alignSelf: 'flex-end',
    },
    textLink: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: THEME_COLORS.GRAY_500,
    },
});
