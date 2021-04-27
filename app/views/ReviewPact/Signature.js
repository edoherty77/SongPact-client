import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

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

export default function ReviewAndSign({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [signature, setSign] = useState(null)
  const ref = useRef(null)
  const { pact } = route.params

  useEffect(() => {
    if (pact !== undefined) {
      console.log(pact)
    }
  }, [])

  const signPact = async (signature) => {
    const signatureImg = signature.split(',')[1]
    const obj = {
      id: pact._id,
      signatureImg: signatureImg,
      user: currentUser._id,
      status: 2,
    }
    try {
      await PactModel.update(obj)
    } catch (error) {
      console.log(error)
    }
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
      <View style={{ flex: 1 }}>
        <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={'contain'}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null}
        </View>
        <Signature
          onOK={signPact}
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

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: 'orange',
    paddingHorizontal: 20,
  },
  dataBlock: {
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  header: {},
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  artistNameText: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recordDataContainer: {
    // backgroundColor: 'green',
    marginLeft: 10,
  },
  recordDataText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  percView: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  perc: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  nextButton: {
    marginBottom: 10,
    borderRadius: 50,
    height: 45,
    backgroundColor: colors.red,
    width: '50%',
  },
})
