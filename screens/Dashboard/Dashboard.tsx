import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import { NormalButton } from "@/components/ui/Button";
import ConfettiCannon from 'react-native-confetti-cannon';
import {RewardCard} from "./ReqardCard";

export const Dashboard = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={["#f7f7f7", "#f7f7f7"]}
      style={styles.dashboardContiner}
    >
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarTextContainer}>
              <Text style={styles.avatarName}>HandShakes</Text>
              <Text style={styles.avatarNameCaption}>
                Welcome back to your account
              </Text>
            </View>
            <View style={styles.dotsIconContainer}>
              <Avatar.Text size={50} label="XD" />
              {/* <IconButton
            icon="dots-vertical"
            size={34}
            onPress={() => console.log("More pressed")}
          /> */}
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
            <Text
              style={{
                fontSize: 34,
                color: "#fff",
                lineHeight: 50,
                fontWeight: "400",
              }}
            >
              Earn rewards for every kilometer you ride!
            </Text>
          </View>
              <RewardCard/>
          <View style={styles.speedMeterContainer}>
            <View style={styles.speedMeterWrapper}>
              <Animated.View
                style={[styles.animatedRing, { transform: [{ rotate: spin }] }]}
              />
              <View style={styles.speedMeterContent}>
                <Text style={styles.speedMeterText}>30</Text>
                <Text style={styles.speedMeterUnit}>km/h</Text>
              </View>
            </View>
          </View>
          <NormalButton
            label="Claim Rewards"
            mode="contained"
            onPress={() => console.log("Sign In")}
            // icon="login"
            style={{ marginTop: 10, width: "80%", margin:'auto' }}
            loading={false}
          />
        
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#2328f3",
    height: 350,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  userContainer: {
    padding: 10,
    flex: 1,
    marginTop: 50,
  },
  dashboardContiner: {
    backgroundColor: "#cococo",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarTextContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
  },
  avatarName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#fff",
  },
  avatarNameCaption: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 20,
    marginTop: 5,
  },
  dotsIconContainer: {
    marginLeft: 30,
  },
  speedMeterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  speedMeterWrapper: {
    width: 270,
    height: 270,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedRing: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 135,
    borderWidth: 60,
    borderColor: "#2328f3",
    borderStyle: "solid",
  },
  speedMeterContent: {
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  speedMeterText: {
    fontSize: 124,
    color: "#000",
    fontWeight: "bold",
  },
  speedMeterUnit: {
    fontSize: 34,
    color: "#666",
  },
  cardContainer: {
    alignItems: "center", // center if needed
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "50%",
    height: 100,
    alignContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
