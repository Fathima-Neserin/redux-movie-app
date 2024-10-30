import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
     async (term) => {
    try {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`);
        return response.data;
    } catch (err) {
        console.error("Error while fetching movies:", err);
    }
});


export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',
     async (term) => {
    try {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`);
        return response.data;
    } catch (err) {
        console.error("Error while fetching shows:", err);
    }
});

export const fetchAsyncMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetails', 
     async (id) => {
    try {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    } catch (err) {
        console.error("Error while fetching movies:", err);
    }
});


const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {}
};

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow : (state) => {
           state.selectMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, () => {
                console.log("Pending");
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                console.log("Fetched successfully");
                state.movies = payload;
            })
            .addCase(fetchAsyncMovies.rejected, () => {
                console.log("Rejected");
            })
            .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
                console.log("Fetched successfully");
                state.shows = payload;
            })
            .addCase(fetchAsyncMovieOrShowDetails.fulfilled, (state, { payload }) => {
                console.log("Fetched successfully");
                state.selectMovieOrShow = payload;
            })
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;
