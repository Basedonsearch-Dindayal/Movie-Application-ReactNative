import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useRouter } from "expo-router";
import { getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "../api/moviedb";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ios = Platform.OS === 'ios';
const HomeScreen = () => {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router  = useRouter();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const tres = await getTrendingMovies();
                setTrending(tres.data);
                const ures = await getUpcomingMovies();
                setUpcoming(ures.data);
                const topres = await getTopRatedMovies();
                setTopRated(topres.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [])
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={ios ? styles.safeAreaViewIOS : styles.safeAreaViewAndroid}>
                    <StatusBar style="light" />
                    <View style={styles.innerContainer}>
                        <Ionicons name="menu" size={35} color={'white'} />
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
                            <Text style={{ color: "yellow" }}>M</Text>ovies
                        </Text>
                        <TouchableOpacity onPress={() => router.navigate('/search')}>
                            <Ionicons name="search" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {error && <Error />}
                {loading && !error ? <Loading /> : <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    <TrendingMovies data={trending} />
                    <MovieList title="Upcoming" data={upcoming} />
                    <MovieList title="Top Rated" data={topRated} />
                </ScrollView>}
            </View>
        </>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
    },
    safeAreaViewIOS: {
        marginBottom: -2,
    },
    safeAreaViewAndroid: {
        marginBottom: 3
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
    }
})