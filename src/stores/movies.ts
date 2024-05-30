import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TMovieItem } from "@/types/index";

type BearStoreState = {
  movies: Record<number | string, TMovieItem>;
  setMovie: (movieId: number | string, movieData: TMovieItem) => void;
  removeMovie: (movieId: number | string) => void;
};

const useMovies = create<BearStoreState>()(
  persist(
    (set) => ({
      movies: {},

      setMovie: (movieId, movieData) =>
        set((state) => ({
          movies: {
            ...state.movies,
            [movieId]: movieData,
          },
        })),

      removeMovie: (movieId) =>
        set((state) => {
          const updatedMovies = { ...state.movies };
          delete updatedMovies[movieId];
          return {
            movies: updatedMovies,
          };
        }),
    }),
    {
      name: "faved-movies-storage",
    }
  )
);

export default useMovies;
