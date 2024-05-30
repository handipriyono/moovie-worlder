import { getSearchMovies, getGenre } from "@/api/index";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "@/stores/search";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

export default function useSearch() {
  const [genres, setGenres] = useState({});
  const { search, setSearch } = useSearchStore(
    useShallow((state) => ({
      search: state.search,
      setSearch: state.setSearch,
    }))
  );
  const { data } = useQuery({
    queryKey: ["list-search-movies", search],
    queryFn: () => getSearchMovies(search),
    enabled: !!search,
  });

  const { data: dataGenre } = useQuery({
    queryKey: ["list-genre", search],
    queryFn: getGenre,
    staleTime: 900000,
  });

  const arrayToObject = (arr: { id: number; name: string }[]) => {
    const obj: { [key: number]: { id: number; name: string } } = {};
    arr.forEach((item) => {
      obj[item.id] = item;
    });
    return obj;
  };

  useEffect(() => {
    if (dataGenre) {
      const item = arrayToObject(dataGenre);
      setGenres(item);
    }
  }, [dataGenre]);

  useEffect(() => {
    setSearch("");
  }, []);

  const onHandleSearch = (v: string) => {
    setSearch(v);
  };

  return {
    moviesSearch: data,
    search,
    onHandleSearch,
    genres,
  };
}
