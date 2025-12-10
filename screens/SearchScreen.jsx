import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { image500, searchMoviesApi } from "../api/moviedb";
import Loading from "../components/Loading";
import { StatusBar } from "expo-status-bar";
const { width, height } = Dimensions.get('window');
const SearchScreen = () => {
    const [debouncedSearch, setDebouncedSearch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debounceDelay = 500;
    const router = useRouter()
    const [movies, setMovies] = useState([])
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const searchMovie = useCallback(async (query) => {
        if (!query){
            setMovies([]);
            return;
        }else{
            try{
                setLoading(true);
                const dsearch = await searchMoviesApi(query);
                setMovies(dsearch.data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
    }, [])
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, debounceDelay);
        return () => clearTimeout(handler);
    }, [searchTerm])
    useEffect(() => {
        searchMovie(debouncedSearch);
    }, [debouncedSearch, searchMovie])
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#262626' }}>
                <StatusBar style="light"/>
                <View style={{ marginHorizontal: 4, marginBottom: 3, display: "flex", padding: 5, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#737373', borderRadius: 50 }}>
                    <TextInput onChangeText={(e) => setSearchTerm(e)} placeholder="Search Movie" placeholderTextColor={'lightgray'} style={{ paddingBottom: 1, paddingLeft: 6, flex: 2, fontSize: 20, fontWeight: 'semibold', color: 'white', letterSpacing: 1 }} />

                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#737373', borderRadius: 100 }} onPress={() => router.navigate('/')}>
                        <Ionicons name="close" size={25} color={'white'} />
                    </TouchableOpacity>
                </View>
                {loading && <Loading/>}
                {movies.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
                        <Text style={{ color: 'white', fontWeight: 'semibold', marginLeft: 2 }}>Results ({movies.length})</Text>
                        <View style={{ marginTop: 6, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {movies.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ marginVertical: 6, marginHorizontal: 4, flexDirection: 'row', alignItems: 'center', }} onPress={() => router.navigate(`/movie/${item.id}`)}>
                                        <View>
                                            <Image source={{uri: image500(item.poster_path)}}
                                                style={{ width: width * 0.44, height: height * 0.3, borderRadius: 20, marginRight: 10 }} />
                                            <Text style={{ color: '#d4d4d4', marginLeft: 10, textAlign: 'center' }}>{item.original_title.length>14?item.original_title.slice(0,14)+'...':item.original_title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/searchMovie.png')} />
                    </View>
                )}
            </SafeAreaView>
        </>
    )
}
export default SearchScreen;