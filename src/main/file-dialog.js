const { dialog } = require('electron');

const transformNamesById = {
  'babel-plugin-macros': 'Babel Macro',
  babel: 'Babel 5.x Plugin',
  babelv6: 'Babel 6.x Plugin',
  babelv7: 'Babel 7.x Plugin',
  'eslint-v1': 'ESLint 1.x Plugin',
  'eslint-v2': 'ESLint 2.x Plugin',
  'eslint-v3': 'ESLint 3.x Plugin',
  'eslint-v4': 'ESLint 4.x Plugin',
  jscodeshift: 'JSCodeshift Codemod',
  prettier: 'Prettier Config',
  tslint: 'TSLint Rule',
};

export const openTransform = (id) =>
  new Promise((done) => {
    const transformName = transformNamesById[id] || 'Transform';
    dialog.showOpenDialog(
      {
        buttonLabel: `Open ${transformName}`,
        filters: [{ extensions: ['js', 'ts'], name: 'JavaScript' }],
        message: `Open ${transformName}`,
        properties: ['openFile'],
      },
      (files) =>
        done(Array.isArray(files) && files.length === 1 ? files[0] : ''),
    );
  });
