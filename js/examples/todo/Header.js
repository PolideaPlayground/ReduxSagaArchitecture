// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet } from 'react-native'
import Button from '../../common/Button'
import type { ViewStyle } from '../../types/Style'
import { addTask } from './Redux'

type Props = {
  addTask: typeof addTask,
  style: ?ViewStyle
}

type State = {
  text: string
}

class Header extends React.Component<Props, State> {
  state = { text: '' }

  _onChangeText = (text: string) => {
    this.setState({ text })
  }

  _onPress = () => {
    const title = this.state.text
    if (!title.length) return
    this.props.addTask(title)
    this.setState({ text: '' })
  }

  render() {
    return (
      <View style={[styles.header, this.props.style]}>
        <TextInput
          style={styles.textInput}
          value={this.state.text}
          onChangeText={this._onChangeText}
        />
        <Button title={'Add'} onPress={this._onPress} disabled={this.state.text.length == 0} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', backgroundColor: '#dddddd' },
  textInput: { flex: 1, paddingLeft: 10, paddingRight: 10 }
})

export default connect(
  null,
  { addTask }
)(Header)
