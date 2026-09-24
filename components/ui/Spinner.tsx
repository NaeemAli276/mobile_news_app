import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle, StyleProp } from 'react-native';

type SpinnerProps = {
  duration?: number;      // ms per full rotation
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Spinner({ duration = 2000, children, style }: SpinnerProps) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop(); // cleanup
  }, [duration, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[style, { transform: [{ rotate }] }]}>
      {children}
    </Animated.View>
  );
}