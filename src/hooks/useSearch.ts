import { getSearchMovies } from "@/api/index";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "@/stores/search";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function useSearch() {
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

  useEffect(() => {
    setSearch("");
  }, []);

  const onHandleSearch = (v) => {
    setSearch(v);
  };

  return {
    moviesSearch: data,
    search,
    onHandleSearch,
  };
}
