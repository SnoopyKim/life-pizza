import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';
import { THEME_COLORS } from './../style/color';
import { getHistoryData, getHistoryDataRanked, getSingleResultData } from '../db';
import HistoryCard from './../components/HistoryCard';
import { ModelToHistory } from './../utils/data';
import NavItem from '../components/NavItem';

export default function HistoryTabView({ navigation }) {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [rankData, setRankData] = useState([]);

    useEffect(() => {
        if (!loaded && isEmptyArray(data)) {
            setLoading(true);
            const history = ModelToHistory(getHistoryData());
            setData(history);
            setLoaded(true);
        }
        if (loaded) {
            setLoading(false);
        }
        if (loaded && !isEmptyArray(data)) {
            console.log(data);
            setRankData(getHistoryDataRanked());
        }
    }, [data, loaded]);

    useEffect(() => {
        if (isEmptyArray(rankData)) {
        } else {
        }
    }, [rankData]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setData([]);
            setLoaded(false);
        });
        return unsubscribe;
    }, [navigation]);

    const renderCard = ({ item }) => (
        <HistoryCard data={{ result: getSingleResultData(item[0].round), history: item }} />
    );

    return (
        <View style={styles.screen}>
            <View style={styles.navContainer}>
                <NavItem title={'전체 내역 보기'} />
                <NavItem title={'구매 내역 보기'} />
                <NavItem title={'당첨 내역 보기'} />
            </View>
            <View style={styles.listContainer}>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => item[0].round.toString() + index}
                        initialNumToRender={10}
                        contentContainerStyle={styles.scrollView}
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
    navContainer: {
        marginHorizontal: 25,
    },
    listContainer: {
        flex: 1,
        marginTop: 10,
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
