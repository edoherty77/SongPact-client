import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import Header from '../../components/Header'
import PactButton from '../../components/PactButton'

import Pending from '../../components/UserPacts/Pending'
import NeedsAction from '../../components/UserPacts/NeedsAction'
import Closed from '../../components/UserPacts/Closed'

import AppText from '../../components/AppText'
import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'
import { Tab, Tabs, TabHeading, DefaultTabBar } from 'native-base'

const DashboardScreen = observer(({ navigation }) => {
  return (
    <Screen>
      <Header
        title="Your pacts"
        borderBottomColor="transparent"
        borderBottomWidth={0}
        noBack
      />
      <View style={styles.tabView}>
        <Tabs>
          <Tabs.Bar>
            <Tabs.Tab>Needs Action</Tabs.Tab>
            <Tabs.Tab>Pending</Tabs.Tab>
            <Tabs.Tab>Drafts</Tabs.Tab>
            <Tabs.Tab>Archived</Tabs.Tab>
          </Tabs.Bar>
          <Tabs.Views>
            <Tabs.View>
              <NeedsAction navigation={navigation} />
            </Tabs.View>
            <Tabs.View>
              <Pending />
            </Tabs.View>
            <Tabs.View>
              <Closed />
            </Tabs.View>
            <Tabs.View>
              <Closed />
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  tabView: {
    flex: 6,
  },
})

export default DashboardScreen
