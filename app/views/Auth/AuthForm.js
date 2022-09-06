import React from "react";
import { StyleSheet, View } from "react-native";

// FORMS
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";

// COMPONENTS
import AppText from "../../components/AppText";
import SocMediaSignIn from "./SocMediaSignIn";
import colors from "../../config/colors";

const AuthForm = ({
  submit,
  initialValues,
  isSignup,
  checkForFriends,
  fetchRequests,
  toOnboarding,
  validationSchema,
  failedAuth,
}) => {
  return (
    <View>
      <AppForm
        initialValues={initialValues}
        onSubmit={(values) => submit(values)}
        validationSchema={validationSchema}
      >
        {isSignup ? (
          <>
            <AppText style={styles.inputTitle}>Full Name</AppText>
            <AppFormField
              style={styles.input}
              name="name"
              height={50}
              autoCorrect={false}
              autoCapitalize="words"
              textContentType="givenName"
            />
          </>
        ) : null}
        <AppText style={styles.inputTitle}>Email</AppText>
        <AppFormField
          style={styles.input}
          name="email"
          height={50}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <AppText style={styles.inputTitle}>Password</AppText>
        <AppFormField
          style={styles.input}
          name="password"
          height={50}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry={true}
        />
        {failedAuth ? (
          <AppText style={styles.failMessage}>Invalid credentials</AppText>
        ) : null}
        <SubmitButton
          title="Create Account"
          textColor={colors.white}
          style={styles.loginButton}
        />
      </AppForm>
      <View style={styles.socialContainer}>
        <AppText style={styles.socialText}>
          Or sign in with your social account
        </AppText>
        <SocMediaSignIn
          checkForFriends={checkForFriends}
          fetchRequests={fetchRequests}
          toOnboarding={toOnboarding}
        />
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 20,
    borderRadius: 7,
  },
  inputTitle: {
    marginBottom: -10,
  },
  loginButton: {
    marginTop: 30,
    borderRadius: 7,
    height: 50,
    color: "white",
    backgroundColor: colors.green,
    width: "100%",
  },
  failMessage: {
    color: "red",
    marginLeft: 4,
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
});
