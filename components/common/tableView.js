import React from 'react'
import PropTypes from 'prop-types'
import {
  View, FlatList, StyleSheet, Keyboard,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class TableView extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldScrollToTop) {
      this.scrollToTop()
    }
  }

  closeKeyboard = () => {
    Keyboard.dismiss()
  }

  scrollToTop = () => {
    this.listRef.scrollToOffset({ x: 0, y: 0, animated: true })
  }

  render() {
    const { cell, separator } = this.props
    const Cell = cell
    const Separator = separator
    const { dataSource } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          ref={x => this.listRef = x}
          keyboardDismissMode="interactive"
          onScrollBeginDrag={this.closeKeyboard}
          data={dataSource}
          extraData={dataSource}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => <Cell {...item} {...this.props} />}
        />
      </View>
    )
  }
}

TableView.propTypes = {
  dataSource: PropTypes.array.isRequired,
  didSelectRow: PropTypes.func.isRequired,
  loveThisTrack: PropTypes.func,
  shouldScrollToTop: PropTypes.bool,
  cell: PropTypes.func.isRequired,
}
