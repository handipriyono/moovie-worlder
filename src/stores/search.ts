import { create } from "zustand";
import { TMovieItem } from "@/types";

type SearchStoreState = {
  movies: TMovieItem[];
  search: string;
  setSearch: (keyword: string) => void;
};

const useSearchStore = create<SearchStoreState>()((set) => ({
  movies: [],
  search: "",
  setSearch: (keyword) =>
    set(() => ({
      search: keyword,
    })),
}));

export default useSearchStore;
