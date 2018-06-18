// @flow

import * as React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function ExampleButton({
  onPress,
  title,
  disabled
}: {
  onPress: () => void,
  title: string,
  disabled?: boolean
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? { backgroundColor: '#dddddd', borderColor: '#aaaaaa' } : null
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, disabled ? { backgroundColor: '#dddddd' } : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#1790c7',
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#27a0d7',
    padding: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
