import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from 'react-native';
import { format } from "date-fns";
import styles from '../Styles/style.js';
import {fr} from "date-fns/locale";

export default function Forecasts({ cityData }) {
  const [forecasts, setForecasts] = useState([]);
  useEffect(() => {
    const forecastData = cityData.list.map(f => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr })
      };
    });
    setForecasts(forecastData);
  },[cityData]);

  if (forecasts.length === 0) {
    return null;
  }

  const iconBaseUrl = `http://openweathermap.org/img/w/`;
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {forecasts.map((f,index) => (
            <View key={f.date} style={styles.forecastContainer}>
              <Text style={styles.text}>{f.name}</Text>
              <Text style={styles.text}>{f.hour} h</Text>
              <View style={styles.tempContainer}>
                <Image
                  source={{ uri: `${iconBaseUrl}${forecasts[index].icon}.png` }}
                  style={styles.icon}
                />
                <Text style={styles.heatDeg}>{f.temp}°C</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
