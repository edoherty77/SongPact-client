import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PactButton from '../PactButton'
import colors from '../../config/colors'
// import { API, Auth, graphqlOperation } from "aws-amplify"
// import { listPacts } from "../../src/graphql/Queries"
// import { listUsers } from "../../src/graphql/Queries"

const email = 'evan.doherty.ny@gmail.com'
const Closed = () => {
  const [user, setUser] = useState([])
  // const getPerson = async () => {
  //   try {
  //     const data = await API.graphql(graphqlOperation(listPacts))
  //     setUser(data)
  //     console.log(data)
  //   } catch (err) {
  //     console.log("error: ", err)
  //   }
  //   console.log("pacts:", user)
  // }

  // useEffect(() => {
  //   getPerson()
  // }, [])

  return <View style={styles.pactList}></View>
}

const styles = StyleSheet.create({
  pactList: {
    padding: 10,
    backgroundColor: colors.background,
    marginLeft: 10,
    marginRight: 10,
    elevation: 1,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
})

export default Closed
