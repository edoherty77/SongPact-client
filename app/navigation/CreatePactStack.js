import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// STACKS
import MenuStack from "./MenuStack";

// COMPONENTS
import Header from "../components/Header";

// SCREENS
import Onboarding from "../views/Auth/Onboarding";
import New from "../views/Main/NewSongPactScreen";
import {
  Collabs,
  GratInfo,
  GratInfoCont,
  RecordInfo,
  ReviewData,
  ReviewContract,
} from "../views/CreatePact/index";

// STORE
import currentUser from "../stores/UserStore";

const Stack = createStackNavigator();

const CreatePactStack = ({ updateAuthState, logout, route, navigation }) => {
  React.useLayoutEffect(() => {
    if (getFocusedRouteNameFromRoute(route) == "ReviewContract") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [getFocusedRouteNameFromRoute(route)]);
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={currentUser.profileComplete ? "New" : "Onboarding"}
    >
      <Stack.Screen
        name="Onboarding"
        options={({ navigation, route }) => ({
          header: (props) => <Header title="" noBack {...props} />,
        })}
        component={Onboarding}
        initialParams={{ user: currentUser, status: "signed in" }}
      />
      <Stack.Screen
        name="New"
        component={New}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header title="Create New Pact" noBack {...props} />
          ),
        })}
      />
      <Stack.Screen
        name="Collabs"
        component={Collabs}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header
              title="Create New Pact"
              subTitle="Add Collaborators"
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen
        name="GratInfo"
        component={GratInfo}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header
              title="Create New Pact"
              subTitle="Gratuity Info"
              clearCollabs
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen
        name="GratInfoCont"
        component={GratInfoCont}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header
              title="Create New Pact"
              subTitle="Gratuity Info"
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen
        name="RecordInfo"
        component={RecordInfo}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header title="Create New Pact" subTitle="Record Info" {...props} />
          ),
        })}
      />
      <Stack.Screen
        name="ReviewData"
        component={ReviewData}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header title="Create New Pact" subTitle="Review" {...props} />
          ),
        })}
      />
      <Stack.Screen
        name="ReviewContract"
        component={ReviewContract}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header
              title="Create New Pact"
              subTitle="Review Contract"
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen name="Menu" options={{ headerShown: false }}>
        {(screenProps) => (
          <MenuStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CreatePactStack;
