import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableOfDatas from './components/TableOfDatas';
import Chart from './components/Chart';


ReactDOM.render(

    <div className='col-md-12' style={{marginTop:'2%'}}>
        <TableOfDatas />
        <Chart />
    </div>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
