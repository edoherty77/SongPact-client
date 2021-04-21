import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import Header from '../../components/Header'
import PactButton from '../../components/PactButton'

import Pending from '../../components/UserPacts/Pending'
import NeedsAction from '../../components/UserPacts/NeedsAction'
import Closed from '../../components/UserPacts/Closed'
// import { listPacts } from '../../../src/graphql/queries'
// import { API, Auth, graphqlOperation } from 'aws-amplify'
import AppText from '../../components/AppText'

import { observer } from 'mobx-react'
// import { Tab, Tabs, TabHeading } from 'native-base'

const DashboardScreen = observer(() => {
  const [pacts, setPacts] = useState([])

  // const findPacts = async () => {
  //   const foundPacts = await API.graphql(graphqlOperation(listPacts))
  //   console.log('PACTS', foundPacts)
  // }

  useEffect(() => {
    // findPacts()
  }, [])
  return (
    <Screen>
      {/* <Header
        title="Your Pacts"
        borderBottomColor="transparent"
        borderBottomWidth={0}
      />
      <View style={styles.tabView}>
        <Tabs
          locked={true}
          initialPage={1}
          tabBarUnderlineStyle={{ backgroundColor: 'red' }}
          tabContainerStyle={{ borderColor: 'black' }}
        >
          <Tab
            // tabStyle={{ backgroundColor: 'blue' }}
            heading={
              <TabHeading
                style={{ backgroundColor: colors.gray }}
                activeTextStyle={{ fontWeight: 'bold', fontSize: 40 }}
              >
                <AppText>Pending</AppText>
              </TabHeading>
            }
          >
            <Pending />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.gray }}>
                <AppText>Needs Action</AppText>
              </TabHeading>
            }
          >
            <NeedsAction />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.gray }}>
                <AppText>Closed</AppText>
              </TabHeading>
            }
          >
            <Closed />
          </Tab>
        </Tabs>
      </View>
      <View style={styles.contactsView}>
        <View style={styles.contactText}>
          <AppText
            style={{ marginBottom: 5 }}
            fontWeight={'bold'}
            fontSize={20}
            color={colors.black}
          >
            Recent Contacts:
          </AppText>
          <AppText
            onPress={() => navigation.navigate('Contacts')}
            color={colors.red}
          >
            See All
          </AppText>
        </View>
        <View style={styles.contactList}>
          <View style={styles.circle}>
            <AppText
              fontWeight="bold"
              fontSize={25}
              color={colors.red}
              style={styles.initials}
            >
              ED
            </AppText>
          </View>
          <View style={styles.circle}>
            <AppText
              fontWeight="bold"
              fontSize={25}
              color={colors.red}
              style={styles.initials}
            >
              KT
            </AppText>
          </View>
          <View style={styles.circle}>
            <AppText
              fontWeight="bold"
              fontSize={25}
              color={colors.red}
              style={styles.initials}
            >
              RJ
            </AppText>
          </View>
        </View>
      </View> */}
    </Screen>
  )
})

const styles = StyleSheet.create({
  options: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  optionsText: {
    fontWeight: 'bold',
    color: colors.red,
    // fontFamily: 'Courier',
  },
  tabView: {
    flex: 6,
  },
  pactList: {
    padding: 10,
    // backgroundColor: 'black',
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
