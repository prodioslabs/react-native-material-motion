import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, TouchableWithoutFeedback, Text, Easing,
} from 'react-native';

import { uniqueKey } from '../util';
import Fab from './Fab';

const MAIN_FAB_SIZE = 56;
const SMALL_FAB_SIZE = 44;
const FAB_GAP = 16;

const ANIMATION_DURATION = 300;
const ANIMATION_EASING = Easing.bezier(0.4, 0.0, 0.2, 1);

class FabExpandingMenu extends React.Component {
  static propTypes = {
    fabIcon: PropTypes.node.isRequired,
    fabIconMenuExpanded: PropTypes.node,
    overlayStyle: PropTypes.oneOfType([PropTypes.shape, PropTypes.number]),
    renderItems: PropTypes.func,
    rotate: PropTypes.bool,
  };

  static defaultProps = {
    fabIconMenuExpanded: null,
    overlayStyle: null,
    renderItems: () => [],
    rotate: false,
  };

  animationProgress = new Animated.Value(0);

  state = {
    menuShown: false,
  };

  toggleMenu = () => {
    this.setState(
      state => ({ menuShown: !state.menuShown }),
      () => {
        const { menuShown } = this.state;
        if (menuShown) {
          Animated.timing(this.animationProgress, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING,
          }).start();
        } else {
          Animated.timing(this.animationProgress, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING,
          }).start();
        }
      },
    );
  };

  hideMenu = () => {
    this.setState({ menuShown: false }, () => {
      Animated.timing(this.animationProgress, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      }).start();
    });
  };

  render() {
    const {
      fabIcon, fabIconMenuExpanded, overlayStyle, renderItems, rotate,
    } = this.props;
    const { menuShown } = this.state;

    const items = renderItems({ hideMenu: this.hideMenu });

    const mainIcon = fabIconMenuExpanded ? (menuShown ? fabIconMenuExpanded : fabIcon) : fabIcon;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          onPress={() => {
            this.toggleMenu();
          }}
        >
          <Animated.View
            pointerEvents={menuShown ? 'auto' : 'none'}
            style={[
              styles.overlay,
              overlayStyle,
              {
                opacity: this.animationProgress,
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.container,
            {
              height: items.length * (SMALL_FAB_SIZE + FAB_GAP) + MAIN_FAB_SIZE,
            },
          ]}
        >
          {items.map((item, index) => (
            <Animated.View
              key={uniqueKey()}
              style={[
                styles.smallFabContainer,
                {
                  right: (MAIN_FAB_SIZE - SMALL_FAB_SIZE) / 2,
                  top: this.animationProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      items.length * (SMALL_FAB_SIZE + FAB_GAP),
                      index * (SMALL_FAB_SIZE + FAB_GAP),
                    ],
                  }),
                  opacity: this.animationProgress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0, 1],
                  }),
                },
              ]}
            >
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>

              <Fab icon={item.icon} buttonSize={SMALL_FAB_SIZE} onPress={item.onPress} />
            </Animated.View>
          ))}
          <Fab
            icon={mainIcon}
            onPress={this.toggleMenu}
            buttonStyle={{
              position: 'absolute',
              right: 0,
              top: items.length * (SMALL_FAB_SIZE + FAB_GAP),
              transform: [
                {
                  rotate: rotate
                    ? this.animationProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    })
                    : '0deg',
                },
              ],
            }}
          />
        </View>
      </React.Fragment>
    );
  }
}

export default FabExpandingMenu;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  smallFabContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 16,
  },
  name: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.87)',
  },
});
