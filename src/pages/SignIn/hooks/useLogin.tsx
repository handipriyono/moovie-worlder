import useUser from "@/stores/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export default function useLogin() {
  const { users, setIsLoggedIn } = useUser(
    useShallow((state) => ({
      users: state.users,
      setIsLoggedIn: state.setIsLoggedIn,
      currentUser: state.currentUser,
      isLoggedIn: state.isLoggedIn,
    }))
  );

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [dirtyStatus, setDirtyStatus] = useState({
    email: false,
    password: false,
  });

  const setAssignError = (name: string) => {
    if (name === "email" && dirtyStatus.email) {
      const val = validateEmail(email);
      setErrorMessages((prev) => {
        return {
          ...prev,
          email: val == true ? "" : "Please enter a valid email address.",
        };
      });
    }
    if (name === "password" && dirtyStatus.password) {
      const isLengthMeet = password.length >= 6 && password.length <= 30;
      setErrorMessages((prev) => {
        return {
          ...prev,
          password:
            isLengthMeet == true
              ? ""
              : "The password should have a length between 6 and 30 characters.",
        };
      });
    }
  };

  useEffect(() => {
    setAssignError("email");
  }, [dirtyStatus, email]);

  useEffect(() => {
    setAssignError("password");
  }, [dirtyStatus, password]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirty(e);
  };

  const handleDirty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setAssignError(name);
    setDirtyStatus((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  };

  const onClickSignIn = () => {
    if (dirtyStatus.email || dirtyStatus.password) {
      if (errorMessages.email || errorMessages.password) {
        return;
      } else {
        if (users?.[email]) {
          if (users?.[email]?.password === password) {
            setIsLoggedIn(true, email);
            navigate("/");
          } else {
            alert("password salah");
          }
        } else {
          alert("user not found!");
        }
      }
    } else {
      setDirtyStatus({
        email: true,
        password: true,
      });
    }
  };

  const onhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        break;
    }
  };

  return {
    email,
    password,
    onhandleChange,
    isLogin,
    setIsLogin,
    handleOnBlur,
    errorMessages,
    onClickSignIn,
  };
}
