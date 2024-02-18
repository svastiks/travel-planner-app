import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import CountryCard from './components/CountryCard'
import NextDestination from './components/NextDestination'
import * as React from 'react'
import Map from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"

// const env = require("dotenv");

// env.config();

function App() {
  return (
    <div>

      <Map
        initialViewState={{}}
        //mapboxAccessToken={process.env.TRAVEL_APP_TOKEN}
        mapboxAccessToken='pk.eyJ1Ijoic3Zhc3Rpa3MiLCJhIjoiY2xzcXNzdGZrMGo4OTJpczN2bDlhYXFkZyJ9.UClNePM0ExbrQx0qBCQPMw'
        mapStyle="mapbox://styles/svastiks/clsqsyb7w04n501p22qi16i7o"
      >

      </Map>

      {/* <Header />

      <Body />

      <CountryCard />

      <NextDestination /> */}

    </div >
  );
}

export default App;
