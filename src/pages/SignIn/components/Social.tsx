import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUser from "@/stores/user";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

type SocialLoginProps = {
  children: ReactNode;
};

export default function SocialLogin({ children }: SocialLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn, setUser } = useUser(
    useShallow((state) => ({
      users: state.users,
      setIsLoggedIn: state.setIsLoggedIn,
      currentUser: state.currentUser,
      isLoggedIn: state.isLoggedIn,
      setUser: state.setUser,
    }))
  );

  const onLogin = () => {
    if (!email || !password) {
      return alert("Please filled the form");
    }

    setIsLoggedIn(true, email);
    setUser(email, {
      email,
      password,
    });
    navigate("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to your Google Account</DialogTitle>
          <DialogDescription className="text-xs">
            * this is fake form to replicate login google* ( No validation )
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            Email
            <Input
              onChange={(e) => setEmail(e?.target.value)}
              id="email"
              className="col-span-3"
              value={email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            Password
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e?.target.value)}
              className="col-span-3"
              value={password}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onLogin} type="submit">
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
