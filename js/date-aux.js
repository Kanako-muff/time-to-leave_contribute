// JavaScriptモジュールで日付と時刻に関する補助関数を提供している


'use strict';

/*
 * Given a JS Date, return the string in the format YYYY-MM-DD.
 */
// 引数として与えられたJS Dateオブジェクトを基に、"YYYY-MM-DD"形式の文字列を返す関数。
// 与えられた日付のタイムゾーンオフセットを考慮して、ISO 8601形式の文字列に変換する。
function getDateStr(date)
{
    try
    {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    }
    catch (err)
    {
        return new Error(err);
    }
}

/*
 * Given a a year and month, returns how many days the month has
 */
// 年と月の引数を受け取り、その月が何日あるかを返す関数。
// 渡された年と次の月の0日目（現在の月の最終日）の日付を生成し、日付の値を取得している。
function getMonthLength(year, month)
{
    const d = new Date(year, month+1, 0);
    return d.getDate();
}

/*
 * Returns the current datetime string in the format YYYY_MM_DD_HH_MM_SS.
 */
// 現在の日時を"YYYY_MM_DD_HH_MM_SS"形式の文字列で返す関数。
// 現在の日付と時刻を取得し、toLocaleTimeStringを使用して時刻の文字列を生成する。
// その後、getDateStr関数と組み合わせて整形する。
function getCurrentDateTimeStr()
{
    const date = new Date();
    const reg = /[-:]/g;
    const currentTimeStr = date.toLocaleTimeString([], {hour: '2-digit', hourCycle: 'h23', minute:'2-digit', second:'2-digit'}).substr(0, 8);
    try
    {
        return `${getDateStr(date)}_${currentTimeStr}`.replace(reg,'_');
    }
    catch (err)
    {
        return new Error(err);
    }
}

export {
    getDateStr, getMonthLength, getCurrentDateTimeStr
};
