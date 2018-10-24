import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet, Keyboard } from 'react-native'

export default class TableView extends React.Component {
  state = {
    keyboardOpen: false
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.setState({ keyboardOpen: true })
  }

  _keyboardDidHide () {
    this.setState({ keyboardOpen: true })
  }

  closeKeyboard = () => {
    this.setState({
      keyboardOpen: false
    })
    Keyboard.dismiss()
  }

  render() {
    const { cell, separator } = this.props
    const Cell = cell
    const Separator = separator
    const { dataSource, didSelectRow } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          keyboardDismissMode='interactive'
          onScrollBeginDrag={this.closeKeyboard}
          data={dataSource} 
          extraData={dataSource}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => <Cell {...item} didSelectRow={didSelectRow} />}
        />
      </View>
    )
  }
}

TableView.propTypes = {
  dataSource: PropTypes.array,
  didSelectRow: PropTypes.func,
  cell: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
