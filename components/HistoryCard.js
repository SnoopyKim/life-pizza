import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';
import Ball, { BallSet } from './Ball';
import { THEME_COLORS } from '../style/color';
import { getWinResult, getMatchedNumberArray } from './../utils/check';
import { updateHistoryData } from '../db';
import { getOnlyNumbersFromObject } from './../utils/number';

/*
 *  data: {
 *      history: [{round, date, no1, no2, ...}, {...}, ...],
 *      result: {round, date, no1, no2, ..., bno}
 *  }
 */
export default function HistoryCard({ data }) {
    // 최신 결과만 처음부터 열려있는 상태
    const { history, result } = data;

    const renderResult = () => {
        if (result) {
            return (
                <View style={styles.resultView}>
                    <BallSet numbers={result} size={24} />
                </View>
            );
        } else {
            return undefined;
        }
    };

    const renderHistoryItem = ({ item }) => {
        let rank = item.rank;
        if (!rank && result) {
            rank = getWinResult(result, item);
            updateHistoryData(item, rank);
        }
        const uncheck = Object.values(getOnlyNumbersFromObject(item)).filter(
            (num) => !getMatchedNumberArray(result, item).includes(num)
        );
        return (
            <View style={{ flexDirection: 'row' }}>
                <BallSet numbers={item} uncheckList={uncheck} />
                {result && <Text style={styles.rank}>{rank ? rank + '등' : ' -- '}</Text>}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>{history[0].round}회</Text>
                    {renderResult()}
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={history}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item, index) => item.round + '-' + index}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 15,
        minHeight: 60,
        backgroundColor: THEME_COLORS.GRAY_50,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        margin: 2,
    },
    header: {
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: THEME_COLORS.MIDNIGHT_BLACK,
        fontSize: 16,
        fontWeight: '700',
    },
    resultView: {
        flex: 1,
        marginHorizontal: 10,
    },
    content: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    seperator: {
        height: 2,
        marginVertical: 5,
        backgroundColor: THEME_COLORS.GRAY_100,
    },
    rank: {
        width: 40,
        height: 32,
        marginStart: 3,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: THEME_COLORS.MIDNIGHT_BLACK,
        color: THEME_COLORS.MIDNIGHT_BLACK,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
