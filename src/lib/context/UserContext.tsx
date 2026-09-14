import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import UserManager from "../manager/UserManager";
import { User } from "@/interface/interface";

interface UserContextType {
  user: User | null;
  loading: boolean;
  insertUser: (user: User) => Promise<void>;
  selectUsers: () => any;
  updateUser: (user: User) => any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await UserManager.selectUser();

        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error("Errore caricamento utente:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  async function insertUser(newUser: User) {
    const result = await UserManager.insertUser(newUser);

    if (result?.success) {
      setUser(newUser);
    }
  }

  async function selectUsers() {
    const selectedUser = await UserManager.selectUser();

    if (selectedUser) {
      setUser(selectedUser);
    }

    return selectedUser;
  }

  async function updateUser(newUser: User) {
    const result = await UserManager.updatUser(newUser)

    if (result?.success) {
      setUser(newUser);
    }

    return result;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        insertUser,
        selectUsers,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve essere usato dentro UserProvider");
  }

  return context;
}