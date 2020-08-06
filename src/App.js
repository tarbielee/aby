import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
  }

  state = {
    listOfCountries: [],
    results: 0
  }

  async componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();

    const listOfCountries = data.Countries.map((value) => {
      return value.Country
    })

    this.setState({
      listOfCountries
    })
  }

  async getData(e) {
    const url = `https://api.covid19api.com/total/dayone/country/${e.target.value}`;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      results: data[data.length - 1]
    }) 
  }


  renderCountryOptions() {
    return this.state.listOfCountries.map((country, i) => {
      return <option key={i}>{country}</option>
    })
  }


  render() {
    return ( <div className="container">  
          <h1>Corona Virus Updates</h1>
            
            <select onChange={this.getData}>
              <option>Select Country</option>
              {this.renderCountryOptions()}
            </select>

            <div className="flex">

          <header className="header">
            <h1>{this.state.results.Country}</h1>
            <p>{this.state.results.Date}</p>
          </header>
            
          <section className="box TotalConfirmed">
            <h3>TotalConfirmed</h3>
            <h4>1162857</h4>
            <div className="bigNumber one">{this.state.results.TotalConfirmed}</div>
          </section>

          <section className="box TotalDeaths">
            <h3>TotalDeaths</h3>
            <h4>63263</h4>
            <div className="bigNumber two"> {this.state.results.TotalDeaths}</div>
          </section>

          <section className="box TotalRecovered">
            <h3>TotalRecovered</h3>
            <h4>2308450</h4>
            <div className="TotalRecovered"> {this.state.resultsTotalRecovered}</div>
          </section>
          </div>
      </div>
    );
  }
}