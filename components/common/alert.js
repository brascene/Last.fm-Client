import { Alert } from 'react-native'

const getOptions = (options) => {
  switch (options.length) {
    case 0:
      return [{ text: options[0] }]
    case 1:
      return [
        { text: options[0] },
        {
          text: options[1],
          style: 'cancel',
        },
      ]
    default:
      return [{ text: 'Done' }]
  }
}

const ScreenAlert = (title, msg, opt) => Alert.alert(title, msg, getOptions(opt), { cancelable: false })

export default ScreenAlert
