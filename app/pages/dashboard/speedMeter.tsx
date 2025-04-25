import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { speedStore } from "@/store/speedStore";

export default function Speed() {
  const [speed, setSpeed] = useState<number>(0); // Speed in m/s
  const [distance, setDistance] = useState<number>(0); // Total distance in meters
  const [points, setPoints] = useState<number>(0); // Total points
  const [hideScreen, setHideScreen] = useState(true);
  const lastLocationRef = useRef<Location.LocationObject | null>(null);
  const speedHistoryRef = useRef<number[]>([]);

  const { setSpeedStore, setReedemPoints } = speedStore();

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
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            const { speed, latitude, longitude } = location.coords;

            // Smooth and filter speed
            const filteredSpeed = speed && speed > 0.5 ? speed : 0;
            speedHistoryRef.current = [...speedHistoryRef.current, filteredSpeed].slice(-5);
            const smoothedSpeed = speedHistoryRef.current.reduce((sum, val) => sum + val, 0) / speedHistoryRef.current.length;

            setSpeed(smoothedSpeed);
            setSpeedStore((smoothedSpeed * 3.6).toFixed(2)); // Store in km/h

            const speedKmph = smoothedSpeed * 3.6;

            // Distance and Redeem Logic
            if (
              lastLocationRef.current &&
              speedKmph > 20 &&
              speedKmph <= 80
            ) {
              const { latitude: prevLat, longitude: prevLon } = lastLocationRef.current.coords;
              const distanceMoved = haversineDistance(prevLat, prevLon, latitude, longitude);

              setDistance((prev) => {
                const newDistance = prev + distanceMoved;
                const newPoints = Math.floor(newDistance / 100) * 10;
                setPoints(newPoints);
                setReedemPoints(newPoints);
                return newDistance;
              });
            }

            lastLocationRef.current = location;
          }
        );
      } catch (error) {
        console.error("Error tracking location:", error);
      }
    };

    startTracking();
    return () => {
      locationSubscription?.remove();
    };
  }, []);

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const speedInKmph = (speed * 3.6).toFixed(2);

  return (
    <View style={styles.container}>
      {hideScreen && (
        <>
          <Text style={styles.text}>Speed: {speedInKmph} km/h</Text>
          <Text style={styles.text}>Distance: {(distance / 1000).toFixed(2)} km</Text>
          <Text style={styles.text}>Points: {points}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 6,
  },
});
