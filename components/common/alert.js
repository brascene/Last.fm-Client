import { Alert } from 'react-native'

const getOptions = (options, callback) => {
  switch (options.length) {
    case 0:
      return [{ text: 'OK', onPress: () => callback && callback() }]
    case 1:
      return [
        { text: options[0], onPress: () => callback() },
        {
          text: options[1],
          style: 'cancel',
        },
      ]
    default:
      return [{ text: 'Done' }]
  }
}

const ScreenAlert = (title, msg, opt, callback) => Alert.alert(title, msg, getOptions(opt, callback), { cancelable: false })

export default ScreenAlert
