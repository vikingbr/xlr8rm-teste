import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableOfDatas from './components/TableOfDatas';

class App extends Component {

	constructor() {
		super();
		this.state = {
			responseToken: [],
			responseData: [],
		}
	}

	getXlr8Token() {
		$.ajax({
			url:'https://cors-anywhere.herokuapp.com/'+'https://test.xlr8rms.com/access-token',
			async:true,
			dataType: 'json',
			success:function(response){
				this.setState({responseToken:response});
				this.getXlr8Data();
				return true;
			}.bind(this)
		});
		return false;
	}

	getXlr8Data() {
		$.ajax({
			url:'https://cors-anywhere.herokuapp.com/'+'https://test.xlr8rms.com/get-data?accessToken='+ this.state.responseToken.accessToken,
			async:true,
			dataType: 'json',
			success:function(response){
				console.log('GET DATA');
				console.log(response.data);
				this.setState({responseData:response.data});
			}.bind(this)
		});
		return false;
	}

	postXlr8Data() {
		$.ajax({
			url:'https://cors-anywhere.herokuapp.com/'+'https://test.xlr8rms.com/get-data?accessToken='+ this.state.responseToken.accessToken,
			async:true,
			type: 'post',
			data: {

			},
		}).done(() => {
			console.log('Succsess');
		})
	}


	componentWillMount() {
		this.getXlr8Token();
	}

	render() {


		if (this.state.responseData[0] && this.state.responseData[0].key){
			// this.state.responseData[1].data
			console.log('typeof this.state.responseData.data 2');
			// console.log(this.state.responseData[0].data['1a']);
			console.log(this.state.responseData[0].data);
			console.log(this.state.responseData[1].data);
		}
	
		return (
			<div className="App">
				{/* {
					this.state.responseData.map(res => <div>{res.key}</div>)
				} */}

				<br/>
				<br/>
				<br/>
				<div class='container'>
					<TableOfDatas responseData={this.state.responseData}/>
				</div>
			
			</div>
		);
	}
}

export default App;
