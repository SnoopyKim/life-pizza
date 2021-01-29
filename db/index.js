import Realm from 'realm';
import { dataToModel, numberToModel } from '../utils/data';

// 당첨 데이터 스키마
const ResultSchema = {
    name: 'Result',
    primaryKey: 'round',
    properties: {
        round: 'int',
        date: 'string',
        no1: 'int',
        no2: 'int',
        no3: 'int',
        no4: 'int',
        no5: 'int',
        no6: 'int',
        bno: 'int',
        firstWinCnt: 'int',
        firstWinPrc: 'int',
        secondWinCnt: 'int',
        secondWinPrc: 'int',
        thirdWinCnt: 'int',
        thirdWinPrc: 'int',
        fourthWinCnt: 'int',
        fourthWinPrc: 'int',
        fifthWinCnt: 'int',
        fifthWinPrc: 'int',
    },
};

// 사용자 번호 스키마
const HistorySchema = {
    name: 'History',
    properties: {
        round: 'int',
        date: 'string',
        no1: 'int',
        no2: 'int',
        no3: 'int',
        no4: 'int',
        no5: 'int',
        no6: 'int',
    },
};

let realm = new Realm({
    schema: [ResultSchema, HistorySchema],
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
});

let resultData = realm.objects('Result');
export const getResultData = () => resultData.sorted('round', true);
export const getSingleResultData = (round) => realm.objectForPrimaryKey('Result', round);
export const addResultData = (data) => {
    realm.write(() => {
        realm.create('Result', dataToModel(data));
    });
};

let historyData = realm.objects('History');
export const getHistoryData = () => historyData.sorted('date', true);
export const addHistoryData = (data) => {
    realm.write(() => {
        realm.create('History', numberToModel(data));
    });
};
