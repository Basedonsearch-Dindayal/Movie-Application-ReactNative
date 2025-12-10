import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
// import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";

const TrendingMovies = ({ data }) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 5, marginHorizontal: 4, fontWeight:'bold' }}>Trending</Text>
                {/* <Carousel
                    data={data}
                    renderItem={({ item }) => <MovieCard item={item} />}
                    firstItem={1}
                    inactiveSlideOpacity={0.6}
                    sliderWidth={600}
                    itemWidth={400}
                    slideStyle={{ display: 'flex', alignItems: 'center' }}
                /> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}>
                    {data.map((item,index)=><MovieCard key={index} data={item}/>)}
                </ScrollView>
                
            </View>
        </>
    )
}
export default TrendingMovies;
const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    }
})