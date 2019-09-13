import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';

import TableOfDatas from './components/TableOfDatas';
import Chart from './components/Chart';

import { getXlr8Token }from './services/Xlr8rmApi.jsx';

let response = getXlr8Token();

ReactDOM.render(

    <div className='col-md-12' style={{marginTop:'2%'}}>
        <div className='row' style={{height: '400px'}}>
            <div className='col-md-8' id='TableOfDatas' style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                <div className='row justify-content-between' style={{marginBottom:'5%', height:'60px'}}>
                    <div className='col align-self-start' style={{height: '40px', marginLeft: '90px'}}>
                        <h3>Hello {response.user.name}</h3>
                    </div>
                    <div className='col align-self-end' id='btn-save' style={{height: '40px'}}>
                        <button type="button" className="btn btn-secondary" id='save' style={{width:'70%', float: 'right', height:'65px', fontSize:'35px'}} disabled>Save Changes</button>
                    </div>
                </div>
                <TableOfDatas />
            </div>
            <div className='col-md-4' style={{textAlign: 'center'}}>
                <img src={response.user.avatar} alt={response.user.name} width="500px" height="300px"/>
            </div>
        </div>

        <Chart />
    </div>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
