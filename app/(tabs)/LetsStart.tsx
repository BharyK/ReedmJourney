import React from "react";
import { View, Text, StyleSheet, SafeAreaView  } from "react-native";
import { SignIn } from "@/screens/OnBoardScreen/SignIn"; 
import { SignUp } from "@/screens/OnBoardScreen/SignUp";
import { Dashboard } from "@/screens/Dashboard/Dashboard";

interface Props {
  hideShow: () => void; 
}

const LetsStart: React.FC<Props> = ({ hideShow }) => {
  return (
    <View  style={styles.container}>
      {/* <SignIn/> */}
      <SignUp/>
      {/* <Dashboard/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
 
});

export default LetsStart;
