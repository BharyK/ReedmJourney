import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width } = Dimensions.get("window");

export const RewardCard = () => {
  const [cannons, setCannons] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now(); // Unique key for each cannon
      setCannons((prev) => [...prev, id]);

      // Optional cleanup after a short delay to avoid memory leaks
      setTimeout(() => {
        setCannons((prev) => prev.filter((cannonId) => cannonId !== id));
      }, 4000); // match cannon fadeOut duration
    }, 1000); // every second

    return () => clearInterval(interval); // clear on unmount
  }, []);

  return (
    <View style={{ alignItems: "center", padding: 2 }}>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#fff",
          width: "100%",
          padding: 16,
          alignItems: "center",
          position: "relative", // important for ConfettiCannon
          overflow: "hidden", // hide overflow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          height: 160, // optional fixed height for visible confetti area
          marginBottom: 8,
        }}
      >
        {/* Multiple cannons fired periodically */}
        {cannons.map((id) => (
          <ConfettiCannon
            key={id}
            count={60}
            origin={{ x: width / 2 - 60, y: 0 }} // origin inside the white box
            fadeOut
            fallSpeed={3000}
            explosionSpeed={10}
          />
        ))}

        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Hey, user! Sending you a big handshake! 👋
        </Text>
        <Text style={{ fontSize: 52, fontWeight: "bold" }}>1250</Text>
      </View>
    </View>
  );
}
