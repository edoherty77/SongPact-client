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
  const [pacts, setPacts] = useState([])

  const findPacts = async () => {
    // console.log('PACTS', currentUser.pacts)
  }

  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle)
    return <DefaultTabBar {...props} />
  }

  useEffect(() => {
    findPacts()
  }, [])
  return (
    <Screen>
      <Header
        title="Your pacts"
        borderBottomColor="transparent"
        borderBottomWidth={0}
      />
      <View style={styles.tabView}>
        <Tabs
          renderTabBar={renderTabBar}
          locked={true}
          initialPage={1}
          tabBarUnderlineStyle={{
            backgroundColor: colors.green,
          }}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <AppText>Drafts</AppText>
              </TabHeading>
            }
          >
            <Pending />
          </Tab>
          <Tab
            activeTextStyle={{
              fontWeight: 'bold',
              fontSize: 80,
              color: colors.green,
            }}
            heading={
              <TabHeading
                style={{ backgroundColor: colors.background }}
                textStyle={{ fontSize: 80 }}
              >
                <AppText>Needs Action</AppText>
              </TabHeading>
            }
          >
            <NeedsAction navigation={navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <AppText>Pending</AppText>
              </TabHeading>
            }
          >
            <Closed />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <AppText>Archived</AppText>
              </TabHeading>
            }
          >
            <Closed />
          </Tab>
        </Tabs>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  tabView: {
    flex: 6,
  },
  pactList: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 1,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  contactsView: {
    // backgroundColor: 'green',
    marginLeft: 10,
    marginRight: 10,
    // marginTop: 5,
    padding: 10,
    flex: 1,
  },
  contactText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  contactList: {
    display: 'flex',
    flexDirection: 'row',
  },
  circle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lttan,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
})

export default DashboardScreen
