import React from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NativeModal from 'react-native-modal'

// COMPONENTS
import AppText from './AppText'
import AppButton from './AppButton'
import Separator from './Separator'

// CONFIG
import colors from '../config/colors'

export default function SignatureModal({
  name,
  isVisible,
  setVisible,
  confirmSignature,
  email,
  sig,
  setSig,
}) {
  return (
    <NativeModal
      style={styles.modal}
      hasBackdrop={true}
      isVisible={isVisible}
      onBackdropPress={() => {
        setVisible(false), setSig('')
      }}
    >
      <View style={styles.mainView}>
        <View style={styles.headerView}>
          <AppText style={styles.modalHeader} fontSize={25}>
            Sign Contract
          </AppText>
        </View>
        <Separator />
        <View style={styles.bodyView}>
          <AppText fontSize={16} style={styles.bodyHeader}>
            Type your legal name to complete signature:
          </AppText>
          <View style={styles.inputView}>
            <TextInput
              placeholder={name}
              style={styles.input}
              value={sig}
              onChangeText={(text) => setSig(text)}
              autoCapitalize
            />
          </View>
          <AppText style={styles.agreement} fontSize={12}>
            I,{' '}
            <AppText fontSize={12} fontWeight="bold">
              {name}
            </AppText>{' '}
            ({email}), certify that I have read the pact, and understand that
            clicking “CONFIRM SIGNATURE” constitutes a legally binding
            signature.
          </AppText>
          <View style={styles.previewView}>
            <View style={styles.previewHeader}>
              <AppText>SIGNATURE PREVIEW</AppText>
            </View>
            <View style={styles.previewBody}>
              <View style={styles.sigView}>
                <AppText>x</AppText>
                <AppText style={styles.sig}>{sig}</AppText>
              </View>
              <AppText fontSize={12}>{name}</AppText>
              <AppText fontSize={12}>{email}</AppText>
            </View>
          </View>
          <AppButton
            textColor="white"
            title="Confirm Signature"
            style={styles.btn}
            onPress={() => confirmSignature(sig)}
          />
        </View>
      </View>
      <View style={styles.closeView}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false), setSig('')
          }}
        >
          <MaterialCommunityIcons name="close" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    marginHorizontal: 25,
    marginTop: 100,
    marginBottom: 220,
    padding: 0,
    borderRadius: 10,
  },
  mainView: {
    height: 480,
    display: 'flex',
    alignItems: 'center',
  },
  headerView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalHeader: {
    fontWeight: 'bold',
  },
  bodyView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  bodyHeader: {
    marginVertical: 20,
    fontWeight: '600',
  },
  inputView: {
    paddingBottom: 5,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: colors.green,
    borderBottomWidth: 1,
  },
  input: {
    // backgroundColor: 'blue',
    height: 30,
  },
  agreement: {
    marginBottom: 30,
  },
  previewView: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 25,
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  previewBody: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 10,
  },
  sigView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  sig: {
    position: 'absolute',
    left: 10,
    top: -5,
    marginLeft: 10,
    fontFamily: 'Baskerville-SemiBoldItalic',
    fontSize: 25,
  },
  btn: {
    backgroundColor: colors.green,
    width: '100%',
  },
  closeView: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
})
