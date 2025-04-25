import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width } = Dimensions.get("window");

type RewardCardProps = {
  reedemPoints: number;
  userName: string
};

 const RewardCard: React.FC<RewardCardProps> = ({ reedemPoints, userName }) => {
  const [cannons, setCannons] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now(); 
      setCannons((prev) => [...prev, id]);

      setTimeout(() => {
        setCannons((prev) => prev.filter((cannonId) => cannonId !== id));
      }, 4000);
    }, 1000);

    return () => clearInterval(interval);
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
          position: "relative",
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          height: 160,
          marginBottom: 8,
        }}
      >
        {cannons.map((id) => (
          <ConfettiCannon
            key={id}
            count={60}
            origin={{ x: width / 2 - 60, y: 0 }}
            fadeOut
            fallSpeed={3000}
            explosionSpeed={10}
          />
        ))}

        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            fontWeight: 400,
            marginBottom: 10,
            lineHeight: 30,
          }}
        >
          Hey, {userName}! Sending you a big handshake! 👋
        </Text>
        <Text style={{ fontSize: 52, fontWeight: "bold" }}>{reedemPoints}</Text>
      </View>
    </View>
  );
};

export default RewardCard;