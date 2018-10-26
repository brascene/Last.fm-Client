import { StyleSheet, Dimensions } from 'react-native'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

const width = w * 0.8
const height = h * 0.25

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  image: {
    width: w,
    height: h * 0.4
  },
  trackInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10
  },
  text: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 15
  },
  loveBtn: {
    width: 0.5 * w
  },
  loveView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles