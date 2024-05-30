import { useEffect, useState } from "react";
import useUser from "@/stores/user";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const { setIsLoggedIn, setUser } = useUser(
    useShallow((state) => ({
      setIsLoggedIn: state.setIsLoggedIn,
      setUser: state.setUser,
    }))
  );

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    name: "",
    secondPassword: "",
  });
  const [dirtyStatus, setDirtyStatus] = useState({
    email: false,
    password: false,
    name: false,
    secondPassword: false,
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const setAssignError = (nameForm: string) => {
    if (nameForm === "name" && dirtyStatus.name) {
      const isValid = name.length >= 2;
      setErrorMessages((prev) => {
        return {
          ...prev,
          name: isValid == true ? "" : "Please enter your name.",
        };
      });
    }

    if (nameForm === "email" && dirtyStatus.email) {
      const val = validateEmail(email);
      setErrorMessages((prev) => {
        return {
          ...prev,
          email: val == true ? "" : "Please enter a valid email address.",
        };
      });
    }
    if (nameForm === "password" && dirtyStatus.password) {
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
    if (nameForm === "secondPassword" && dirtyStatus.secondPassword) {
      const isSame =
        password.length === secondPassword.length &&
        (password.length > 0 || secondPassword.length > 0);
      setErrorMessages((prev) => {
        return {
          ...prev,
          secondPassword: isSame == true ? "" : "Passwords should match",
        };
      });
    }
  };

  const onhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      case "secondPassword":
        return setSecondPassword(value);
      default:
        break;
    }
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirty(e);
  };

  useEffect(() => {
    setAssignError("email");
  }, [dirtyStatus, email]);

  useEffect(() => {
    setAssignError("password");
  }, [dirtyStatus, password]);

  useEffect(() => {
    setAssignError("secondPassword");
  }, [dirtyStatus, secondPassword]);

  useEffect(() => {
    setAssignError("name");
  }, [dirtyStatus, name]);

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

  const onClickSignUp = () => {
    const {
      email: dirtyEmail,
      password: dirtyPassword,
      name: dirtyName,
      secondPassword: dirtySecondPassword,
    } = dirtyStatus;
    if (dirtyEmail || dirtyPassword || dirtyName || dirtySecondPassword) {
      if (
        errorMessages.email ||
        errorMessages.password ||
        errorMessages.secondPassword ||
        errorMessages.name
      ) {
        return;
      } else {
        setUser(email, {
          email,
          password,
          name,
        });
        setIsLoggedIn(true, email);
        navigate("/");
      }
    } else {
      setDirtyStatus({
        email: true,
        password: true,
        name: true,
        secondPassword: true,
      });
    }
  };

  return {
    name,
    email,
    password,
    secondPassword,
    onhandleChange,
    handleOnBlur,
    errorMessages,
    onClickSignUp,
  };
}
