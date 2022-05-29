import React from 'react';
import styles from './InitialWeather.module.scss';

const InitialWeather = () => {
  const d = new Date();
  const addDate = 1;
  const max = 8;
  const func = () => {
    let a = '';
    for (let i = 0; i <= max; i++) {
      d.setDate(d.getDate() + addDate);
      return (a = d.getMonth() + 1 + '/' + d.getDate());
    }
  };
  return (
    <>
      <div className={styles.week_weather_container}>
        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>

        <div className={styles.each_weather}>
          <p className={styles.data_title}>{func()}</p>
          <img
            src={'http://openweathermap.org/img/wn/01d.png'}
            alt=''
            className={styles.icon}
          />
          <p className={styles.temperature_title}>--/-- °C</p>
        </div>
      </div>
    </>
  );
};

export default InitialWeather;
