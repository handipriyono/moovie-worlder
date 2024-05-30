import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import SocialLogin from "./Social";
import useLogin from "../hooks/useLogin";

type LoginProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export default function Login({ setIsLogin }: LoginProps) {
  const {
    email,
    password,
    onhandleChange,
    handleOnBlur,
    errorMessages,
    onClickSignIn,
  } = useLogin();
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Input
          value={email}
          name="email"
          type="email"
          onChange={onhandleChange}
          placeholder="Email"
          onBlur={handleOnBlur}
          errorMessage={errorMessages?.email}
          className="bg-transparent border border-gray-500 text-white"
        />
        <Input
          value={password}
          name="password"
          type="password"
          onChange={onhandleChange}
          onBlur={handleOnBlur}
          placeholder="Password"
          errorMessage={errorMessages?.password}
          className="mt-4 bg-transparent text-white border border-gray-500"
        />
        <div className="flex">
          <Button
            onClick={onClickSignIn}
            className="mt-5 text-lg min-w-full py-3 bg-[#e50914] hover:opacity-80 hover:bg-[#e50914]"
          >
            Sign In
          </Button>
        </div>

        <SocialLogin>
          <Button className="flex transition duration-500 ease-in-out gap-x-4 hover:gap-x-5 bg-blue bg-blue-600 mt-5 text-lg min-w-full py-4 hover:border">
            <Mail className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </SocialLogin>

        <Separator className="mt-10" color="#808080" />
        <p className=" text-gray-400 py-3 text-center">
          Haven't you registered yet?
          <b
            className="text-red-600 ml-1 cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </b>
        </p>
      </div>
    </>
  );
}
