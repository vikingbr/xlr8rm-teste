import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getXlr8Data } from '../services/Xlr8rmApi.jsx';
import { Bar } from 'react-chartjs-2';

var val1 = [];
var key1 = [];
var val2 = [];
var key2 = [];

export default class Chart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chartData: {},
			maxValue: '',
			minValue: '',
			averageValue: '',
			data1: [],
			data: [],
			dataValues: [],
			responseData: [],
		}
	}

	static defaultProps = {
		legendPosition: 'right',
	}

	getValueInHash() {

		let k, k2;
		for (k of Object.keys(this.state.data1)) {
			key1.push(k);
			val1.push(this.state.data1[k]);
		}

		for (k2 of Object.keys(this.state.data2)) {
			key2.push(k2);
			val2.push(this.state.data2[k2]);
		}

	}

	componentWillMount() {
		this.setState({ responseData: getXlr8Data().data });
	}

	componentDidMount() {
		if (this.state.responseData.length > 0) {
			this.setState({ data1: this.state.responseData[0].data });
			this.setState({ data2: this.state.responseData[1].data });
			setTimeout(function () {
				this.getValueInHash();
				this.getChartData();
			}.bind(this), 1)
		}
	}

	getChartData() {

		this.setState({ dataValues: val1.concat(val2).map(v => parseInt(v, 10)) })

		if (this.state.dataValues.length > 0) {
			let dataLabel = []
			this.state.dataValues.forEach(() => dataLabel.push(''));

			this.setState({ maxValue: Math.max(...this.state.dataValues) });
			this.setState({ minValue: Math.min(...this.state.dataValues) });
			this.setState({ averageValue: (this.state.dataValues.reduce((a, b) => (a + b)) / this.state.dataValues.length) });

			this.setState({
				chartData: {
					labels: dataLabel,
					datasets: [
						{
							label: 'Value',
							data: this.state.dataValues,
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
	}

	render() {
		return (
			<div className="container chart" style={{ height: '100%', width: '100%' }}>

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
						<div className='col-md-4' style={{ display: 'flex' }}>
							<div style={{ alignSelf: 'center' }}>
								<span>Max Value is <strong>{this.state.maxValue}</strong></span>
								<br />
								<span>Min Value is <strong>{this.state.minValue}</strong></span>
								<br />
								<span>Average Value is <strong>{this.state.averageValue}</strong></span>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}