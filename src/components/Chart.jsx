import React, { Component } from 'react';
import { getXlr8Token, getXlr8Data } from '../services/Xlr8rmApi.jsx';
import $ from 'jquery';

import {Bar} from 'react-chartjs-2';

import 'bootstrap/dist/css/bootstrap.min.css';

var val1 = [];
var key1 = [];
var val2 = [];
var key2 = [];

var data1 = [];
var data2 = [];

var dataValues = [];

var responseData = [];

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
			chartData: {},
			maxValue: '',
			minValue: '',
			averageValue: '',
		}
    }

    static defaultProps = {
        legendPosition: 'right',
	}
	
	getValueInHash() {

		let k,k2;
		for (k of Object.keys(data1)) {
			key1.push(k);
			val1.push(data1[k]);
		}

		for (k2 of Object.keys(data2)) {
			key2.push(k2);
			val2.push(data2[k2]);
		}

	}

	componentWillMount() {

		responseData = getXlr8Data().data;

		data1 = responseData[0].data;
		data2 = responseData[1].data;

		this.getValueInHash();

		this.getChartData();

	}

	getChartData() {

		dataValues = val1.concat(val2).map(v => parseInt(v, 10));
		let dataLabel = []
		dataValues.forEach(()=> dataLabel.push(''));

		this.setState({maxValue:Math.max(...dataValues)});
		this.setState({minValue:Math.min(...dataValues)});
		this.setState({averageValue:(dataValues.reduce((a,b) => (a+b)) / dataValues.length)});

		this.setState({
			chartData: {
				labels: dataLabel,
				datasets: [
					{
						label: 'Value',
						data: dataValues,
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(255, 99, 132, 0.6)'
						]
					}
				]
			}
		});
	}

    render() {
        return (
            <div className="container chart" style={{height:'100%', width:'100%'}}>

				<div className='col-md-12'>
					<div className='row'>
						<div className='col-md-8'>
							<Bar
								data={this.state.chartData}
								options={{
									title: {
										display: this.props.displayTitle,
										text: 'Largest Cities In ' + this.props.location,
										fontSize: 25
									},
									legend: {
										display: this.props.displayLegend,
										position: 'bottom'
									}
								}}
							/>
						</div>
						<div className='col-md-4' style={{display: 'flex'}}>                                            
							<div style={{alignSelf: 'center'}}>                                            
								<span>Max Value is <strong>{this.state.maxValue}</strong></span>
								<br/>
								<span>Min Value is <strong>{this.state.minValue}</strong></span>
								<br/>
								<span>Average Value is <strong>{this.state.averageValue}</strong></span>
							</div>
						</div>
					</div>
				</div>
					
			</div>
        )
    }
}