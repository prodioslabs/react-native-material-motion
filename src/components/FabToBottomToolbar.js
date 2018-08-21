import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import { uniqueKey } from '../util';
import Fab from './Fab';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const MOVE_STOP = 0.2;
const TRANSFORM_STOP = 0.6;
const ANIMATION_DURATION = 750;
const ANIMATION_EASING = Easing.bezier(0.4, 0.0, 0.2, 1);

const FAB_SIZE = 56;
const FAB_CONTAINER_PADDING = 8;

const INITIAL_FAB_CONTAINER_WIDTH = FAB_SIZE + FAB_CONTAINER_PADDING;
const INITIAL_FAB_CONTAINER_HEIGHT = FAB_SIZE + FAB_CONTAINER_PADDING;
const INITIAL_FAB_CONTAINER_POSITION_RIGHT = 16;
const INTIAL_FAB_CONTAINER_POSITION_BOTTOM = 16;
const FINAL_FAB_CONTAINER_WIDTH = WINDOW_WIDTH;
const FINAL_FAB_CONTAINER_HEIGHT = 64;
const FINAL_FAB_CONTAINER_POSITION_RIGHT = 64;
const FINAL_FAB_CONTAINER_POSITION_BOTTOM = 0;

const INITIAL_FAB_SCALE = 1;
const INITIAL_FAB_ICON_OPACITY = 1;
const FINAL_FAB_SCALE = 15;
const FINAL_FAB_ICON_OPACITY = 0;

const INITIAL_MENU_CONTAINER_OPACITY = 0;
const FINAL_MENU_CONTAINER_OPACITY = 1;
const INITIAL_MENU_CONTAINER_SCALE = 0.95;
const FINAL_MENU_CONTAINER_SCALE = 1;

const TRANSLATE_CURVE = Easing.bezier(0, 0.5, 0.5, 1);

class FabToBottomToolbar extends React.Component {
  static propTypes = {
    fabIcon: PropTypes.node.isRequired,
    renderItems: PropTypes.func,
    rippleColor: PropTypes.string,
    itemIconColor: PropTypes.string,
  };

  static defaultProps = {
    renderItems: () => [],
    rippleColor: '#fff',
    itemIconColor: 'rgba(0, 0, 0, 0.97)',
  };

  state = {
    toolbarShown: false,
  };

  animationProgress = new Animated.Value(0);

  showToolbar = () => {
    this.setState({ toolbarShown: true }, () => {
      Animated.timing(this.animationProgress, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      }).start();
    });
  };

  hideToolbar = () => {
    this.setState({ toolbarShown: false }, () => {
      Animated.timing(this.animationProgress, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      }).start();
    });
  };

  render() {
    const INPUT_RANGE = [0, MOVE_STOP, TRANSFORM_STOP, 1];

    const fabContainerWidth = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_CONTAINER_WIDTH,
        INITIAL_FAB_CONTAINER_WIDTH,
        FINAL_FAB_CONTAINER_WIDTH,
        FINAL_FAB_CONTAINER_WIDTH,
      ],
    });

    const fabContainerHeight = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_CONTAINER_HEIGHT,
        INITIAL_FAB_CONTAINER_HEIGHT,
        FINAL_FAB_CONTAINER_HEIGHT,
        FINAL_FAB_CONTAINER_HEIGHT,
      ],
    });

    const fabContainerPositionRight = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [INITIAL_FAB_CONTAINER_POSITION_RIGHT, FINAL_FAB_CONTAINER_POSITION_RIGHT, 0, 0],
    });

    const fabContainerPositionBottom = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INTIAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM,
      ],
      easing: TRANSLATE_CURVE,
    });

    const fabScale = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [INITIAL_FAB_SCALE, INITIAL_FAB_SCALE, FINAL_FAB_SCALE, FINAL_FAB_SCALE],
    });

    const fabIconOpacity = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY,
      ],
    });

    const menuContainerOpacity = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_MENU_CONTAINER_OPACITY,
        INITIAL_MENU_CONTAINER_OPACITY,
        FINAL_MENU_CONTAINER_OPACITY,
        FINAL_MENU_CONTAINER_OPACITY,
      ],
    });
    const menuContainerScale = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_MENU_CONTAINER_SCALE,
        INITIAL_MENU_CONTAINER_SCALE,
        INITIAL_MENU_CONTAINER_SCALE,
        FINAL_MENU_CONTAINER_SCALE,
      ],
    });

    const {
      fabIcon, renderItems, rippleColor, itemIconColor,
    } = this.props;
    const { toolbarShown } = this.state;

    const background = Platform.OS === 'ios' ? null : TouchableNativeFeedback.Ripple(rippleColor, true);

    return (
      <React.Fragment>
        <Animated.View
          style={[
            styles.fabContainer,
            {
              width: fabContainerWidth,
              height: fabContainerHeight,
              right: fabContainerPositionRight,
              bottom: fabContainerPositionBottom,
            },
          ]}
        >
          <Fab
            icon={fabIcon}
            buttonSize={FAB_SIZE}
            buttonStyle={{
              transform: [{ scale: fabScale }],
            }}
            iconContainerStyle={{ opacity: fabIconOpacity }}
            onPress={this.showToolbar}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: menuContainerOpacity,
              transform: [{ scale: menuContainerScale }],
            },
          ]}
          pointerEvents={toolbarShown ? 'auto' : 'none'}
        >
          {renderItems({ hideToolbar: this.hideToolbar }).map(item => (
            <Touchable
              key={uniqueKey()}
              onPress={item.onPress}
              background={background}
              style={styles.menuButton}
            >
              {React.cloneElement(item.icon, {
                size: 24,
                color: itemIconColor,
              })}
            </Touchable>
          ))}
        </Animated.View>
      </React.Fragment>
    );
  }
}

export default FabToBottomToolbar;

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    height: FINAL_FAB_CONTAINER_HEIGHT,
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  menuButton: {
    padding: 4,
  },
});
