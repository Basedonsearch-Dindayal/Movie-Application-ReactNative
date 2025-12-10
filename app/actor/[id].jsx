import { useLocalSearchParams } from "expo-router";
import CastScreen from "../../screens/CastScreen"

const Actor=()=>{
    const {id} = useLocalSearchParams()
    return (
        <>
        <CastScreen id={id}/>
        </>
    )
}
export default Actor;