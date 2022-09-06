import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

// AUTH
import AuthModel from "./app/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
// import * as Google from 'expo-google-app-auth'

// NAV
import AuthNavigator from "./app/navigation/AuthNavigator";
import Main from "./app/navigation/main";

// DATA FLOW
import currentUser from "./app/stores/UserStore";
import currentPact from "./app/stores/CreatePactStore";
import sortedPacts from "./app/stores/SortedPactStore";
import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
// MODELS
import PactModel from "./app/api/pacts";

// Create a client
const queryClient = new QueryClient();

const App = observer(() => {
  const [user, setUser] = useState({
    email: "",
    userId: "",
    authType: "",
  });

  const checkForUser = async () => {
    try {
      const localUser = await AsyncStorage.getItem("email");
      const localId = await AsyncStorage.getItem("userId");
      const authType = await AsyncStorage.getItem("authType");
      if (localUser)
        setUser({
          email: localUser,
          userId: localId,
          authType: authType,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkForUser();
  }, [user.userId]);

  const logout = async () => {
    let accessToken = currentUser.accessToken;
    try {
      if (accessToken) {
        if (user.authType === "google") {
          await AuthSession.revokeAsync(
            { accessToken },
            { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
          );
        } else {
          await fetch(
            `https://graph.facebook.com/${currentUser.socialAuthId}/permissions`,
            {
              method: "DELETE",
              body: accessToken,
            }
          );
        }
      } else {
        await AuthModel.logout();
      }
      await AsyncStorage.setItem("email", "");
      await AsyncStorage.setItem("userId", "");
      await AsyncStorage.setItem("authType", "");
      currentUser.resetUser();
      currentPact.resetPact();
      sortedPacts.resetPacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          {currentUser.email !== "" ? (
            <Main logout={logout} />
          ) : (
            <AuthNavigator />
          )}
        </SafeAreaProvider>
        <StatusBar style={"auto"} />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
});

export default App;
