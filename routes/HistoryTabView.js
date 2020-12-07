import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getAllLottoDatas } from './../modules/api';
import LottoCard from './../components/LottoCard';

export default function HistoryTabView() {
    const [data, setData] = useState([]);
    if (isEmptyArray(data)) {
        getAllLottoDatas().then((rst) => setData(rst));
    }

    return (
        <View>
            {isEmptyArray(data) ? (
                <Text>Data Loading...</Text>
            ) : (
                <ScrollView>
                    {data.map((val) => (
                        <LottoCard data={val} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
