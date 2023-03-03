import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native';
import { format } from "date-fns";
import styles from '../Styles/style.js';

import fr from "date-fns/locale";

export default function Forecasts({ cityData }) {
const [forecasts, setForecasts] = useState([]);
    useEffect(() => {
        const forecastData = cityData.list.map(f => {
            const dt = new Date(f.dt * 1000)
            return ({
                date: dt,
                hour: dt.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dt, "EEEE", { locale: fr })
            })
            });
        setForecasts(forecastData); // mise à jour de la state avec les prévisions
    },[cityData]);

    return (
    <>
    <View style={styles.container}>
        <ScrollView
        horizontal showsHorizontalScrollIndicator={false}>
            {forecasts.map(f => (
                <>
                    <Text style={styles.text}>{f.name}</Text>
                    <Text style={styles.text}>{f.hour}</Text>
                    <Text style={styles.text}>{f.temp}°C</Text>
                </>
            ))}
        </ScrollView>
    </View>
    </>
    )
}

