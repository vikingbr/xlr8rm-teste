import React, { Component } from 'react';
import { getXlr8Token, getXlr8Data }from '../services/Xlr8rmApi.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class TableOfDatas extends Component {
    constructor() {
        super();
    }

    render() {
        
        let responseData = getXlr8Data(getXlr8Token());
        
		if (responseData && responseData[0]){
            let data1 = responseData[0].data
            let data2 = responseData[1].data

            let k,k2;
            let val1 = []; 
            let val2 = [];
            let resultOperation = [];

            for (k of Object.keys(data1)) {
                val1.push(
                    <td> 
                        <input  id={k}
                                className="form-control" 
                                type='number' 
                                name={k} 
                                defaultValue={data1[k]} 
                                onChange={e => this.onTodoChange(e.target.value)}   
                        />           
                    </td>
                )
            }

            for (k2 of Object.keys(data2)) {
                val2.push(
                    <td> 
                        <input  id={k2}
                                className="form-control" 
                                type='number' 
                                name={k2} 
                                defaultValue={data2[k2]} 
                                onChange={e => this.onTodoChange(e.target.value)}   
                        />           
                    </td>
                )
            }

            for (let ix = 0; ix < val1.length; ix++) {
                resultOperation.push(
                    <td> 
                        <input  id={ix}
                                className="form-control" 
                                type='number' 
                                name={ix} 
                                disabled
                        />           
                    </td>
                )
                
            }
            return (
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Data1</th>
                            {val1}
                        </tr>
                        <tr>
                            <th scope="row">Data2</th>
                            {val2}
                        </tr>
                        <tr>
                            <th scope="row">Operation</th>
                            {resultOperation}
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

    calculete(){
        
    }

    onTodoChange(value){
        console.log('value: ' + value);
        // this.setState({
        //     val1: {'1a':value}
        // });
    }

}