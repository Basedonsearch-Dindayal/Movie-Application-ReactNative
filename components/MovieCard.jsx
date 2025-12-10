import { useRouter } from "expo-router";
import { Dimensions, Image, Text, TouchableWithoutFeedback } from "react-native"
import { image500 } from "../api/moviedb";

var {width,height} = Dimensions.get('window');
const MovieCard = ({data})=>{
    const router  = useRouter();
    const handleClick=()=>{
        router.navigate()
    }
    return (
        <>
        <TouchableWithoutFeedback onPress={()=>router.navigate(`/movie/${data.id}`)}>
            <Image source={{uri:image500(data.poster_path)}} style={{width:width*0.6, height:height*0.4, borderRadius:20, marginRight:10}}/>
        </TouchableWithoutFeedback>
        </>
    )
}
export default MovieCard;