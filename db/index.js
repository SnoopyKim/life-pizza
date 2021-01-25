import Realm from 'realm';
import { dataToModel } from './../utils/data';

// 번호 데이터 스키마
const NumberSchema = {
    name: 'Number',
    properties: {
        no1: 'int',
        no2: 'int',
        no3: 'int',
        no4: 'int',
        no5: 'int',
        no6: 'int',
        bno: 'int',
    },
};

// 당첨 데이터 스키마
const HistorySchema = {
    name: 'History',
    primaryKey: 'round',
    properties: {
        round: 'int',
        date: 'string',
        numbers: 'Number',
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

let realm = new Realm({
    schema: [NumberSchema, HistorySchema],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
});
export default realm;

export const getHistoryData = () => realm.objects('History').sorted('round', true);
export const addHistoryData = (data) => {
    realm.write(() => {
        realm.create('History', dataToModel(data));
    });
};
