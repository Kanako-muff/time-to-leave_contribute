// Electronアプリケーション内で通知を処理するためのモジュールです。
// このモジュールでは、メインプロセスとの間で通知情報を受け渡すためのIPC
// （Inter-Process Communication）を使用しています。


const { ipcRenderer } = require('electron');

const searchLeaveByElement = (event) =>
{
    const leaveByElement = $('#leave-by').val();
    event.sender.send('RECEIVE_LEAVE_BY', leaveByElement);
};

// Event handler to search for #leave-by element, not accesible through main process
ipcRenderer.on('GET_LEAVE_BY', searchLeaveByElement);

module.exports = {
    searchLeaveByElement
};