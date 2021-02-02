import Realm from 'realm';
import { dataToModel, numberToModel } from '../utils/data';
import { getQueryForFindHistory } from './query';

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
        rank: { type: 'int', default: 0 },
    },
};

// schemaVersion에 따라 .realm 파일이 생성된다.
// deleteRealmIfMigrationNeeded는 version이 변경될 때 이전 realm 파일을 삭제하는 듯
// Schema 구조가 변경될 때 schemaVersion을 변경해주면 된다. (꼭 위로 올라갈 필요는 없다)
let realm = new Realm({
    schema: [ResultSchema, HistorySchema],
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
});

// realm.objects는 실시간으로 변경사항이 반영된다.
let resultData = realm.objects('Result');
export const getResultData = () => resultData.sorted('round', true);
export const getSingleResultData = (round) => realm.objectForPrimaryKey('Result', round);
export const addResultData = (data) => {
    realm.write(() => {
        realm.create('Result', dataToModel(data));
    });
};
export const deleteResultData = (round) => {
    realm.write(() => {
        if (round) {
            let result = getSingleResultData(round);
            realm.delete(result);
            result = null;
        } else {
            realm.deleteModel('Result');
        }
    });
};

let historyData = realm.objects('History');
export const getHistoryData = () => historyData.sorted('date', true);
export const getHistoryDataRanked = () => historyData.filtered('rank > 0');
export const addHistoryData = (data) => {
    realm.write(() => {
        realm.create('History', numberToModel(data));
    });
};
export const updateHistoryData = (item, rank) => {
    realm.write(() => {
        let history = historyData.filtered(getQueryForFindHistory(item));
        history.forEach((obj) => {
            obj.rank = rank;
        });
    });
};
export const deleteHistoryData = (data) => {
    realm.write(() => {
        if (data) {
            realm.delete(data);
            data = null;
        } else {
            realm.deleteModel('History');
        }
    });
};
