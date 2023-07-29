// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';

import analytics from '../lib/analytics';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';
import ScratchGUI from './render-gui.jsx';

import 'regenerator-runtime/runtime';
import CodeHelp from './containers/CodeHelp';

import codehelpReducer from './reducers/codehelp.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Register "base" page view
analytics.pageview('/');

let resonseData; // global

const root = document.createElement('div');
root.className = styles.root
document.body.appendChild(root)

const appTarget = document.createElement('div');
appTarget.className = styles.app;
root.appendChild(appTarget);

const sidebar = document.createElement('div')
root.appendChild(sidebar);
const store = createStore(codehelpReducer)

ReactDOM.render(
    <Provider store={store}>
        <CodeHelp/>
    </Provider>
    , 
    sidebar
);
// const button = document.createElement('button');
// button.innerHTML = 'Generate Code';
// button.className = styles.button;
// button.addEventListener('click', async () => {
//     try {
//         var fileContent = await readLinesFromFile();
//         var lines = fileContent.split("\n");
//         for (var i = 0; i < lines.length; i++) {
//             var line = lines[i];
//             console.log('line:', line)
//             await generateBlock(line, 400, (300 + i * 38));
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// });
// sidebar.appendChild(button);

// const button_prompt = document.createElement('button');
// button_prompt.innerHTML = "Voice Input";
// button_prompt.className = styles.button_prompt;
// sidebar.appendChild(button_prompt);
// button_prompt.addEventListener('click', () => {
//     var data = {
//         'prompt': '点击角色，使角色奔跑到舞台边缘，然后从场景1切换到场景2'
//     }
//     fetch('http://localhost:5000/chat_once', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => { return response.text(); })
//         .then(function (data) {
//             resonseData = data
//         })
//         .catch(error => {
//             console.error(error);
//         });
// })

if (supportedBrowser()) {
    // require needed here to avoid importing unsupported browser-crashing code
    // at the top level
    // require('./render-gui.jsx').default(appTarget);
    ScratchGUI(appTarget);

} else {
    BrowserModalComponent.setAppElement(appTarget);
    const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
    const handleBack = () => { };
    // eslint-disable-next-line react/jsx-no-bind
    ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
}
