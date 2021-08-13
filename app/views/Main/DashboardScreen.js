import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

// CONFIG
import colors from '../../config/colors'

// COMPONENTS
import Screen from '../../components/Screen'
import Pending from '../../components/UserPacts/Pending'
import Action from '../../components/UserPacts/Action'
import Draft from '../../components/UserPacts/Draft'
import Archive from '../../components/UserPacts/Archive'
import AppSearchInput from '../../components/AppSearchInput'

// STORE
import { observer } from 'mobx-react'

const DashboardScreen = observer(({ navigation }) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Drafts' },
    { key: 'second', title: 'Needs Action' },
    { key: 'third', title: 'Pending' },
    { key: 'fourth', title: 'Archive' },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Draft navigation={navigation} />
      case 'second':
        return <Action navigation={navigation} />
      case 'third':
        return <Pending navigation={navigation} />
      case 'fourth':
        return <Archive navigation={navigation} />
      default:
        return null
    }
  }
  const renderTabBar = (props) => (
    <TabBar
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <View
          style={[
            {
              height: 30,
              width: 85,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            },
            focused
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'none' },
          ]}
        >
          <Text
            style={[
              { fontSize: 14, fontWeight: 'bold' },
              focused
                ? { color: colors.green }
                : { color: 'black', fontWeight: 'normal' },
            ]}
          >
            {route.title}
          </Text>
        </View>
      )}
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
    />
  )
  return (
    <Screen>
      <AppSearchInput style={styles.input} />
      <TabView
        renderTabBar={renderTabBar}
        style={styles.tabView}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: 0 }}
        // sceneContainerStyle={{ flex: 3, backgroundColor: 'blue' }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  tabBar: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
  },
  input: {
    position: 'absolute',
    top: 100,
    marginHorizontal: 20,
    zIndex: 1,
  },
})

export default DashboardScreen
