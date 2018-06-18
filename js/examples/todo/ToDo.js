// @flow

import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './Redux'
import ToDoList from './ToDoList'
import Header from './Header'

export default function ToDo() {
  return (
    <Provider store={store}>
      <View style={styles.mainView}>
        <Header style={styles.header} />
        <ToDoList style={styles.list} />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  header: {},
  list: { flex: 1 }
})
