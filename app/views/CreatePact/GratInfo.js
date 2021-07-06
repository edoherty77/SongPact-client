import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// CONFIG
import colors from '../../config/colors'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import AppButton from '../../components/AppButton'
import { RadioButton } from 'react-native-paper'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import AppTextInput from '../../components/AppTextInput'

// FORM
import { Formik, FieldArray } from 'formik'
import {
  SubmitButton,
  AppFormSelect,
  AppFormPercent,
} from '../../components/forms'
import * as Yup from 'yup'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

// const validationSchema = Yup.object().shape({
//   recordTitle: Yup.string().required().label('Record Title'),
//   role: Yup.string().required().label('role'),

// })

export default function GratInfo({ navigation }) {
  const [producer, setProducer] = React.useState('')

  function nextScreen(values) {
    console.log(values)
    currentPact.setProducer(values)
    navigation.navigate('ProducerInfo')
  }

  useEffect(() => {
    console.log('producer', producer)
  }, [producer])
  return (
    <Screen>
      <Header
        title="Create a new pact"
        subTitle="Gratuity Info"
        icon="arrow-back"
        back={() => navigation.navigate('Collabs')}
      />
      <AppProgressBar value={30} />
      <Separator />
      <View style={styles.mainView}>
        <View style={styles.sectionView}>
          <AppText fontWeight="bold" style={styles.sectionHeader}>
            Producer Info
          </AppText>
          <View>
            <AppText style={styles.text}>
              Who is the producer for this pact?
            </AppText>
            <AppFormSelect
              data={currentPact.users}
              setItem={setProducer}
              item={producer}
            />
            <View style={styles.percentView}>
              <View style={styles.left}>
                <AppText style={styles.text}>Producer advance</AppText>
                <AntDesign
                  name="questioncircle"
                  size={14}
                  color="black"
                  style={styles.icon}
                />
              </View>
              <View style={styles.right}>
                <AppFormPercent />
              </View>
            </View>
            <View style={styles.percentView}>
              <View style={styles.left}>
                <AppText style={styles.text}>Producer royalty</AppText>
                <AntDesign
                  name="questioncircle"
                  size={14}
                  color="black"
                  style={styles.icon}
                />
              </View>
              <View style={styles.right}>
                <AppFormPercent />
              </View>
            </View>
            <View style={styles.percentView}>
              <View style={styles.left}>
                <AppText style={styles.text}>Producer publish</AppText>
                <AntDesign
                  name="questioncircle"
                  size={14}
                  color="black"
                  style={styles.icon}
                />
              </View>
              <View style={styles.right}>
                <AppFormPercent />
              </View>
            </View>
            <View>
              <View style={styles.left}>
                <AppText style={styles.text}>Producer credit</AppText>
                <AntDesign
                  name="questioncircle"
                  size={14}
                  color="black"
                  style={styles.icon}
                />
              </View>
              <View style={styles.right}>
                <AppTextInput style={styles.input} />
              </View>
            </View>
          </View>
        </View>
        <Separator />
        <View style={styles.sectionView}>
          <AppText fontWeight="bold" style={styles.sectionHeader}>
            Performer Info
          </AppText>
          <View>
            <FlatList
              data={currentPact.collaborators}
              keyExtractor={(data) => data._id}
              renderItem={({ item }) => (
                <View style={styles.percentView}>
                  <View style={styles.left}>
                    <AppText style={styles.text}>{item.name}</AppText>
                    <AntDesign
                      name="questioncircle"
                      size={14}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <View style={styles.right}>
                    <AppFormPercent />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    padding: 10,
    marginHorizontal: 30,
  },
  sectionView: {
    // flex: 1,
  },
  sectionHeader: {
    marginVertical: 15,
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
  },
  percentView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
})
