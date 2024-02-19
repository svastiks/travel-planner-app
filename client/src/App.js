import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import CountryCard from './components/CountryCard'
import NextDestination from './components/NextDestination'
import * as React from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'
import { timeago } from 'timeago.js'

import PushPinIcon from '@mui/icons-material/PushPin';

import StarIcon from '@mui/icons-material/Star';

// const env = require("dotenv");

// env.config();

function App() {

  const [pins, setPins] = React.useState([]);
  const [viewPort, setViewPort] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14
  })

  const [currenrPlaceId, setCurrentPlaceId] = React.useState(null);

  const handleMarkerClicked = (id, lat, long) => {
    console.log(lat);
    console.log(long);
    setCurrentPlaceId(id);
  }

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
        initialViewState={{ viewPort }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken='pk.eyJ1Ijoic3Zhc3Rpa3MiLCJhIjoiY2xzcXNzdGZrMGo4OTJpczN2bDlhYXFkZyJ9.UClNePM0ExbrQx0qBCQPMw'
        mapStyle="mapbox://styles/svastiks/clsqsyb7w04n501p22qi16i7o"
      >

        <NavigationControl />

        {
          pins.map(pin => (
            <>

              <Marker
                longitude={pin.longitude}
                latitude={pin.latitude}
                anchor="center"
              >

                <PushPinIcon
                  className='icon'
                  onClick={() => handleMarkerClicked(pin.id, pin.latitude, pin.longitude)}
                  style={{ fontSize: viewPort * 2, color: "blue" }}
                />

              </Marker>

              {

                pin.id === currenrPlaceId && (

                  <Popup
                    longitude={pin.longitude}
                    latitude={pin.latitude}
                    closeOnClick={false}
                    closeOnMove={false}
                    anchor="left"
                  >

                    <div className='card'>
                      <label>Place</label>
                      <h4 className='place'>{pin.title}</h4>
                      <label>Review</label>
                      <p className='description'>{pin.descr}</p>
                      <div className='stars'>
                        {Array(pin.rating).fill(<StarIcon className='star' />)}
                      </div>

                      <label>Information</label>

                      <div className='info'>

                        <span className='username'>Created by {pin.username}</span>
                        <span className='date'>{timeago(pin.createdAt)}</span>
                      </div>

                    </div>

                  </Popup>

                )

              }

            </>
          ))
        }

      </Map>



      {/* <Header />

      <Body />

      <CountryCard />

      <NextDestination /> */}

    </div >
  );
}

export default App;
