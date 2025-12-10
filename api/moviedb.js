import { readToken } from "../constants";

const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const topRatedUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${readToken}`
  }
};

export const getTrendingMovies = async ()=>{
    try{
        const response = await fetch(trendingUrl,options);
        const data = await response.json();
        return {status:'success', data:data.results};
    }catch(error){
        return error
    }
}

export const getTopRatedMovies = async ()=>{
    try{
        const response = await fetch(topRatedUrl,options);
        const data = await response.json();
        return {status:'success', data:data.results};
    }catch(error){
        return error
    }
}

export const getUpcomingMovies = async ()=>{
    try{
        const response = await fetch(upcomingUrl,options);
        const data = await response.json();
        return {status:'success', data:data.results};
    }catch(error){
        return error
    }
}
export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;

export const getMovieDetails = async (id)=>{
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    try{
        const response = await fetch(url,options);
        const data  = await response.json();
        return {status:'success', data:data};
    }catch(error){
        return error
    }
}
export const getMovieCast = async (id)=>{
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    try{
        const response = await fetch(url,options);
        const data  = await response.json();
        return {status:'success', data:data.cast};
    }catch(error){
        return error
    }
}
export const getCastDetail = async (id)=>{
    const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
    try{
        const response = await fetch(url,options);
        const data  = await response.json();
        return {status:'success', data:data};
    }catch(error){
        return error
    }
}

export const getActorCredits  = async (id) =>{
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
    try{
        const response = await fetch(url,options);
        const data = await response.json();
        return {status:'success', data:data.cast};
    }catch(error){
        return error
    }
}

export const getSimilarMovies = async (id) =>{
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    try{
        const response  = await fetch(url,options);
        const data = await response.json();
        return {status:'success', data:data.results};
    }catch(error){
        return error
    }
}

export const searchMoviesApi = async (query)=>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`;
    try{
        const response = await fetch(url,options);
        const data = await response.json();
        return {status:'success', data:data.results};
    }catch(error){
        return error
    }
}