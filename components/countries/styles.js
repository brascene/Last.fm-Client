import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width * 0.8
const height = Dimensions.get('window').height * 0.25

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    width,
    height,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'red',
  },
  searchAndTableContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  cellContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cellText: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 16,
  },
  cellImage: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 35,
  },
  cellSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
})

export default styles
