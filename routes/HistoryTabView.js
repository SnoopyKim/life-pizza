import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';
import { THEME_COLORS } from './../style/color';
import { getHistoryData, getSingleResultData } from '../db';
import HistoryCard from './../components/HistoryCard';
import { getHistoryBuy, getWinPrice, ModelToHistory, getHistoryDataRanked } from './../utils/data';
import NavItem from '../components/NavItem';
import emptyIcon from '../images/search_off.png';
import { numberToStringWithCommas } from './../utils/number';

export default function HistoryTabView({ navigation }) {
    const [type, setType] = useState('ALL');
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (type === 'EMPTY') {
            setType('ALL');
        } else if (type === 'ALL') {
            setData(getHistoryData());
        } else if (type === 'BUY') {
            setData(getHistoryBuy());
        } else if (type === 'WIN') {
            setData(getHistoryDataRanked());
        }
        setLoading(false);
    }, [type]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setType('EMPTY');
        });
        return unsubscribe;
    }, [navigation]);

    const renderListHeader = () => {
        if (type === 'ALL') {
            return (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>전체 내역</Text>
                </View>
            );
        } else if (type === 'BUY') {
            const reducer = (acc, cur) => acc + getWinPrice(cur.round, cur.rank);
            const totalPrice = data.reduce(reducer, 0) - data.length * 1000;
            return (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>구매 내역</Text>
                    <View style={styles.headerContent}>
                        <Text>구매 횟수: {data.length}</Text>
                        <Text>손익 합계: {numberToStringWithCommas(totalPrice)} 원</Text>
                    </View>
                </View>
            );
        } else if (type === 'WIN') {
            const reducer = (acc, cur) => acc + getWinPrice(cur.round, cur.rank);
            const totalPrice = data.reduce(reducer, 0);
            return (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>당첨 내역</Text>
                    <View style={styles.headerContent}>
                        <Text>당첨 횟수: {data.length}</Text>
                        <Text>당첨 금액 합: {numberToStringWithCommas(totalPrice)} 원</Text>
                    </View>
                </View>
            );
        }
    };

    const renderCard = ({ item }) => (
        <HistoryCard data={{ result: getSingleResultData(item[0].round), history: item }} />
    );

    return (
        <View style={styles.screen}>
            <View style={styles.navContainer}>
                <NavItem title={'전체 내역 보기'} onPress={() => setType('ALL')} />
                <NavItem title={'구매 내역 보기'} onPress={() => setType('BUY')} />
                <NavItem title={'당첨 내역 보기'} onPress={() => setType('WIN')} />
            </View>
            <View style={styles.listContainer}>
                {renderListHeader()}
                {isEmptyArray(ModelToHistory(data)) ? (
                    <View style={styles.emptyContainer}>
                        <Image source={emptyIcon} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>해당 내역이 없습니다</Text>
                    </View>
                ) : (
                    <FlatList
                        data={ModelToHistory(data)}
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
        paddingBottom: 10,
    },
    header: {
        marginBottom: 10,
    },
    headerTitle: {
        alignSelf: 'center',
        color: THEME_COLORS.GRAY_700,
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerContent: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        width: 50,
        height: 50,
        tintColor: THEME_COLORS.GRAY_500,
    },
    emptyText: {
        color: THEME_COLORS.GRAY_500,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});
