import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const Fab = ({
  buttonStyle,
  buttonSize,
  buttonColor,
  icon,
  iconColor,
  rippleColor,
  iconContainerStyle,
  onPress,
}) => {
  const background = Platform.OS === 'ios' ? null : TouchableNativeFeedback.Ripple(rippleColor, true);

  return (
    <Animated.View
      style={[
        styles.container,
        buttonStyle,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: buttonColor,
        },
      ]}
    >
      <Touchable background={background} onPress={onPress}>
        <Animated.View
          style={[
            styles.iconContainer,
            iconContainerStyle,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
          ]}
        >
          {React.cloneElement(icon, {
            size: 24,
            color: iconColor,
          })}
        </Animated.View>
      </Touchable>
    </Animated.View>
  );
};

Fab.propTypes = {
  icon: PropTypes.node.isRequired,
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iconContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  buttonSize: PropTypes.number,
  buttonColor: PropTypes.string,
  iconColor: PropTypes.string,
  rippleColor: PropTypes.string,
  onPress: PropTypes.func,
};

Fab.defaultProps = {
  buttonStyle: null,
  iconContainerStyle: null,
  buttonSize: 56,
  buttonColor: '#FAAB1A',
  iconColor: 'rgba(0, 0, 0, 0.97)',
  rippleColor: '#fff',
  onPress: () => null,
};

export default Fab;

const styles = StyleSheet.create({
  container: {
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
