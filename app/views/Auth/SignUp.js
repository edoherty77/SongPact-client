import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// FORMS
import AuthForm from "./AuthForm";
import * as Yup from "yup";

// AUTH
import AuthModel from "../../api/auth";

// COMPONENTS
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("* Required"),
  email: Yup.string().email("Invalid email address").required("* Required"),
  password: Yup.string().required("* Required"),
});

const SignUp = ({ navigation }) => {
  const [signup, setSignup] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const initialValues = { name: "", email: "", password: "" };

  async function toOnboarding(user) {
    navigation.navigate("Onboarding", {
      user: user,
      status: "signing up",
    });
  }

  const register = async (values) => {
    try {
      await AuthModel.register(values);
      navigation.navigate("Onboarding", { user: values, status: "signing up" });
    } catch (error) {
      setFailedAuth(true);
    }
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <AppText style={styles.messageTitle}>Create your account</AppText>
          <AppText style={styles.message}>
            Aleady have an account?{" "}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate("SignIn")}
            >
              Log in
            </AppText>
          </AppText>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AuthForm
            initialValues={initialValues}
            submit={register}
            isSignup={signup}
            toOnboarding={toOnboarding}
            validationSchema={validationSchema}
            failedAuth={failedAuth}
          />
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <AppText style={styles.footertext}>
            By clicking "Create Account" you agree to our{" "}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate("SignIn")}
            >
              Terms & Conditions
            </AppText>{" "}
            and{" "}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate("SignIn")}
            >
              Privacy Policy
            </AppText>
          </AppText>
        </View>
      </View>
    </Screen>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: "flex",
  },
  messageContainer: {
    marginBottom: 50,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
  input: {
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
  },
  loginButton: {
    marginTop: 30,
    borderRadius: 7,
    height: 50,
    color: "white",
    backgroundColor: colors.green,
    width: "100%",
  },
  socialContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  socialText: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  socialBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  footertext: {
    textAlign: "center",
  },
  textBtn: {
    fontWeight: "bold",
  },
});
