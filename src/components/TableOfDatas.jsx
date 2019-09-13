/* eslint no-eval: 0 */

import React, { Component } from 'react';
import { getXlr8Token, getXlr8Data, postXlr8Data }from '../services/Xlr8rmApi.jsx';
import './TableOfDatas.css';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import { setTimeout } from 'timers';

let val1 = [];
let key1 = [];
let tdData1 = [];
let val2 = [];
let key2 = [];
let tdData2 = [];
let requestStatus = '';

export default class TableOfDatas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultOperation : [],
            operator: '',
            response: {},
            requestStatus: '',
        };
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        this.calcOperation('');

        this.setState({response:(getXlr8Data(getXlr8Token().accessToken))});
    }

    render() {
        let that = this;
        $("[id^='save'" ).on('click', function(e){
            that.saveChanges();
        });

        let responseData = this.state.response.data;
        
		if (responseData && responseData[0]) {
            let data1 = responseData[0].data;
            let data2 = responseData[1].data;

            let k,k2;
            tdData1 = [];
            for (k of Object.keys(data1)) {
                key1.push(k);
                val1.push(data1[k]);
                tdData1.push(
                    <td key={k}> 
                        <input  id={k}
                                className="form-control" 
                                type='number' 
                                name={k} 
                                defaultValue={data1[k]} 
                                onChange={e => this.onTodoChange(e.target)}   
                        />           
                    </td>
                );
            }

            tdData2 = [];
            for (k2 of Object.keys(data2)) {
                key2.push(k2);
                val2.push(data2[k2]);
                tdData2.push(
                    <td key={k2}> 
                        <input  id={k2}
                                className="form-control" 
                                type='number' 
                                name={k2} 
                                defaultValue={data2[k2]} 
                                onChange={e => this.onTodoChange(e.target)}   
                        />           
                    </td>
                );
            }

            return (
                <div>
                    <div className="container">
                        <span>{this.state.requestStatus}</span>
                    </div>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row" style={{color: '#7c7c7c'}}>Data1</th>
                                {tdData1}
                            </tr>
                            <tr style={{borderBottom: '10px solid #e5e5e7'}}>
                                <th scope="row" style={{color: '#7c7c7c'}}>Data2</th>
                                {tdData2}
                            </tr>
                            <tr>
                                <td>
                                    <div className="col-md-12"  style={{ padding: '0', width: '80px'}}>
                                        <div  className="col-sm-12 center-op only-op"  style={{display: 'inline-block', padding: '0', margin: '2px 0px 1px 2px'}}>
                                            <button type="button" className="btn btn-dark btn-op" style={{width: '100%'}} onClick={() => this.calcOperation(this.state.response.operation)}>Operation</button>
                                        </div>
                                    </div>
                                </td>
                                {this.state.resultOperation}
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
		} else {

            let nullTd = []
            for (let index = 0; index < 8; index++) {
                nullTd.push(<td key={index}>null</td>)
            }

            return (
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Data1</th>
                            {nullTd}
                        </tr>
                        <tr>
                            <th scope="row">Data2</th>
                            {nullTd}
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

    calcOperation(operator='') {
        var fieldOperation = [];
        var resulOp = '';
        var varLen = (tdData1.length > 0? tdData1.length: 8);
        for (let ix = 0; ix < varLen; ix++) {
            if (operator) {
                resulOp = eval((val1[ix] + (operator) + val2[ix]));
                if (operator === '/') {
                    resulOp = resulOp.toFixed(2);
                }
            }
            fieldOperation.push(
                <td key={ix}> 
                    <input  id={ix}
                            className="form-control" 
                            type='number' 
                            name={ix}
                            value={resulOp === Infinity? 0 : resulOp} 
                            disabled
                    />           
                </td>
            )
            
        }
    
        this.setState({resultOperation:fieldOperation});
    }

    saveChanges() {
        var obj1 = {};
        for (let i = 0;i < key1.length;i++){
            obj1[key1[i]] = val1[i];
        }

        var obj2 = {};
        for (let i = 0;i < key2.length;i++){
            obj2[key2[i]] = val2[i];
        }


        var postData1 = postXlr8Data(obj1,getXlr8Token().accessToken);
        var postData2 = postXlr8Data(obj2,getXlr8Token().accessToken);

        if ((postData1 === 200) && (postData2 === 200)) {
            requestStatus = <div className="alert alert-success" id='alert-msg' style={{display:'none'}} role="alert">
                Data1 & Data2 have been saved!
            </div>;
        } else if((postData1 === 400) || (postData2 === 400)) {
            requestStatus = <div className="alert alert-danger" id='alert-msg' style={{display:'none'}} role="alert">
                Bad Request! No authorized! Have a error in parameters of Data1 or Data2, check this!
            </div>;
        } else if((postData1 === 500) || (postData2 === 500)) {
            requestStatus = <div className="alert alert-danger" id='alert-msg' style={{display:'none'}} role="alert">
                Fatal Error!! Have a error in route of request!
            </div>;
        }
        this.setState({requestStatus:requestStatus});
        $('#alert-msg').fadeToggle(2000);
        setTimeout(() => {
            $('#alert-msg').fadeToggle(2000);
        }, 5000);

    }

    onTodoChange(eventTarget){
        console.log('eventTarget');
        $("[id^='save'" )[0].removeAttribute('disabled')
        console.log(eventTarget);
        console.log(eventTarget.id);
        console.log(eventTarget.value);
    }

}