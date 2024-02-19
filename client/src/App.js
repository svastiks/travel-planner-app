import './App.css';
import * as React from 'react'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'
import { timeago } from 'timeago.js'

import PushPinIcon from '@mui/icons-material/PushPin';

import StarIcon from '@mui/icons-material/Star';

import LogoutIcon from '@mui/icons-material/Logout';

function App() {

  const [pins, setPins] = React.useState([]);

  const [newPlace, setNewPlace] = React.useState(null);

  const [title, setTitle] = React.useState(null);
  const [descr, setDescription] = React.useState(null);
  const [rating, setRating] = React.useState(1);

  const [currentUser, setCurrentUser] = React.useState(null);

  const [showLogin, setShowLogin] = React.useState(false);

  const [showRegister, setShowRegister] = React.useState(false);


  const [viewPort, setViewPort] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14
  })

  const [currenrPlaceId, setCurrentPlaceId] = React.useState(null);

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat
    let lon = e.lngLat.lng

    setNewPlace({
      lat: lat,
      lng: lon
    })
  }

  const handleMarkerClicked = (id, lat, long) => {
    console.log(lat);
    console.log(long);
    setCurrentPlaceId(id);
  }

  const handlePinSubmit = () => {

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
        onDblClick={handleAddClick}
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

              {
                newPlace &&
                <Popup
                  longitude={newPlace.lng}
                  latitude={newPlace.lat}
                  closeOnClick={false}
                  closeOnMove={false}
                  onClose={() => setNewPlace(null)}
                  anchor="left"
                >

                  <div>
                    <form onSubmit={handlePinSubmit}>
                      <label>Title</label>
                      <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>

                      <label>Review</label>
                      <textarea placeholder='Why do you like this location?' onChange={(e) => setDescription(e.target.value)}></textarea>

                      <label>Rating</label>
                      <select onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                      </select>

                      <button className='submitButton' type='submit'>Add a pin here!</button>

                    </form>
                  </div>

                </Popup>
              }

            </>
          ))
        }

      </Map>

      <div className='footer'>

        <div className='footer_down'>

          {
            currentUser ? (<button className='button_logout'>Logout</button>)
              :
              (
                <div>

                  <button className='button_login' onClick={() => { setShowLogin(true) }}>
                    Login
                  </button>

                  <button className='button_logout' onClick={() => { setShowRegister(true) }}>
                    Logout
                  </button>

                </div>
              )
          }

        </div>

      </div>

      {showRegister && <Register />}
      {showLogin && <Login />}

    </div>


  );
}

export default App;
