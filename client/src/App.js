import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import CountryCard from './components/CountryCard'
import NextDestination from './components/NextDestination'
import * as React from 'react'
import Map, { NavigationControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'

import PushPinIcon from '@mui/icons-material/PushPin';

// const env = require("dotenv");

// env.config();

function App() {

  const [pins, setPins] = React.useState([]);

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        console.log(response);
        setPins(response.data);
      }
      catch (err) {
        console.log(err);
      }
    }

    getPins();
  }, [])

  fetch().then()

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

        <NavigationControl />

        <PushPinIcon />

      </Map>



      {/* <Header />

      <Body />

      <CountryCard />

      <NextDestination /> */}

    </div >
  );
}

export default App;
