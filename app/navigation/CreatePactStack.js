import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import New from '../views/Main/NewSongPactScreen'
import {
  Collabs,
  GratInfo,
  GratInfoCont,
  Producer,
  ProducerInfo,
  PerformerInfo,
  RecordInfo,
  ReviewAndSign,
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
      <Stack.Screen name="Producer" component={Producer} />
      <Stack.Screen name="PerformerInfo" component={PerformerInfo} />
      <Stack.Screen name="ProducerInfo" component={ProducerInfo} />
      <Stack.Screen name="RecordInfo" component={RecordInfo} />
      <Stack.Screen name="ReviewAndSign" component={ReviewAndSign} />
    </Stack.Navigator>
  )
}

export default CreatePactStack
