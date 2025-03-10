// Electronアプリの設定情報と詳細情報を取得するためのJavaScriptモジュール
// アプリケーションの実行プラットフォームやバージョン情報などを管理し、
// 外部から呼び出すことでアプリケーションの設定や情報を取得できるようになっている。

'use strict';

const { app } = require('electron');
const path = require('path');
const os = require('os');

const macOS = process.platform === 'darwin';
const win32 = process.platform === 'win32';

const appPath = process.env.NODE_ENV === 'production'
    ? `${process.resourcesPath}/app`
    : path.join(__dirname, '..');

const appConfig = {
    macOS: macOS,
    win32: win32,
    appPath,
    iconpath: path.join(__dirname, win32 ? '../assets/ttl.ico' : '../assets/ttl.png'),
    trayIcon: path.join(__dirname, win32 ? '../assets/ttl.ico' : '../assets/ttl.png')
};

function getDetails()
{
    const version = app.getVersion();
    const electronVersion = process.versions.electron;
    const chromeVersion = process.versions.chrome;
    const nodeVersion = process.versions.node;
    const OSInfo = `${os.type()} ${os.arch()} ${os.release()}`;
    return `Version: ${version}\nElectron: ${electronVersion}\nChrome: ${chromeVersion}\nNode.js: ${nodeVersion}\nOS: ${OSInfo}`;
}

export {
    appConfig,
    getDetails
};