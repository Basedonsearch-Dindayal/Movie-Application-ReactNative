import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { image500 } from "../api/moviedb";
import { useRouter } from "expo-router";
var { width, height } = Dimensions.get('window');
const MovieList = ({ title, data }) => {
    const router = useRouter();
    return (
        <>
            <View style={{ marginBottom: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 4 }}>{title}</Text>
                    <TouchableOpacity><Text style={{ color: 'yellow', fontSize: 15 }}>See All</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                    {data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => router.navigate(`/movie/${item.id}`)}>
                                <View style={{ display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* {title == 'Top Rated' && <View>
                                        <Text style={{fontSize:100,fontWeight:900,color:'white'}}>{index + 1}</Text>
                                    </View>} */}
                                    <View>
                                        <Image source={{ uri: image500(item.poster_path) }}
                                            style={{ width: width * 0.33, height: height * 0.22, borderRadius: 20, marginRight: 10 }} />
                                        <Text style={{ color: '#d4d4d4', marginLeft: 10 }}>{
                                            // title == "Upcoming" ? 
                                            (item.title.length > 14 ? item.title.slice(0, 11) + '...' : item.title)
                                            // (item.name.length>14? item.name.slice(0,11)+'...': item.name)
                                            // item.title
                                        }</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    )
}
export default MovieList;