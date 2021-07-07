import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Tabs, Box } from 'native-base'

// CONFIG
import colors from '../../config/colors'

// COMPONENTS
import Screen from '../../components/Screen'
import Header from '../../components/Header'
import Pending from '../../components/UserPacts/Pending'
import NeedsAction from '../../components/UserPacts/NeedsAction'
import Closed from '../../components/UserPacts/Closed'
import AppSearchInput from '../../components/AppSearchInput'

// STORE
import { observer } from 'mobx-react'

const DashboardScreen = observer(({ navigation }) => {
  return (
    <Screen>
      <Header
        title="Your pacts"
        borderBottomColor="transparent"
        borderBottomWidth={0}
        noBack
      />
      <Box w="100%" mt={5}>
        <Tabs
          defaultIndex={1}
          align="center"
          size="md"
          color="#6cc17f"
          colorScheme="#6cc17f"
        >
          <Tabs.Bar
            py={4}
            px={0}
            // border={1}
            borderRadius="md"
            mx={0}
            // bg="#e0e0e0"
          >
            <Tabs.Tab>Drafts</Tabs.Tab>
            <Tabs.Tab>Needs Action</Tabs.Tab>
            <Tabs.Tab>Pending</Tabs.Tab>
            <Tabs.Tab>Archived</Tabs.Tab>
          </Tabs.Bar>
          <Tabs.Views>
            <Tabs.View>
              <Closed />
            </Tabs.View>
            <Tabs.View>
              <NeedsAction navigation={navigation} />
            </Tabs.View>
            <Tabs.View>
              <Pending />
            </Tabs.View>
            <Tabs.View>
              <Closed />
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </Box>
    </Screen>
  )
})

const styles = StyleSheet.create({
  tabView: {
    // flex: 1,
  },
})

export default DashboardScreen
