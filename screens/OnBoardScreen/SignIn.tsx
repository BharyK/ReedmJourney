import { Text, StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextFiled } from "@/components/ui/TextFiled";
import { NormalButton } from "@/components/ui/Button";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

export const SignIn = () => {
  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.signInContainer}>
       <Image source={require('@/assets/images/logo.jpg')} style={styles.image} resizeMode="contain"/>
      <View style={styles.h1Wrapper}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.backText}>Back!</Text>
      </View>
      <View style={styles.loginSection}>
        <TextFiled
          label="Email"
          placeholder="Enter your email"
          mode="outlined"
          value="bharathmb17@gmail.com"
          icon="email"
        />
        <TextFiled
          label="Password"
          placeholder="Enter your password"
          mode="outlined"
          value="Welcome@123"
          icon="lock"
          isPassword={true}
        />
        <NormalButton
          label="Sign Up"
          mode="contained"
          onPress={() => console.log("Sign In")}
          // icon="login"
          style={{ marginTop: 10, width: "100%" }}
          loading={false}
        />
          <Text style ={styles.forgetPassword}>Forget password?</Text>
          <View style={styles.singInFooter}>
        <Text style={styles.footText}>Don't have an account?</Text>
        <Text style={styles.footerText}>Sign UP</Text>
      </View>
      </View>
      <Text style = {styles.orText}>OR</Text>
      <View style={styles.underline} />
      <View style={styles.socialSite}>
      <FontAwesome name="whatsapp" size={60} color="#25D366" />
      <AntDesign name="google" size={60} color="#DB4437" />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  loginSection: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 40,
    marginBottom: 2,
    color: "#000000",
    letterSpacing: 6,
  },
  backText: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2328f3",
  },
  h1Wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  forgetPassword: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2328f3",
    marginTop: 10,
    textAlign: "left",
    width: "100%",
    textTransform:'uppercase'
  },
  singInFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop:10
  },
  footText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "left",
  },
  footerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2328f3",
    textAlign: "left",
    textTransform:'uppercase',
    marginLeft: 4,
  },
  image: {
    width: 300,
    height: 250,
    marginTop: 0,
  },
  socialSite: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginTop: 30,
  },
  orText: {
    width:'100%',
    textAlign:'center',
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  underline: {
    width: '80%',
    height: 0.2,
    backgroundColor: '#4F46BA',
    marginTop: 14, 
  },
});
