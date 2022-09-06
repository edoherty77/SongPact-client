import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

// COMPONENT
import SocialMediaBtn from "../../components/SocialMediaBtn";

// STORE
import currentUser from "../../stores/UserStore";

// AUTH
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../../api/users";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const SocMediaSignIn = ({
  checkForFriends,
  fetchRequests,
  // sortPacts,
  toOnboarding,
}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "350040199389-gjbgtaas95ofd5hd9ojotcfht73gj407.apps.googleusercontent.com",
    iosClientId:
      "350040199389-e8iqt2rlahdmgeslat7eq51944dcbb7c.apps.googleusercontent.com",
    expoClientId:
      "350040199389-m3ffgmsglfhsi2rg6ru6c4f1jquunk2p.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });
  const [, responseFB, promptAsyncFB] = Facebook.useAuthRequest(
    {
      expoClientId: "976030243163813",
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const googleSignIn = async () => {
    try {
      let proxy = await promptAsync({ useProxy: true });
      if (proxy) {
        let result = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${proxy.authentication.accessToken}`,
          },
        });
        let data = await result.json();
        await currentUser.setAccessToken(data.accessToken);
        await AsyncStorage.setItem("authType", "google");
        const user = {
          _id: data.email,
          name: data.name,
          email: data.email,
          socialAuthId: data.id,
          photoUrl: data.picture,
          password: data.id,
        };
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const facebookSignIn = async () => {
    try {
      let proxy = await promptAsyncFB();
      if (proxy) {
        let result = await fetch(
          `https://graph.facebook.com/me?fields=id,picture.type(large),name,email&access_token=${proxy.authentication.accessToken}`
        );
        let data = await result.json();
        await currentUser.setAccessToken(proxy.authentication.accessToken);
        await AsyncStorage.setItem("authType", "facebook");
        const user = {
          _id: data.email,
          name: data.name,
          email: data.email,
          socialAuthId: data.id,
          photoUrl: data.picture.data.url,
          password: data.id,
        };
        setUser(user);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const setUser = async (user) => {
    const foundUser = await UserModel.show(user.email);
    if (foundUser.user !== null && foundUser.user !== undefined) {
      if (foundUser.user.notifications.length > 0) {
        await currentUser.setBadgeNum(foundUser.user.notifications.length);
      }
      await AsyncStorage.setItem("email", foundUser.user.email);
      await AsyncStorage.setItem("userId", foundUser.user.socialAuthId);
      await currentUser.setUser(foundUser.user);
      await checkForFriends();
      await fetchRequests();
      console.log("currentUser", currentUser);
    } else {
      user.profileComplete = false;
      const newUser = await UserModel.create(user);
      await toOnboarding(newUser.data.user);
    }
  };

  return (
    <View style={styles.socialBtns}>
      <SocialMediaBtn
        name="google"
        color="white"
        backgroundColor="black"
        title="Google"
        onPress={googleSignIn}
      />
      <SocialMediaBtn
        name="facebook-square"
        color="white"
        backgroundColor="black"
        title="Facebook"
        onPress={facebookSignIn}
      />
    </View>
  );
};

export default SocMediaSignIn;

const styles = StyleSheet.create({
  socialBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
