import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  email: string;
  password: string;
  name?: string;
};

type UserState = {
  users: Record<string, UserData>;
  isLoggedIn: boolean;
  currentUser: string;
  setUser: (email: string, data: UserData) => void;
  setIsLoggedIn: (bool: boolean, email: string) => void;
};

const useUser = create<UserState>()(
  persist(
    (set) => ({
      users: {},
      isLoggedIn: false,
      currentUser: "",
      //this is for fake purpose only
      setUser: (email, data) =>
        set((state) => ({
          users: {
            ...state.users,
            [email]: data,
          },
        })),
      setIsLoggedIn: (bool, email) =>
        set(() => ({
          isLoggedIn: bool,
          currentUser: bool === true ? email : "",
        })),
    }),
    {
      name: "user-list-storage",
    }
  )
);

export default useUser;
