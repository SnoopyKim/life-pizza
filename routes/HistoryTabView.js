import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { isEmptyArray } from './../utils/check';
import { getAllLottoDatas } from './../modules/api';

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
                        <View key={val.date}>
                            <Text>
                                {val.round}회 결과 ({val.date})
                            </Text>
                            <Text>
                                {val.no1} {val.no2} {val.no3} {val.no4}{' '}
                                {val.no5} {val.no6} {val.bno}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
