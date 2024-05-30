import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";
import useSignUp from "../hooks/useSignUp";

type TRegisterProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export default function Register({ setIsLogin }: TRegisterProps) {
  const {
    name,
    email,
    password,
    secondPassword,
    onhandleChange,
    handleOnBlur,
    errorMessages,
    onClickSignUp,
  } = useSignUp();
  return (
    <div className="flex flex-col gap-y-2">
      <Input
        name="name"
        value={name}
        type="text"
        onChange={onhandleChange}
        onBlur={handleOnBlur}
        errorMessage={errorMessages?.name}
        placeholder="Your name"
        className="bg-transparent text-white mb-1 border border-gray-500"
      />
      <Input
        name="email"
        value={email}
        type="text"
        onChange={onhandleChange}
        onBlur={handleOnBlur}
        errorMessage={errorMessages?.email}
        placeholder="Your Email"
        className="mt-2 bg-transparent text-white border border-gray-500"
      />
      <Input
        name="password"
        value={password}
        type="password"
        onChange={onhandleChange}
        onBlur={handleOnBlur}
        errorMessage={errorMessages?.password}
        placeholder="Your Password"
        className="mt-2 bg-transparent text-white border border-gray-500"
      />
      <Input
        name="secondPassword"
        value={secondPassword}
        type="password"
        onChange={onhandleChange}
        onBlur={handleOnBlur}
        errorMessage={errorMessages?.secondPassword}
        placeholder="Repeat Password"
        className="mt-2 bg-transparent text-white border border-gray-500"
      />
      <div className="flex">
        <Button
          onClick={onClickSignUp}
          className="mt-3 text-lg min-w-full py-3 bg-[#e50914] hover:opacity-80 hover:bg-[#e50914]"
        >
          Sign Up
        </Button>
      </div>
      <Separator className="mt-6" color="#808080" />
      <p className="text-gray-400 text-center text-sm">
        Do you already have an account?
        <b
          className="text-red-600 ml-2 cursor-pointer"
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </b>
      </p>
    </div>
  );
}
