import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getAllLottoDatas } from './../modules/api';
import LottoCard from './../components/LottoCard';
import { setLoading } from '../components/Popup';

export default function HistoryTabView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isEmptyArray(data)) {
            setLoading(true);
            getAllLottoDatas().then((rst) => {
                setData(rst);
                setLoading(false);
            });
        }
    }, []);

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
