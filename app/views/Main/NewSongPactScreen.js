import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import Screen from '../../components/Screen'
import Header from '../../components/Header'
import NativeModal from 'react-native-modal'
import NewPactButton from '../../components/NewPactButton'
import colors from '../../config/colors'
import AppText from '../../components/AppText'
import { AppLoading } from 'expo'
import ConfirmModal from '../../components/ConfirmModal'

function NewSongPact({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)

  const pics = {
    drake: require('../../assets/drake.jpg'),
    fkj: require('../../assets/FKJ.jpg'),
    remix: require('../../assets/remix.jpg'),
    post: require('../../assets/post.jpeg'),
    location: require('../../assets/location.jpg'),
    work: require('../../assets/work.jpeg'),
  }

  function createNew() {
    setModalVisible(true)
  }

  function createDeny() {
    setModalVisible(false)
  }

  function createConfirm(type) {
    setModalVisible(false)
    navigation.navigate('Collabs', {
      type: type,
    })
  }

  return (
    <Screen>
      <Header title="Create A Pact" />
      <View style={styles.mainView}>
        <View style={styles.rowView}>
          <NewPactButton
            onPress={createNew}
            name="Producer"
            image={pics.drake}
            info="producer shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
            text="Would you like to initialize a contract?"
            confirm={() => createConfirm('Producer')}
            deny={createDeny}
            onBackdropPress={() => setModalVisible(false)}
            isVisible={isModalVisible}
          />
          <NewPactButton
            name="Creative Services"
            image={pics.fkj}
            info="creative shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
          />
        </View>
        <View style={styles.rowView}>
          <NewPactButton
            name="Remixer"
            image={pics.remix}
            info="remixer shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
          />
          <NewPactButton
            name="Side Artist"
            image={pics.post}
            info="side artist shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
          />
        </View>
        <View style={styles.rowView}>
          <NewPactButton
            name="Work for Hire"
            image={pics.work}
            info="wfh shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
          />
          <NewPactButton
            name="Location/Property Release"
            image={pics.location}
            info="location shit blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: '#FEECEF',
  },
  rowView: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoModal: {
    backgroundColor: colors.lttan,
    marginHorizontal: 50,
    marginTop: 200,
    marginBottom: 250,
    padding: 0,
    borderRadius: 30,
  },
  modalView: {
    height: 350,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  modalName: {
    textAlign: 'center',
  },
  modalInfo: {},
})

export default NewSongPact
