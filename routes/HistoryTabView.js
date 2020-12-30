import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getAllLottoDatas } from './../modules/api';
import LottoCard from './../components/LottoCard';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';
import { THEME_COLORS } from './../style/color';

export default function HistoryTabView() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        if (isEmptyArray(data)) {
            setLoading(true);
            getAllLottoDatas().then((rst) => {
                setData(rst);
                setLoading(false);
                setAlert(true, '데이터 불러오기 완료');
            });
        } else {
            setSelected(data[0]);
        }
    }, [data]);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <View style={styles.screen}>
            <View>
                <Text style={{ color: THEME_COLORS.GRAY_100 }}>{JSON.stringify(selected)}</Text>
            </View>
            <View style={styles.listContainer}>
                <ScrollView style={styles.scrollView}>
                    {data.map((val) => (
                        <LottoCard key={val.round} data={val}>
                            <TouchableOpacity style={styles.link} onPress={() => setSelected(val)}>
                                <Text style={styles.textLink}>당첨금 확인하기</Text>
                            </TouchableOpacity>
                        </LottoCard>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
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
