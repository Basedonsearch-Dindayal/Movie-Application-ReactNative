import { useLocalSearchParams } from "expo-router";
import MovieScreen from "../../screens/MovieScreen"

const Movie =()=>{
    const {id} =  useLocalSearchParams();
    return (
        <>
        <MovieScreen id={id}/>
        </>
    )
}
export default Movie;