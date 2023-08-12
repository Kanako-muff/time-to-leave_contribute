// アプリケーションの設定データを管理し、Renderer プロセスからの変更要求に応じてそれを反映させる役割を持ちます。

'use strict';
const { changeLanguage } = require('../src/configs/i18next.config');

const { app, ipcMain } = require('electron');

let savedPreferences = null;

function getSavedPreferences()
{
    return savedPreferences;
}

ipcMain.on('PREFERENCE_SAVE_DATA_NEEDED', (event, preferences) =>
{
    savedPreferences = preferences;
    app.setLoginItemSettings({
        openAtLogin: preferences['start-at-login']
    });
    changeLanguage(preferences.language).catch((err) =>
    {
        if (err) return console.log('something went wrong loading', err);
    });
});

module.exports = {
    getSavedPreferences
};