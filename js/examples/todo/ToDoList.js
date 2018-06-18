// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import { markTask, removeTask } from './Redux'
import type { Task, State } from './Redux'
import Button from '../../common/Button'

type ToDoListArgs = {
  tasks: Array<Task>,
  markTask: typeof markTask,
  removeTask: typeof removeTask
}

function ToDoList({ tasks, markTask, removeTask }: ToDoListArgs) {
  return (
    <FlatList
      style={styles.list}
      data={tasks}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.markButton}
              onPress={() => {
                markTask(item.id)
              }}
            >
              <Text style={item.done ? styles.taskDone : styles.taskInProgress}>
                {(index + 1).toString() + '. ' + item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title={'X'}
              onPress={() => {
                removeTask(item.id)
              }}
              disabled={!item.done}
            />
          </View>
        )
      }}
    />
  )
}

function mapStateToProps(state: State): $Shape<ToDoListArgs> {
  return {
    tasks: state.tasks
  }
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  row: { flex: 1, flexDirection: 'row', backgroundColor: '#eeeeee', marginTop: 10, padding: 10 },
  markButton: { justifyContent: 'center', flex: 1 },
  taskDone: { textDecorationLine: 'line-through' },
  taskInProgress: {}
})

export default connect(
  mapStateToProps,
  { markTask, removeTask }
)(ToDoList)
