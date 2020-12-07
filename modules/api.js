import Axios from 'axios';
import cheerio from 'react-native-cheerio';

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
export const getLottoData = async (round) => {
    return await Axios.get('http://www.dhlottery.co.kr/common.do', {
        params: {
            method: 'getLottoNumber',
            drwNo: round,
        },
    });
};

// response가 html형식이므로 cheerio를 사용해 파싱
export const getAllLottoDatas = async () => {
    const result = [];
    await Axios.get('https://dhlottery.co.kr/gameResult.do', {
        params: {
            method: 'allWinExel',
            drwNoStart: 1,
            drwNoEnd: getCurrentRound(),
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
                round: parseInt($(tds[0]).text(), 10),
                date: $(tds[1]).text().replace(/\./gi, '-'),
                firstWinCnt: parseInt($(tds[2]).text(), 10),
                firstWinPrc: parseInt(
                    $(tds[3])
                        .text()
                        .replace(/[^0-9]/g, ''),
                    10
                ),
                secondWinCnt: parseInt($(tds[4]).text(), 10),
                secondWinPrc: parseInt(
                    $(tds[5])
                        .text()
                        .replace(/[^0-9]/g, ''),
                    10
                ),
                thirdWinCnt: parseInt($(tds[6]).text(), 10),
                thirdWinPrc: parseInt(
                    $(tds[7])
                        .text()
                        .replace(/[^0-9]/g, ''),
                    10
                ),
                fourthWinCnt: parseInt($(tds[8]).text(), 10),
                fourthWinPrc: parseInt(
                    $(tds[9])
                        .text()
                        .replace(/[^0-9]/g, ''),
                    10
                ),
                fifthWinCnt: parseInt($(tds[10]).text(), 10),
                fifthWinPrc: parseInt(
                    $(tds[11])
                        .text()
                        .replace(/[^0-9]/g, ''),
                    10
                ),
                no1: parseInt($(tds[12]).text(), 10),
                no2: parseInt($(tds[13]).text(), 10),
                no3: parseInt($(tds[14]).text(), 10),
                no4: parseInt($(tds[15]).text(), 10),
                no5: parseInt($(tds[16]).text(), 10),
                no6: parseInt($(tds[17]).text(), 10),
                bno: parseInt($(tds[18]).text(), 10),
            };
            result.push(rowData);
        });
    });
    return result;
};
