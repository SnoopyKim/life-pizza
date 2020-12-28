import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getAllLottoDatas } from './../modules/api';
import LottoCard from './../components/LottoCard';
import { setLoading } from '../components/Popup';
import { setAlert } from './../components/Popup/index';

export default function HistoryTabView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isEmptyArray(data)) {
            setLoading(true);
            getAllLottoDatas().then((rst) => {
                setData(rst);
                setLoading(false);
                setAlert(true, '데이터 불러오기 완료');
            });
        }
    }, [data]);

    return (
        <View>
            {isEmptyArray(data) ? (
                <Text style={{ alignSelf: 'center' }}>Data Loading...</Text>
            ) : (
                <ScrollView>
                    {data.map((val) => (
                        <LottoCard key={val.round} data={val} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
