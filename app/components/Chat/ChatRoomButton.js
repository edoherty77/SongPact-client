import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

// COMPONENTS
import AppText from '../AppText'
import ButtonIcon from '../ButtonIcon'
import UserIcon from '../UserIcon'

// CONFIG
import colors from '../../config/colors'

const ChatRoomButton = ({ lastMessage, members, noIcon, viewChatRoom }) => {
  return (
    <View style={styles.chatButton}>
      <View style={styles.contactView}>
        <View style={styles.picContainer}>
          {members[0].googlePhotoUrl ? (
            <Image
              source={{ uri: members[0].googlePhotoUrl }}
              style={styles.image}
            />
          ) : (
            <UserIcon
              title={members[0].name}
              style={styles.image}
              fontSize={20}
              color={colors.white}
              backgroundColor={colors.black}
            />
          )}
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.name}>{members[0].name}</AppText>
          {lastMessage !== undefined && (
            <AppText style={styles.message}>{lastMessage.message}</AppText>
          )}
          <View style={styles.infoButtonContainer}></View>
        </View>
      </View>
      <View style={styles.iconView}>
        {!noIcon && (
          <ButtonIcon
            name="chevron-right"
            backgroundColor={'transparent'}
            size={45}
            iconColor={colors.black}
            onPress={viewChatRoom}
          />
        )}
      </View>
    </View>
  )
}

export default ChatRoomButton

const styles = StyleSheet.create({
  chatButton: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 0,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  contactView: {
    flexDirection: 'row',
  },
  picContainer: {
    height: 42,
    width: 42,
    marginRight: 13,
    borderRadius: 50,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
    margin: 0,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 3,
  },
  message: {
    color: '#222222',
    opacity: 0.5,
    marginBottom: 2,
  },
  infoButtonContainer: {
    flexDirection: 'row',
  },
  iconView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // right: 0,
    // top: 5,
  },
})
