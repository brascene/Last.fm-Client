import { StyleSheet, Dimensions } from 'react-native'

const w = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2a39f',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: w * 0.5,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#ffffff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: 80,
  },
})

export default styles
