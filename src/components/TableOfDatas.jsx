import React, { Component } from 'react';
import { getXlr8Token, getXlr8Data, postXlr8Data }from '../services/Xlr8rmApi.jsx';
import './TableOfDatas.css';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';

let val1 = [];
let key1 = [];
let tdData1 = [];
let val2 = [];
let key2 = [];
let tdData2 = [];

export default class TableOfDatas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultOperation : [],
            operator: '',
            response: {},
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
            console.log('that');
            console.log(that.saveChanges());
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
                    <td> 
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
                    <td> 
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
                            <div className="col-md-12"  style={{ padding: 0, width: '80px'}}>
                                <div  className="col-sm-12 center-op only-op"  style={{display: 'inline-block', padding: '0', margin: '2px 0px 1px 2px'}}>
                                    <button type="button" className="btn btn-dark btn-op" style={{width: '100%'}} onClick={() => this.calcOperation(this.state.response.operation)}>Operation</button>
                                </div>
                            </div>
                            {this.state.resultOperation}
                        </tr>
                    </tbody>
                </table>
            );
		} else {

            let nullTd = []
            for (let index = 0; index < 8; index++) {
                
                nullTd.push(<td>null</td>)
                
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
                if (operator == '/') {
                    resulOp = resulOp.toFixed(2);
                }
            }
            fieldOperation.push(
                <td> 
                    <input  id={ix}
                            className="form-control" 
                            type='number' 
                            name={ix}
                            value={resulOp == Infinity? 0 : resulOp} 
                            disabled
                    />           
                </td>
            )
            
        }
    
        this.setState({resultOperation:fieldOperation});
    }

    saveChanges() {
        var obj1 = {};
        for (var i = 0;i < key1.length;i++){
            obj1[key1[i]] = val1[i];
        }

        var obj2 = {};
        for (var i = 0;i < key2.length;i++){
            obj2[key2[i]] = val2[i];
        }


        postXlr8Data(obj1,this.state.response.data[0].key);
        postXlr8Data(obj2,this.state.response.data[0].key);

    }

    onTodoChange(eventTarget){
        console.log('eventTarget');
        let confirm = 0;
        for (let ix = 0; ix < key1.length; ix++) {
            if (key1[ix] == eventTarget.id) {
                console.log('key: ' + key1[ix]);
                console.log('value: ' + val1[ix]);
                console.log('new value: ' + eventTarget.value);
                confirm = 1;
            };
        };
        if (!confirm) {
            for (let ix = 0; ix < key2.length; ix++) {
                if (key2[ix] == eventTarget.id) {
                    
                };
            };
        };
        console.log(eventTarget);
        console.log(eventTarget.id);
        console.log(eventTarget.value);
        // this.setState({
        //     val1: {'1a':value}
        // });
    }

}