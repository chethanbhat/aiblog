import React, { createContext, useState, useEffect, useContext } from "react";
import { UserInterface } from "./types";

interface UserContextInterface {
  user: UserInterface | null;
  setUser: (u: UserInterface) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const _user = readfFromLocalStorage();
    if (_user) {
      setUser(_user);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      writeToLocalStorage(user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const readfFromLocalStorage = (): UserInterface | null => {
  const user = localStorage.getItem("user");
  if (typeof user === "undefined" || user === null) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const writeToLocalStorage = (user: UserInterface) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const useUser = (): {
  user: UserInterface | null;
  setUser: Function;
} => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};
