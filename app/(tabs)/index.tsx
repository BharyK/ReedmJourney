import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import LetsStart from "./LetsStart";

export default function HomeScreen() {
  const [speed, setSpeed] = useState<number | null>(null); // Speed in m/s
  const [distance, setDistance] = useState<number>(0); // Total distance in meters
  const [points, setPoints] = useState<number>(0); // Total points
  const [lastLocation, setLastLocation] =
    useState<Location.LocationObject | null>(null);
  const [speedHistory, setSpeedHistory] = useState<number[]>([]); // Speed smoothing history
  const [hideScreen, setHideScreen] = useState(false);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | undefined;

    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required.");
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000, // Update every second
            distanceInterval: 1, // Trigger every 1 meter
          },
          (location: Location.LocationObject) => {
            const { speed, latitude, longitude } = location.coords;

            // Apply speed filtering (ignore minor fluctuations)
            const filteredSpeed = speed && speed > 0.5 ? speed : 0;
            setSpeedHistory((prev) => {
              const newHistory = [...prev, filteredSpeed].slice(-5);
              const smoothedSpeed =
                newHistory.reduce((sum, val) => sum + val, 0) /
                newHistory.length;
              setSpeed(smoothedSpeed); // Update smoothed speed
              return newHistory;
            });

            if (lastLocation) {
              const { latitude: prevLat, longitude: prevLon } =
                lastLocation.coords;

              // Calculate distance if speed > 0
              if (filteredSpeed > 0) {
                const currentDistance = haversineDistance(
                  prevLat,
                  prevLon,
                  latitude,
                  longitude
                );

                setDistance((prevDistance) => {
                  const newDistance = prevDistance + currentDistance;

                  // Update points (10 points per km)
                  setPoints(Math.floor(newDistance / 100) * 10); // Updated calculation

                  return newDistance;
                });
              }
            }

            setLastLocation(location);
          }
        );
      } catch (error) {
        console.error("Error starting location tracking:", error);
      }
    };

    startTracking();

    return () => {
      locationSubscription?.remove();
    };
  }, [lastLocation]);

  // Function to calculate Haversine distance
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // Radius of Earth in meters
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const speedInKmph = speed !== null ? (speed * 3.6).toFixed(2) : "0.00"; // Convert m/s to km/h
  const hideShow = () => {
    alert ('Bharath')
    setHideScreen(true);
  };
  return (
    <View style={styles.container}>
      {hideScreen ? (
        <>
          <Text style={styles.text}>Speed: {speedInKmph} km/h</Text>
          <Text style={styles.text}>
            Distance: {(distance / 1000).toFixed(2)} km
          </Text>
          <Text style={styles.text}>Points: {points}</Text>
        </>
      ) : (
        <LetsStart hideShow={hideShow} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
  },
});
