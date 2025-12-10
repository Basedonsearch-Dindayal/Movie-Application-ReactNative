import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Text, View } from "react-native"

const { width, height } = Dimensions.get('window');
const circleSize = width * 0.2;
const Loading = () => {
    const scaleAnim = useRef(new Animated.Value(0)).current; // Start with a scale of 0
    useEffect(() => {
        // 2. Define the Animation Sequence
        const animate = () => {
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 0.7, // Scale up to full size
              duration: 700, // Duration for scaling up
              easing: Easing.ease, // Smooth easing
              useNativeDriver: true, // Offload animation to native thread
            }),
            Animated.timing(scaleAnim, {
              toValue: 0, // Scale down slightly (or back to 0 for fade effect)
              duration: 700, // Duration for scaling down
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]).start(() => animate()); // Loop the animation
        };
    
        animate(); // Start the animation on component mount
        
        // Cleanup function: stop animation when component unmounts
        return () => {
          scaleAnim.stopAnimation(); 
        };
      }, []); // Run effect only once on mount
    return (
        <>
            <View style={{ height, width, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View
                    style={[
                        {
                            borderColor: 'yellow',
                            borderWidth: 4,
                            width: circleSize,
                            height: circleSize,
                            borderRadius: circleSize / 2, // Make it a perfect circle
                            transform: [{ scale: scaleAnim }], // Bind the animated value to the scale transform
                        },
                    ]}
                />
            </View>
        </>
    )
}
export default Loading;