// @flow

import * as React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import SlideIn from './navigators/SlideIn'
import ToDo from './examples/todo/ToDo'
import Saga from './examples/saga/Saga'
import Button from './common/Button'

type State = {
  example: Example
}

type Example = 'todo' | 'saga'

export default class App extends React.PureComponent<void, State> {
  state = { example: 'todo' }

  renderContent() {
    const example = this.state.example
    switch (example) {
      case 'todo':
        return <ToDo key={example} />
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
          <Button
            title={'Notes'}
            onPress={() => {
              this.setState({ example: 'todo' })
            }}
          />
          <Button
            title={'Saga'}
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
  safeArea: { flex: 1 },
  content: { flex: 1, margin: 5 },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#dddddd',
    padding: 5
  }
})
