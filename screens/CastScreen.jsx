import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/MovieList";
import { getActorCredits, getCastDetail, image500 } from "../api/moviedb";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import Error from "../components/Error";


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function CastScreen({ id }) {
    const [actorData, setActorData] = useState(null);
    const [actorMovie, setActorMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const dactor = await getCastDetail(id);
                setActorData(dactor.data);
                const dmovie = await getActorCredits(id);
                setActorMovie(dmovie.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [id])

    return (
        <ScrollView
            style={[styles.container]}
            contentContainerStyle={{ paddingBottom: 20 }}
        >

            <SafeAreaView>
                <StatusBar style="light" />
                <View style={[styles.header, ios ? null : styles.androidMt3]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/')}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                </View>


                {error && <Error />}
                {loading && !error ? <Loading /> : <View>
                    <View style={{ flex: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            // Shadow styles for iOS
                            shadowColor: 'white',
                            shadowRadius: 40,
                            shadowOffset: { width: 2, height: 5 },
                            shadowOpacity: 1,

                            //  FOR ANDROID SHADOWS (Must be on the parent View)
                            elevation: 50, // Use a number for elevation (adjust as needed)

                            // This ensures the shadow bounding box matches the image's dimensions
                            width: width * 0.73,
                            height: width * 0.73,
                            borderRadius: width * 0.73 / 2, // Must match the image's circular shape
                        }}>
                            <Image source={{ uri: image500(actorData.profile_path) }} style={{ width: width * 0.73, height: width * 0.73, borderRadius: 800, shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 2, height: 5 }, shadowOpacity: 1 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 6 }}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{actorData.name}</Text>
                        <Text style={{ fontSize: 20, color: '#737373', textAlign: 'center' }}>{actorData.place_of_birth}</Text>
                    </View>

                    <View style={{ marginHorizontal: 3, padding: 10, marginTop: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', backgroundColor: '#404040', borderRadius: 100 }}>
                        <View style={{ borderRightWidth: 2, borderRightColor: '#a3a3a3', paddingHorizontal: 4, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Gender</Text>
                            <Text style={{ color: '#d4d4d4' }}>{actorData.gender}</Text>
                        </View>
                        <View style={{ borderRightWidth: 2, borderRightColor: '#a3a3a3', paddingHorizontal: 4, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Birthday</Text>
                            <Text style={{ color: '#d4d4d4' }}>{actorData.birthday}</Text>
                        </View>
                        <View style={{ borderRightWidth: 2, borderRightColor: '#a3a3a3', paddingHorizontal: 4, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Known For</Text>
                            <Text style={{ color: '#d4d4d4' }}>{actorData.known_for_department}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 4, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Popularity</Text>
                            <Text style={{ color: '#d4d4d4' }}>{actorData.popularity}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 6, marginHorizontal: 4 }}>
                        <Text style={{ color: 'white', fontSize: 30 }}>Biography</Text>
                        <Text style={{ color: '#a3a3a3', fontSize: 15 }}>{actorData.biography}</Text>
                    </View>
                    <MovieList title="Movies" data={actorMovie.slice(0, 15)} />
                </View>}


            </SafeAreaView>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
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
        marginTop: 54,
    },

    backButton: {
        borderRadius: 12,
        padding: 4,
        backgroundColor: 'rgb(255, 199, 15)',
    },
});