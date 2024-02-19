import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import CountryCard from './components/CountryCard'
import NextDestination from './components/NextDestination'
import * as React from 'react'
import Map, { NavigationControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'

// const env = require("dotenv");

// env.config();

function App() {

  fetch

  return (
    <div>

      <Map
        //mapboxAccessToken={process.env.TRAVEL_APP_TOKEN}
        container={'map'}
        projection={'globe'}
        initialViewState={{}}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken='pk.eyJ1Ijoic3Zhc3Rpa3MiLCJhIjoiY2xzcXNzdGZrMGo4OTJpczN2bDlhYXFkZyJ9.UClNePM0ExbrQx0qBCQPMw'
        mapStyle="mapbox://styles/svastiks/clsqsyb7w04n501p22qi16i7o"
      >

        <NavigationControl></NavigationControl>

      </Map>



      {/* <Header />

      <Body />

      <CountryCard />

      <NextDestination /> */}

    </div >
  );
}

export default App;
