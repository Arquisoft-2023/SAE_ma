import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      usuarioUn: "",
      usuarioRol: "",
      setUser: (id, role) => set({ usuarioUn: id, usuarioRol: role }),
      clearUser: () => set({ usuarioUn: "", usuarioRol: "" })
    }),
    {
      name: "UserLoggedIn",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default userStore;
