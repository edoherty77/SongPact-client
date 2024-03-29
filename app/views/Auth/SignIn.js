import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

// MODELS/STORAGE
import UserModel from "../../api/users";
import AuthModel from "../../api/auth";
import FriendRequestModel from "../../api/friendRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import currentUser from "../../stores/UserStore";

// FORM
import AuthForm from "./AuthForm";
import * as Yup from "yup";

// COMPONENTS
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("* Required"),
  password: Yup.string().required("* Required"),
});

const SignIn = ({ navigation }) => {
  const [signup, setSignup] = useState(false);
  const [failedAuth, setFailedAuth] = useState(false);
  const initialValues = { email: "", password: "" };

  async function toOnboarding(user) {
    navigation.navigate("Onboarding", {
      user: user,
      status: "signing up",
    });
  }

  async function checkForFriends() {
    let friends = currentUser.friends;
    let arr = [];
    try {
      if (friends) {
        friends.map(async (friend) => {
          let response = await UserModel.show(friend);
          let friendInfo = response.user;
          arr.push(friendInfo);
          await currentUser.setFriends([...arr]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRequests() {
    let arr = [];
    try {
      const response = await FriendRequestModel.all(currentUser._id);
      const requests = await response.data.friendRequests;
      if (requests) {
        requests.map(async (request) => {
          let obj = {};
          let requester = await UserModel.show(request.requester);
          let requesterInfo = requester.user;
          obj["friendRequestId"] = request._id;
          obj["requesterInfo"] = requesterInfo;
          obj["date"] = request.date;
          arr.push(obj);
          await currentUser.setFriendRequests([...arr]);
          await currentUser.setBadgeNum(arr.length);
        });
      } else {
        await currentUser.setFriendRequests("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn(values) {
    try {
      const dbUser = await UserModel.show(values.email);
      const foundUser = await AuthModel.login(values);
      if (foundUser) {
        if (foundUser.user.notifications.length > 0) {
          await currentUser.setBadgeNum(foundUser.user.notifications.length);
        }
        await AsyncStorage.setItem("email", foundUser.user.email);
        await AsyncStorage.setItem("userId", foundUser.user._id);
        await currentUser.setUser(dbUser.user);
        await fetchRequests();
        await checkForFriends();
      }
    } catch (err) {
      setFailedAuth(true);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.messageContainer}>
            <AppText style={styles.messageTitle}>Welcome Back!</AppText>
            <AppText style={styles.message}>
              Sign in to start organizing your contracts, safely and all in one
              place.
            </AppText>
          </View>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <AuthForm
            initialValues={initialValues}
            submit={signIn}
            isSignup={signup}
            checkForFriends={checkForFriends}
            fetchRequests={fetchRequests}
            toOnboarding={toOnboarding}
            validationSchema={validationSchema}
            failedAuth={failedAuth}
          />
          {/* </TouchableWithoutFeedback> */}
          <View style={styles.footer}>
            <AppText style={styles.footertext}>
              Don't have an accout?{" "}
              <AppText
                style={styles.textBtn}
                onPress={() => navigation.navigate("SignUp")}
              >
                Sign Up
              </AppText>
            </AppText>
            <AppText
              style={styles.textBtnForgot}
              // onPress={() => navigation.navigate("SignUp")}
            >
              Forget password?
            </AppText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: "flex",
  },
  messageContainer: {
    marginBottom: 30,
    marginTop: 30,
  },
  messageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 30,
    alignItems: "center",
  },
  footertext: {
    fontSize: 16,
  },
  textBtn: {
    fontWeight: "bold",
  },
  textBtnForgot: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
