// このモジュールは、アプリケーションの更新を管理するためのコードで、
// ユーザーに新しいバージョンの提供やリマインダーを表示するために使用されます。
// GitHub API を使用して最新のリリース情報を取得し、バージョンの比較を行っています。
// また、ユーザーの選択に従ってダウンロードなどのアクションを実行するためのコードも含まれています。


import { app, net, shell, dialog, BrowserWindow } from 'electron';
const isOnline = require('is-online');
import Store from 'electron-store';
import { getCurrentTranslation } from '../src/configs/i18next.config';
import { getDateStr } from './date-aux.js';

function shouldCheckForUpdates() {
  const store = new Store();
  const lastChecked = store.get('update-remind-me-after');
  const today = new Date();
  const todayDate = getDateStr(today);
  return !lastChecked || todayDate > lastChecked;
}

async function checkForUpdates(showUpToDateDialog) {
  const online = await isOnline();
  if (!online) {
    return;
  }

  const request = net.request('https://api.github.com/repos/thamara/time-to-leave/releases/latest');
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      const result = `${chunk}`;
      const re = new RegExp('.*(tag_name).*', 'g');
      const matches = result.matchAll(re);
      for (const match of matches) {
        const res = match[0].replace(/.*v.(\d+\.\d+\.\d+).*/g, '$1');
        if (app.getVersion() < res) {
          const options = {
            type: 'question',
            buttons: [
              getCurrentTranslation('$UpdateManager.dismissBtn'),
              getCurrentTranslation('$UpdateManager.downloadBtn'),
              getCurrentTranslation('$UpdateManager.remindBtn')
            ],
            defaultId: 1,
            title: getCurrentTranslation('$UpdateManager.title'),
            message: getCurrentTranslation('$UpdateManager.old-version-msg')
          };
          const response = dialog.showMessageBoxSync(BrowserWindow.getFocusedWindow(), options);
          if (response === 1) {
            // Download latest version
            shell.openExternal('https://github.com/thamara/time-to-leave/releases/latest');
          } else if (response === 2) {
            const store = new Store();
            // Remind me later
            const today = new Date();
            const todayDate = getDateStr(today);
            store.set('update-remind-me-after', todayDate);
          }
        } else if (showUpToDateDialog) {
          const options = {
            type: 'info',
            buttons: [getCurrentTranslation('$Menu.ok')],
            title: getCurrentTranslation('$UpdateManager.title'),
            message: getCurrentTranslation('$UpdateManager.upto-date-msg')
          };
          dialog.showMessageBox(null, options);
        }
      }
    });
  });
  request.end();
}

export { checkForUpdates, shouldCheckForUpdates };