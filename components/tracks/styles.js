import { StyleSheet, Dimensions } from 'react-native'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

const width = w * 0.8
const height = h * 0.25

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
    width: w / 2.5,
    height: w / 2.5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: w / 5,
  },
  cellSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  trackData: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  loveBtn: {
    marginLeft: 0,
    marginTop: 8,
    width: 0.6 * w / 2.8,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableAndButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
  },
  pagingBtn: {
    width: 0.3 * w,
    marginBottom: 5,
  },
  loader: {
    position: 'absolute',
    top: h / 3,
  },
  noDataMsg: {
    position: 'absolute',
    top: h / 3 + 50,
    color: 'red',
    fontWeight: '400',
    fontSize: 14,
  },
})

export default styles
