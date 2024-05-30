import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex z-1 min-h-screen justify-center bg-cover bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/871d8b9d-71bc-4e11-ab52-8ba703856e43/ID-en-20240520-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-opacity-[30]">
      <div className=" bg-black/80 w-full sm:w-[400px] h-[650px] mt-5 sm:mt-[100px] rounded-xl p-3 sm:p-10 mx-2 sm:mx-1">
        <p className=" text-white text-3xl font-bold mb-4 sm:mb-10">
          Sign {isLogin ? "In" : "Up"}
        </p>
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}
