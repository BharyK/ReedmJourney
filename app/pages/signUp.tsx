import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet, View } from "react-native";
import { TextFiled } from "@/components/ui/TextFiled";
import { NormalButton } from "@/components/ui/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useAPI } from "@/API/hooks/useAPI";
import { SIGNUP } from "@/API/constacts";
import { useRouter, Link } from 'expo-router';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Too Short!").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm your password"),
});

 const SignUp = () => {
  const { post } = useAPI();
  const router = useRouter();

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.signInContainer}>
      <View style={styles.h1Wrapper}>
        <Text style={styles.welcomeText}>Create an</Text>
        <Text style={styles.backText}>Account!</Text>
      </View>
      <View style={styles.loginSection}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values) => {
            const newUser = {
              userName: values.username,
              email: values.email,
              password: values.password,
            };
              const response = await post(SIGNUP, newUser);
              console.log("Response: ", response);
              if(response.success) {
                alert ("User created successfully!");	
                router.push("/pages/signIn"); // or '/pages/signIn' based on your folder
              }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <TextFiled
                label="User Name"
                placeholder="Enter your name"
                mode="outlined"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                icon="account-child"
              />
              <TextFiled
                label="Email"
                placeholder="Enter your email"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                icon="email"
              />
              <TextFiled
                label="Password"
                placeholder="Enter your password"
                mode="outlined"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                icon="lock"
                isPassword={true}
              />
              <TextFiled
                label="Confirm Password"
                placeholder="Re-enter password"
                mode="outlined"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                icon="lock"
                isPassword={true}
              />
              <NormalButton
                label="Sign In"
                mode="contained"
                onPress={handleSubmit}
                style={{ marginTop: 10, width: "100%" }}
                loading={isSubmitting}
                type="submit"
              />
            </>
          )}
        </Formik>

        <View style={styles.singInFooter}>
          <Text style={styles.footText}>Already have an account?</Text>
          <Link href="pages/signIn" style={styles.footerText}>Sign In</Link>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  h1Wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  singInFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 60,
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
});

export default SignUp;
