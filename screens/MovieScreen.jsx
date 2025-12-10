import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/MovieList";
import { useRouter } from "expo-router";
import { getMovieCast, getMovieDetails, getSimilarMovies, image500 } from "../api/moviedb";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import Error from "../components/Error";


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function MovieScreen({ id }) {
    const [movieData, setMovieData] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovie,setSimilarMovie] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const handleClick = (actorId) => {
        router.navigate(`/actor/${actorId}`);
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const dmovie = await getMovieDetails(id);
                setMovieData(dmovie.data)
                const dcast = await getMovieCast(id);
                setCast(dcast.data);
                const dsimilar = await getSimilarMovies(id);
                setSimilarMovie(dsimilar.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id])


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {error && <Error/>}
            {loading && !error ? <Loading/> : (
                <>
                    <View style={styles.posterWrapper}>
                        <SafeAreaView style={[styles.header, ios ? null : styles.androidMt3]}>
                            <StatusBar style="light" />
                            <TouchableOpacity style={styles.backButton} onPress={()=>router.navigate('/')}>
                                <Ionicons name="close" size={28} color="white" />
                            </TouchableOpacity>
                        </SafeAreaView>
                        <View>
                            <Image source={{ uri: image500(movieData.poster_path) }} style={{ width, height: height * 0.55 }} />
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>{movieData.original_title}</Text>
                        <Text style={{ color: 'rgb(163, 163, 163)', fontWeight: '600', fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
                            Released • {movieData?.release_date} • {movieData?.runtime} min
                        </Text>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16, marginBottom: 16,
                        }}>
                            {movieData.genres?.map((genre, i) => (
                                <Text key={i} style={{ color: 'rgb(163, 163, 163)', fontWeight: '600', fontSize: 16, textAlign: 'center', marginRight: 8 }}>
                                    {genre.name}{i < movieData.genres.length - 1 ? '  •' : ''}
                                </Text>
                            ))}
                        </View>

                        <Text style={{ color: 'rgb(163, 163, 163)', marginHorizontal: 16, letterSpacing: 0.5, lineHeight: 24, fontSize: 16 }}>
                            {movieData.overview}
                        </Text>
                    </View>

                    <View style={{ marginVertical: 6 }}>
                        <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 4, marginBottom: 5 }}>Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                            {cast?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ marginRight: 16, alignItems: 'center', width: 80 }}
                                        onPress={() => handleClick(item.id)}
                                    >
                                        <View style={{ width: 92, height: 92, borderRadius: 56, backgroundColor: 'rgba(255, 255, 255, 0.35)', marginBottom: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={{ uri: image500(item.profile_path) }} style={{ height: 88, width: 88, borderRadius: 56 }} />
                                        </View>

                                        <Text style={{ color: 'white', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: 'rgb(163, 163, 163)', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                                            {item.character}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <MovieList title="Similar Movies" data={similarMovie.slice(0,15)} />
                    </>
            )}
            

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
    },
    contentContainer: {
        paddingBottom: 20,
    },

    header: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    androidMt3: {
        marginTop: 12,
    },

    backButton: {
        borderRadius: 12,
        padding: 4,
        backgroundColor: 'rgb(255, 199, 15)',
    },

    posterWrapper: {
        width: '100%',
        position: 'relative',
    },
});