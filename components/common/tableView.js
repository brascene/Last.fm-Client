import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet } from 'react-native'

export default class TableView extends React.Component {
  render() {
    const { cell, separator } = this.props
    const Cell = cell
    const Separator = separator
    const { dataSource, didSelectRow } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource} 
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
