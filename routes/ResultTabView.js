import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getCurrentRound, getLottoDatasFromApi } from './../modules/api';
import LottoCard from './../components/LottoCard';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';
import { THEME_COLORS } from './../style/color';
import PriceCard from '../components/PriceCard';
import { getResultData } from '../db';

export default function ResultTabView({ navigation }) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        if (isEmptyArray(data)) {
            setLoading(true);
            const result = getResultData();
            if (result.length < getCurrentRound()) {
                getLottoDatasFromApi(result.length + 1).then((rst) => {
                    setData(getResultData());
                    setAlert(true, '데이터 불러오기 완료');
                });
            } else {
                setData(getResultData());
            }
        } else {
            setLoading(false);
            setSelected(data[0]);
        }
    }, [data]);

    const renderCard = ({ item }) => (
        <LottoCard data={item} selected={item.round === selected.round}>
            <TouchableOpacity style={styles.link} onPress={() => setSelected(item)}>
                <Text style={styles.textLink}>당첨금 확인하기</Text>
            </TouchableOpacity>
        </LottoCard>
    );

    return (
        <View style={styles.screen}>
            <View style={styles.priceContainer}>
                <PriceCard data={selected} />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.round.toString()}
                    initialNumToRender={12}
                    style={styles.scrollView}
                />
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
