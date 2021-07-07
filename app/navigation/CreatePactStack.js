import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

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

const CreatePactStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="First"
      headerMode="screen"
    >
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="Collabs" component={Collabs} />
      <Stack.Screen name="GratInfo" component={GratInfo} />
      <Stack.Screen name="GratInfoCont" component={GratInfoCont} />
      <Stack.Screen name="RecordInfo" component={RecordInfo} />
      <Stack.Screen name="ReviewData" component={ReviewData} />
      <Stack.Screen name="ReviewContract" component={ReviewContract} />
      <Stack.Screen name="SignContract" component={SignContract} />
    </Stack.Navigator>
  )
}

export default CreatePactStack
