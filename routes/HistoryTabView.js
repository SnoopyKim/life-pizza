import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import { isEmptyObject } from './../utils/check';

const getLottoData = async (round) => {
    return await Axios.get('http://www.dhlottery.co.kr/common.do', {
        params: {
            method: 'getLottoNumber',
            drwNo: round,
        },
    });
};

export default function HistoryTabView() {
    const [recentData, setRecentData] = useState({});
    if (isEmptyObject(recentData)) {
        getLottoData(939).then((rst) => setRecentData(rst.data));
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
