import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import Screen from '../../components/Screen'

export default function Help({ navigation }) {
  return (
    <Screen>
      <Header
        title="Help"
        icon="arrow-left-bold"
        back={() => navigation.navigate('Main')}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
