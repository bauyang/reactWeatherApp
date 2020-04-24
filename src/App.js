import React from 'react';
import './App.css';
import {Component} from 'react';
import Moment from 'moment';
import 'moment-timezone';
import zipToTz from'zipcode-to-timezone';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap dist/js/bootstream.js';


class App extends Component {
  state = {  
    input: '',
    apikey: '549800580d6025f13c9688f4be033ff6',
    city: '',
    weather:'',
    temperature:'',
    time:'',
    date:'',
    show: false,
    option: 'imperial',
    degree: '°F'
  }

  myClick =() => {
    let zipInput = document.getElementById('input').value;
    this.setState({
      input: zipInput,
      show: true,
    })
    setTimeout(()=> {
      this.getWeather();
      this.getTimezone();
    }, 100);
  } 

  myKeyPress =(keypress) => {
    if (keypress.keyCode == 13){
      this.myClick()
    }
  }

  optionChange =(event) =>{
    this.setState({
      option: event.target.value ,
    })
    setTimeout(()=> {
      if (this.state.option == 'imperial'){
        this.setState({
          degree: '°F'
      })
    } else {
      this.setState({
        degree: '°C'
      })
    }
    }, 100)
    

    this.myClick();
  }

  getWeather = () => {
     fetch('https://api.openweathermap.org/data/2.5/weather?zip='+this.state.input+',us&units='+this.state.option+'&appid='+this.state.apikey)
     .then((result) => {
        return result.json();
     })
     .then((result) => {
        console.log(result);

        this.setState({
          city: result.name,
          weather: result.weather[0].main,
          temperature: Math.round(result.main.temp),
     })
    })
  }

  getTimezone=() => {
    let zipName = zipToTz.lookup(this.state.input)
    let timeNow = Moment().tz(zipName).format('dddd, MMMM Do YYYY,hh:mm:ss a');
    
      this.setState({
        time: timeNow, 
      })
  }

  render() { 
    return (
      <>
      <div>
        <h1> U.S.A Weather App</h1>
        <input id ={"input"} type= "text" placeholder="Enter Zip" onKeyUp ={(keypress) =>{this.myKeyPress(keypress)}} />
        <button id ={"inputBtn"} onClick={()=>{this.myClick()}}>Submit</button>
      </div>

  <div>
    
        <div>
          <label>
            <input
              type="radio"
              value="imperial"
              checked={this.state.option === "imperial"}
              onChange={this.optionChange}
            />
            Fahrenheit (°F)
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="radio"
              value="metric"
              checked={this.state.option === "metric"}
              onChange={this.optionChange}
            />
            Celsius (°C)
          </label>
        </div>
      
    </div>

      <div style = {{ display: (this.state.show ? "block" : "none")}}>
          <h4>
          City: {this.state.city}<br></br>
          Time: {this.state.time}<br></br>
          Weather is {this.state.weather} <br></br>
          with a temperature of {this.state.temperature} {this.state.degree}<br></br>
          </h4>
      </div>
    </>  
    );
  }
}
 

export default App;
