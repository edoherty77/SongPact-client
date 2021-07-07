import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import AppButton from '../../components/AppButton'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import PactModel from '../../api/pacts'
import store from '../../stores/CreatePactStore'
import Signature from 'react-native-signature-canvas'
import currentUser from '../../stores/UserStore'
import * as Print from 'expo-print'
import * as MailComposer from 'expo-mail-composer'
import { WebView } from 'react-native-webview'
import moment from 'moment'

export default function ReviewAndSign({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [pactObj, setPactObj] = useState('')
  const [signature, setSign] = useState(null)
  const { pact, acceptPact } = route.params

  // const createPDF = async (signature) => {
  //   setSign(signature)
  //   let checkProducer = false
  //   if (currentUser._id === pact.producer.user) {
  //     checkProducer = true
  //   }
  //   const obj = {
  //     id: pact._id,
  //     signatureImg: signature,
  //     user: currentUser._id,
  //     status: 2,
  //     checkProducer: checkProducer,
  //   }
  //   try {
  //     await PactModel.update(obj)
  //     const { uri } = await Print.printToFileAsync({ html: htmlContent })

  //     // if (currentUser._id === pact.initBy.user) {
  //     await MailComposer.composeAsync({
  //       attachments: [uri],
  //       recipients: ['edoherty77@gmail.com'],
  //     })
  //     // }
  //     await navigation.navigate('Dashboard')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const deletePact = async () => {
    const obj = {
      id: pact._id,
      users: pact.users,
    }
    await PactModel.delete(obj)
    console.log('trash')
    navigation.navigate('Dashboard')
  }

  const handleEmpty = () => {
    console.log('Empty')
  }

  const style = `.m-signature-pad--footer
  .button {
    background-color: red;
    color: #FFF;
  }`

  return (
    <Screen>
      <Header
        back={() => navigation.navigate('ViewContract')}
        icon="arrow-back"
        title="ViewContract"
      />
      <View style={{ flex: 1 }}>
        {/* <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={'contain'}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null}
        </View> */}
        <Signature
          onOK={acceptPact}
          onEmpty={handleEmpty}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})
