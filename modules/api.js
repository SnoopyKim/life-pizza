import Axios from 'axios';
import cheerio from 'react-native-cheerio';
import { addHistoryData } from '../db';
import { stringToNumberWithoutCommas } from '../utils/number';

const WEEK_MILLISECOND = 1000 * 60 * 60 * 24 * 7;
const UPDATE_TIME = 'T21:00:00';
const FIRST_ROUND_TIME = '2002-12-07' + UPDATE_TIME;

// 날짜 비교를 통한 최신 회차 계산
export const getCurrentRound = () => {
    const now = new Date();
    const first = new Date(FIRST_ROUND_TIME);
    const diffWeek = new Date(now - first).getTime() / WEEK_MILLISECOND + 1;

    return Math.floor(diffWeek);
};

// 한 회차 결과 쿼리
export const getLottoDataFromApi = async (round) => {
    return await Axios.get('http://www.dhlottery.co.kr/common.do', {
        params: {
            method: 'getLottoNumber',
            drwNo: round,
        },
    });
};

// response가 html형식이므로 cheerio를 사용해 파싱
export const getLottoDatasFromApi = async (startRound = 1, endRound = getCurrentRound()) => {
    const result = [];
    await Axios.get('https://dhlottery.co.kr/gameResult.do', {
        params: {
            method: 'allWinExel',
            drwNoStart: startRound,
            drwNoEnd: endRound,
        },
        responseType: 'text',
    }).then((response) => {
        const $ = cheerio.load(response.data);
        const rows = $('tr').slice(3);
        rows.each((idx, row) => {
            const tds = $(row).find('td');
            if ($(tds[0]).attr('rowspan')) {
                tds.splice(0, 1);
            }
            const rowData = {
                round: stringToNumberWithoutCommas($(tds[0]).text()),
                date: $(tds[1]).text().replace(/\./gi, '-'),
                firstWinCnt: stringToNumberWithoutCommas($(tds[2]).text()),
                firstWinPrc: stringToNumberWithoutCommas($(tds[3]).text()),
                secondWinCnt: stringToNumberWithoutCommas($(tds[4]).text()),
                secondWinPrc: stringToNumberWithoutCommas($(tds[5]).text()),
                thirdWinCnt: stringToNumberWithoutCommas($(tds[6]).text()),
                thirdWinPrc: stringToNumberWithoutCommas($(tds[7]).text()),
                fourthWinCnt: stringToNumberWithoutCommas($(tds[8]).text()),
                fourthWinPrc: stringToNumberWithoutCommas($(tds[9]).text()),
                fifthWinCnt: stringToNumberWithoutCommas($(tds[10]).text()),
                fifthWinPrc: stringToNumberWithoutCommas($(tds[11]).text()),
                no1: stringToNumberWithoutCommas($(tds[12]).text()),
                no2: stringToNumberWithoutCommas($(tds[13]).text()),
                no3: stringToNumberWithoutCommas($(tds[14]).text()),
                no4: stringToNumberWithoutCommas($(tds[15]).text()),
                no5: stringToNumberWithoutCommas($(tds[16]).text()),
                no6: stringToNumberWithoutCommas($(tds[17]).text()),
                bno: stringToNumberWithoutCommas($(tds[18]).text()),
            };
            result.push(rowData);
            addHistoryData(rowData);
        });
    });
    return result;
};
