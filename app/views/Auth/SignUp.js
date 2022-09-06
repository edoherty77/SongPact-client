import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// FORMS
import AuthForm from "./AuthForm";

// AUTH
import AuthModel from "../../api/auth";

// COMPONENTS
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

const SignUp = ({ navigation }) => {
  const [signup, setSignup] = useState(true);
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
      console.log("❌ Error signing up...", error);
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
  forgot: {
    color: "rgba(0, 0, 0, 0.54)",
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
