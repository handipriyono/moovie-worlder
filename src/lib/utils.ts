import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});
