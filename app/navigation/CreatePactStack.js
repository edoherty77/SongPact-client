import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// STACKS
import MenuStack from './MenuStack'

// COMPONENTS
import Header from '../components/Header'

// SCREENS
import New from '../views/Main/NewSongPactScreen'
import {
  Collabs,
  GratInfo,
  GratInfoCont,
  RecordInfo,
  ReviewData,
  ReviewContract,
  SignContract,
} from '../views/CreatePact/index'

const Stack = createStackNavigator()

const CreatePactStack = ({ updateAuthState, logout }) => {
  return (
    <Stack.Navigator headerMode="screen">
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
      <Stack.Screen
        name="SignContract"
        component={SignContract}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header
              title="Create New Pact"
              subTitle="Sign Contract"
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen name="Menu">
        {(screenProps) => (
          <MenuStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default CreatePactStack
