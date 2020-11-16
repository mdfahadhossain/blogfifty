import React from 'react';
import ReactDOM from 'react-dom';

import { unregister } from './serviceWorker';
import App from './App';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('BlogFifty'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
