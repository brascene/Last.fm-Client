import { Alert } from 'react-native'

const createOptions = options => {
  switch (options.length) {
    case 0:
      return [{ text: options[0]}];
    case 1:
      return [
        { text: options[0] },
        {
          text: options[1],
          style: "cancel"
        }
      ];
    default:
      return [{ text: "Done" }];
  }
};

const ScreenAlert = (title, message, options) =>
  Alert.alert(title, message, createOptions(options), { cancelable: false });

export default ScreenAlert;