import React, { Component } from 'react';
import { getXlr8Token, getXlr8Data } from '../services/Xlr8rmApi.jsx';
import $ from 'jquery';

import {Bar} from 'react-chartjs-2';

import 'bootstrap/dist/css/bootstrap.min.css';



// const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             data: [65, 59, 80, 81, 56, 55, 40]
//         }
//     ]
// };

let val1 = [];
let key1 = [];
let val2 = [];
let key2 = [];

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {}
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'Massachussssssetts'
    }

	componentWillMount() {
		this.getChartData();
	}

	getChartData() {
		// Ajax calls here
		this.setState({
			chartData: {
				labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
				datasets: [
					{
						label: 'Population',
						data: [
							617594,
							181045,
							153060,
							106519,
							105162,
							95072
						],
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)'
						]
					}
				]
			}
		});
	}

    render() {
        return (
            <div className="chart">
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
        )
    }
}