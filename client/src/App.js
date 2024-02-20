import './App.css';
import * as React from 'react'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'
import { format } from 'timeago.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PushPinIcon from '@mui/icons-material/PushPin';

import StarIcon from '@mui/icons-material/Star';

import LogoutIcon from '@mui/icons-material/Logout';

const pinSuccess = () => {
  toast.success("Pin was successfully added!");
}

const userNotLoggedIn = () => {
  toast.warning("Please log in to add and save pins!");
}

const loggedOut = (user) => {
  toast.warning(user + "has successfully logged out!");
}

const pinNotAdded = () => {
  toast.error("Pin could not be added! Please fill out all the fields!");
}

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

  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat
    let lon = e.lngLat.lng

    setNewPlace({
      lat: lat,
      lng: lon,
    })
  }

  const handleMarkerClicked = (id, lat, long) => {

    setCurrentPlaceId(id);
  }

  const handleLogout = () => {
    loggedOut(currentUser);
    setCurrentUser(null);
  }

  const handlePinSubmit = async (e) => {

    e.preventDefault();

    const newPin = {

      userName: currentUser,
      title: title,
      rating: rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng,
      descr: descr
    }

    //console.log(newPin)

    try {

      if (!currentUser) {
        //console.log(currentUser)
        userNotLoggedIn();
      }
      else {

        const res = await axios.post("/locations", newPin);
        //console.log(res);
        setPins([...pins, res.data]);
        setNewPlace(null)

        pinSuccess();

        //Reset
        setRating(1);
        setDescription(null);
        setTitle(null);

        //console.log(res);
      }

    } catch (err) {
      pinNotAdded();
      console.log(err);
    }

  }

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/locations");
        //console.log(response);
        setPins(response.data);
      }
      catch (err) {
        console.log(err);
      }
    }

    getPins();
  }, [])

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

        <ToastContainer
          position='top-left'
          theme='dark'
        />

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
                  onClick={() => handleMarkerClicked(pin._id, pin.latitude, pin.longitude)}
                  style={{ fontSize: viewPort * 2, color: pin.userName === currentUser ? "slateblue" : "red" }}
                />

              </Marker>

              {

                pin._id === currentPlaceId && (

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

                        <span className='username'>Created by {pin.userName}</span>
                        <span className='date'>{format(pin.createdAt)}</span>
                      </div>

                    </div>

                  </Popup>
                )}
            </>
          ))}

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
      </Map>

      <div className='footer'>

        <div className='footer_down'>

          {
            currentUser ? (<button className='button logout' onClick={handleLogout}>Logout</button>)
              :
              (
                <div>

                  <button className='button login' onClick={() => { setShowLogin(true) }}>
                    Login
                  </button>

                  <button className='button register' onClick={() => { setShowRegister(true) }}>
                    Register
                  </button>

                </div>
              )
          }

        </div>

      </div>

      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />}

    </div>


  );
}

export default App;
