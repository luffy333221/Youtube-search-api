import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Youtube from './youtube';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Youtube />, document.getElementById('root'));
registerServiceWorker();
