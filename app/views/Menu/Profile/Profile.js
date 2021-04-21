import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import AppText from '../../../components/AppText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../../../components/Header'
import Screen from '../../../components/Screen'
import colors from '../../../config/colors'
import Separator from '../../../components/Separator'
import store from '../../../stores/UserStore'
// import { API, graphqlOperation } from 'aws-amplify'
// import { onUpdateUser } from '../../../../src/graphql/subscriptions'

const Profile = ({ navigation }) => {
  const [isUser, setUser] = useState('')

  // useEffect(() => {
  //   const updateUserListener = API.graphql(
  //     graphqlOperation(onUpdateUser),
  //   ).subscribe({
  //     next: (userData) => {
  //       const updateUser = userData.value.data.onUpdateUser
  //       setUser(updateUser)
  //     },
  //   })

  //   return () => {
  //     // Unsubscribe for the focus Listener
  //     updateUserListener.unsubscribe()
  //   }
  // }, [navigation])

  return (
    <Screen style={styles.container}>
      <Header
        title="Profile"
        icon="arrow-left-bold"
        back={() => navigation.navigate('Main')}
        name="comment-edit"
        iconPress={() => navigation.navigate('Edit')}
      />
      {/* <ScrollView> */}
      <View style={styles.main}>
        <View style={styles.nameContainer}>
          <View style={styles.circle}>
            <AppText
              // fontWeight="bold"
              fontSize={50}
              color={colors.red}
            >
              {store.firstName[0]}
              {store.lastName[0]}
            </AppText>
          </View>
          <AppText fontSize={30} style={styles.name}>
            {store.firstName} {store.lastName}
          </AppText>
        </View>
        <View style={styles.paymentContainer}>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Payment Setup</AppText>
            <View style={styles.fieldEditContainer}>
              <AppText style={styles.fieldInfo}>None</AppText>
              <MaterialCommunityIcons
                // onPress={back}
                name="chevron-right"
                size={35}
                color="#42C1FC"
              />
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Subscription</AppText>
            <View style={styles.fieldEditContainer}>
              <AppText style={styles.fieldInfo}>None</AppText>
              <MaterialCommunityIcons
                // onPress={back}
                name="chevron-right"
                size={35}
                color="#42C1FC"
              />
            </View>
          </View>
        </View>
        {/* <Separator /> */}
        <View style={styles.userInfoContainer}>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Email</AppText>
            <AppText style={styles.fieldInfo}>{store.email}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Artist Name</AppText>
            <AppText style={styles.fieldInfo}>{store.artistName}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Company Name</AppText>
            <AppText style={styles.fieldInfo}>{store.companyName}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldHeader}>Address</AppText>
            <AppText style={styles.fieldInfo}>{store.address}</AppText>
          </View>
          <View style={styles.addressContainer}>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldHeader}>City</AppText>
              <AppText style={styles.fieldInfo}>{store.city}</AppText>
            </View>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldHeader}>State</AppText>
              <AppText style={styles.fieldInfo}>{store.state}</AppText>
            </View>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldHeader}>Zip</AppText>
              <AppText style={styles.fieldInfo}>{store.zipCode}</AppText>
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </Screen>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
  },
  main: {
    // flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  circle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lttan,
    width: 85,
    height: 85,
    borderRadius: 75,
    marginRight: 8,
  },
  name: {
    marginTop: 10,
    marginBottom: 20,
  },
  paymentContainer: {
    // backgroundColor: 'red',
  },
  fieldContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  fieldHeader: {
    fontSize: 15,
  },
  fieldEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldInfo: {
    fontSize: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
  editBtn: {
    marginVertical: 20,
  },
})
