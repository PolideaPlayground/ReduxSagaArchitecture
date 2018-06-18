// @flow

import * as React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import type { ViewStyle } from '../types/Style'

type Props = {
  style?: ViewStyle,
  children: React.Element<*>
}

type VisibleComponent = {
  instance: React.Element<*>,
  animation: Animated.Value,
  removing: boolean
}

type State = {
  visibleComponents: Array<VisibleComponent>
}

const EaseIn = {
  toValue: 1,
  useNativeDriver: true,
  duration: 300
}

const EaseOut = {
  toValue: 0,
  useNativeDriver: true,
  duration: 300
}

export default class SlideIn extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    if (props.children.key == null) {
      throw Error("Key must be defined for SlideIn's children")
    }
    this.state = {
      visibleComponents: [
        { instance: props.children, animation: new Animated.Value(1), removing: false }
      ]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.children !== this.props.children &&
      nextProps.children.key !== this.props.children.key
    ) {
      const visibleComponents = this.state.visibleComponents
      const newChild = nextProps.children

      const newComponents = visibleComponents.map(component => {
        if (component.removing) return component

        Animated.timing(component.animation, EaseOut).start(() => {
          this.setState({
            visibleComponents: this.state.visibleComponents.filter(
              component2 => component2.instance.key !== component.instance.key
            )
          })
        })

        return { ...component, removing: true }
      })

      const animation = new Animated.Value(0)
      Animated.timing(animation, EaseIn).start()

      if (newChild.key == null) {
        throw Error("Key must be defined for SlideIn's children")
      }
      newComponents.push({ instance: newChild, animation, removing: false })

      this.setState({
        visibleComponents: newComponents
      })
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.state.visibleComponents.map((component, index) => (
          <Animated.View
            key={component.instance.key}
            style={[
              styles.animatedView,
              {
                opacity: component.animation,
                transform: [
                  {
                    rotate: component.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['2deg', '0deg']
                    })
                  },
                  {
                    translateX: component.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    })
                  },
                  {
                    scale: component.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1]
                    })
                  }
                ]
              }
            ]}
            pointerEvents={index == this.state.visibleComponents.length - 1 ? 'auto' : 'none'}
          >
            {component.instance}
          </Animated.View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
