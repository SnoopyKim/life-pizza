import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isEmptyObject } from './../utils/check';
import {
    getLottoData,
    getCurrentRound,
    getAllLottoDatas,
} from './../modules/api';

export default function HistoryTabView() {
    const [recentData, setRecentData] = useState({});
    if (isEmptyObject(recentData)) {
        const round = getCurrentRound();
        getLottoData(round).then((rst) => setRecentData(rst.data));
        console.log('Call data start', new Date().toDateString());
        getAllLottoDatas().then((rst) =>
            console.log('Get data', rst.length, new Date().toDateString())
        );
    }

    return (
        <View>
            {isEmptyObject(recentData) ? (
                <Text>Data Loading...</Text>
            ) : (
                <View>
                    <Text>{recentData.drwtNo1}</Text>
                    <Text>{recentData.drwtNo2}</Text>
                    <Text>{recentData.drwtNo3}</Text>
                    <Text>{recentData.drwtNo4}</Text>
                    <Text>{recentData.drwtNo5}</Text>
                    <Text>{recentData.drwtNo6}</Text>
                    <Text>{recentData.bnusNo}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
