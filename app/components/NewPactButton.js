import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import NativeModal from 'react-native-modal'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// COMPONENTS
import AppText from '../components/AppText'
import ButtonIcon from '../components/ButtonIcon'
import ConfirmModal from './ConfirmModal'

// CONFIG
import colors from '../config/colors'

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
        {/* <View style={styles.imgView}>
          <Image
            style={{ width: 165, height: 165, opacity: 0.7 }}
            source={image}
          />
        </View> */}
        <View style={styles.overlayView}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons name="pen-plus" size={40} color="black" />
          </View>
          <View style={styles.textView}>
            <AppText
              style={styles.title}
              fontWeight="bold"
              fontSize={20}
              color={colors.black}
            >
              {name}
            </AppText>
            <AppText
              style={{ textAlign: 'center' }}
              fontSize={16}
              fontWeight="bold"
              color={colors.black}
            >
              Short description of this pact
            </AppText>
          </View>
          <View style={styles.helperIconView}>
            <ButtonIcon
              name="information"
              backgroundColor="transparent"
              size={35}
              iconColor={colors.green}
              // iconColor="#42C1FC"
              onPress={() => handleInfoPress()}
            />
          </View>
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
    width: 165,
    elevation: 1,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  buttonView: {
    display: 'flex',
    width: 155,
    height: 155,
    backgroundColor: colors.white,
  },
  // imgView: {
  //   width: 165,
  //   opacity: 0.4,
  // },
  overlayView: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  iconView: {
    alignItems: 'center',
    marginTop: 15,
  },

  textView: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  helperIconView: {
    position: 'absolute',
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
