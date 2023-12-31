import React, { Component } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Cloud, WbSunny, Thunderstor, AcUnit } from "@mui/icons-material";
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      desc: "",
      icon: "",
      loading: true,
    };
  }

  componentDidMount() {
    const cityName = "Incheon";
    const apiKey = process.env.REACT_APP_Weather;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios
      .get(url)
      .then((responseData) => {
        console.log(responseData);
        const data = responseData.data;
        this.setState({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const img_url =
      "http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png";
    if (this.state.loading) {
      return <p>Loading</p>;
    } else {
      return (
        <div>
          <div>
            <img
              src={img_url}
              alt="Weather Icon"
              style={{
                width: "130px",
                height: "130px",
                marginBottom: "-10%",
              }}
            />
            <h1>{(this.state.temp - 273.15).toFixed(0)}°C</h1>
            <h3>{this.state.desc}</h3>
          </div>
          <div>
            <h4>
              최고: {(this.state.temp_max - 273.15).toFixed(0)}°C / 최저:{" "}
              {(this.state.temp_min - 273.15).toFixed(0)}°
            </h4>
          </div>
          <div>
            <span style={{ marginTop: "7px", marginRight: "8px" }}>
              <h4>현재 습도 : {this.state.humidity}%</h4>
            </span>
          </div>
        </div>
      );
    }
  }
}

export default Weather;
