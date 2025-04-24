import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextFiled } from "@/components/ui/TextFiled";
import { NormalButton } from "@/components/ui/Button";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { SIGNIN } from "@/API/constacts";
import { useAPI } from "@/API/hooks/useAPI";

const SignIn = () => {
  const router = useRouter();
  const { post } = useAPI();
  const handleNavigate = () => {
    router.push("/pages/signUp");
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Too short!").required("Password is required"),
  });

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.signInContainer}>
      <Image
        source={require("@/assets/images/logo.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.h1Wrapper}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.backText}>Back!</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          console.log("Form Values:", values);
          // handle actual login logic
          const user = {
            email: values.email,
            password: values.password,
          }
          const response = await post(SIGNIN, user);
          console.log("Response: ", response);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.loginSection}>
            <TextFiled
              label="Email"
              placeholder="Enter your email"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              icon="email"
              error={touched.email && errors.email}
            />
            <TextFiled
              label="Password"
              placeholder="Enter your password"
              mode="outlined"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              icon="lock"
              isPassword={true}
              error={touched.password && errors.password}
            />
            <NormalButton
              label="Sign In"
              mode="contained"
              onPress={handleSubmit}
              style={{ marginTop: 10, width: "100%" }}
              loading={false}
            />
            <Text style={styles.forgetPassword}>Forget password?</Text>
            <View style={styles.singInFooter}>
              <Text style={styles.footText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleNavigate}>
                <Text style={styles.footerText}>Sign UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <Text style={styles.orText}>OR</Text>
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
    width: "100%",
    overflow: "scroll",
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
    textTransform: "uppercase",
  },
  singInFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 10,
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
    textTransform: "uppercase",
    marginLeft: 4,
  },
  image: {
    width: 300,
    height: 250,
    marginTop: 0,
  },
  socialSite: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginTop: 30,
  },
  orText: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  underline: {
    width: "80%",
    height: 0.2,
    backgroundColor: "#4F46BA",
    marginTop: 14,
  },
});

export default SignIn;
