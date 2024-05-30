import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { TGenre } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGenre = (genreItem: Array<number>, genreList: TGenre) => {
  return genreItem?.map((item) => genreList?.[item]?.name).join(", ");
};

export const axiosAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});
