import { Dimensions, Text, View } from "react-native"

const { width, height } = Dimensions.get('window');
const Error = () => {
    return (
        <>
            <View style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Error
                </Text>
            </View>
        </>
    )
}
export default Error;