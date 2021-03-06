const electron = require('electron');

const { browserEvents, mainEvents } = require('../event-types');
const appMenu = require('./app-menu');
const appWindow = require('./app-window');
const fileDialog = require('./file-dialog');
const rollupWatcher = require('./rollup-watcher');

const { app, ipcMain } = electron;

app.setName('AST Explorer');

app.on('ready', async () => {
  const transformWatcher = rollupWatcher.create((sourceCode) => {
    appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
  });

  ipcMain.on(browserEvents.REDUX_ACTION_DISPATCHED, async (event, action) => {
    if (action && action.type === 'SELECT_TRANSFORMER') {
      const filePath = await fileDialog.openTransform(action.transformer.id);
      if (!filePath) return;
      const sourceCode = await transformWatcher.setFilePath(filePath);
      appWindow.sendEvent(mainEvents.SET_TRANSFORM_CODE, sourceCode);
      transformWatcher.start();
    }
  });

  await appMenu.create();
  await appWindow.create();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('will-quit', () => {
    transformWatcher.stop();
  });
});
