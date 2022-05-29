import React, { useState, useEffect } from 'react';
import styles from './SearchArea.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationCity, selectCity } from '../../features/api/locationSlice';
import axios from 'axios';
import Geocode from 'react-geocode';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import DisplayWeather from '../DashBoardWeather/DashBoardWeather';
import Chart from '../Chart/Chart';

const SearchArea = () => {
  const dispatch = useDispatch();
  const cityLocation = useSelector(selectCity);
  const APIKEY: any = process.env.REACT_APP_GOOGLE_API_KEY;
  const APIKEY_GEOCODE: any = process.env.REACT_APP_WEATHER_API_KEY;
  const [city, setCity] = useState('');
  const [latstate, setLatstate] = useState(35.68944);
  const [lngstate, setLngstate] = useState(139.9167);
  const [weather, setWeather] = useState([]);
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const [center, setCenter] = useState({ lat: 35.68944, lng: 139.9167 });
  const [currentPosition, setCurrentPosition] = useState({});

  const firstlocation = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${center.lat}&lon=${center.lng}&lang=ja&appid=${APIKEY_GEOCODE}`
      )
      .then((response) => {
        const data: any = response.data;
        setWeather(data);
        console.log(weather);
        console.log('status:', response.status);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  const success = (data: any) => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
    firstlocation();
  };

  const error = (data: any) => {
    const currentPosition = {
      lat: 34.673542,
      lng: 135.433338,
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const weatherData = async (e: any) => {
    dispatch(setLocationCity(city));
    Geocode.setApiKey(APIKEY);
    Geocode.fromAddress(city).then(
      async (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatstate(lat);
        setLngstate(lng);

        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&lang=ja&appid=${APIKEY_GEOCODE}`
          )

          .then((response) => {
            const data: any = response.data;
            setWeather(data);
            console.log(weather);
            console.log('status:', response.status);
          })
          .catch((err) => {
            console.log('err:', err);
          });
      },
      (error) => {
        alert('error');
      }
    );

    e.preventDefault();
    if (city === '') {
      alert('値を追加してください');
    } else {
      console.log(city);

      setCity('');
    }
  };

  const containerStyle = {
    width: '300px',
    height: '200px',
    margin: '0 auto',
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          {/* <p className={styles.label_title}>都市名</p> */}
          <form action=''>
            <input
              type='text'
              name='city'
              placeholder='Enter city name and press search button'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={styles.valuefield}
            />
            <button
              className={styles.submit_btn}
              onClick={(e) => weatherData(e)}
            >
              Search
            </button>
          </form>
        </div>

        <div className={styles.map_container}>
          <LoadScript googleMapsApiKey={APIKEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            ></GoogleMap>
          </LoadScript>
        </div>
      </div>
      <div className={styles.weather_area}>
        <div className={styles.display_left}>
          <p className={styles.today_time_title}>
            <span>現在時刻</span>
            {month + '月' + day + '日'}
          </p>
          <p className={styles.area_title}>{cityLocation}</p>

          {weather && (
            <>
              <DisplayWeather data={weather} />
            </>
          )}
        </div>
        <div className={styles.display_right}>
          <p className={styles.label}>1時間ごとの天気</p>
          <Chart data={weather} />
        </div>
      </div>
    </>
  );
};

export default SearchArea;
