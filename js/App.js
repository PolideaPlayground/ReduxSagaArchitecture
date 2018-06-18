// @flow

import * as React from 'react'
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native'
import SlideIn from './navigators/SlideIn'
import ToDoList from './examples/todo/ToDoList'
import Saga from './examples/saga/Saga'

type State = {
  example: Example
}

type Example = 'todo' | 'saga'

function ExampleButton({ onPress, title }: { onPress: () => void, title: string }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default class App extends React.PureComponent<void, State> {
  state = { example: 'todo' }

  renderContent() {
    const example = this.state.example
    switch (example) {
      case 'todo':
        return <ToDoList key={example} />
      case 'saga':
        return <Saga key={example} />
    }
    throw Error('Unexpected example provided')
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <SlideIn style={styles.content}>{this.renderContent()}</SlideIn>
        <View style={styles.buttonGroup}>
          <ExampleButton
            title={'TODO List'}
            onPress={() => {
              this.setState({ example: 'todo' })
            }}
          />
          <ExampleButton
            title={'Simple Saga'}
            onPress={() => {
              this.setState({ example: 'saga' })
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, margin: 30 },
  content: { flex: 1 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-evenly' },
  button: {
    borderColor: '#1790c7',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#27a0d7',
    padding: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
