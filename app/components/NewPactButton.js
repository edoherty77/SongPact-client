import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'react-native'

import NativeModal from 'react-native-modal'
import AppText from '../components/AppText'
import ButtonIcon from '../components/ButtonIcon'
import colors from '../config/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ConfirmModal from './ConfirmModal'

const NewPactButton = ({
  name,
  image,
  info,
  onPress,
  text,
  confirm,
  deny,
  isVisible,
  onBackdropPress,
}) => {
  const [isModalVisible, setModalVisible] = useState(false)

  function handleInfoPress() {
    setModalVisible(true)
  }

  return (
    <TouchableOpacity style={styles.newPactButton} onPress={onPress}>
      <View style={styles.buttonView}>
        <View style={styles.imgView}>
          <Image
            style={{ width: 175, height: 175, opacity: 0.7 }}
            source={image}
          />
        </View>
        <View style={styles.textView}>
          <AppText
            style={{ textAlign: 'center' }}
            fontWeight="bold"
            fontSize={35}
            color={colors.lttan}
          >
            {name}
          </AppText>
        </View>
        <View style={styles.iconView}>
          <ButtonIcon
            name="information"
            backgroundColor="transparent"
            size={40}
            iconColor="#42C1FC"
            onPress={() => handleInfoPress()}
          />
        </View>
      </View>
      <ConfirmModal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        text={text}
        confirm={confirm}
        deny={deny}
      />
      <NativeModal
        style={styles.infoModal}
        hasBackdrop={true}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <AppText style={styles.modalName} fontSize={25}>
            {name}
          </AppText>
          <AppText style={styles.modalInfo} fontSize={25}>
            {info}
          </AppText>
        </View>
      </NativeModal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  newPactButton: {
    display: 'flex',
    width: 175,
    elevation: 1,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonView: {
    display: 'flex',
    width: 175,
    backgroundColor: colors.red,
  },
  imgView: {
    // backgroundColor: 'white',
    width: 175,
    opacity: 0.4,
  },
  textView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    position: 'absolute',
    // backgroundColor: 'purple',
    bottom: 0,
    right: 0,
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

export default NewPactButton
