import React from "react";
import userStore from "../storage/asyncstorage";
import { useStore } from "zustand";

const ZustandComp = () => {
  const { usuarioUn, usuarioRol } = useStore(userStore);
  console.log("AQUI ->", usuarioUn);
  return usuarioUn;
};
export default ZustandComp;
