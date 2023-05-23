export const storeUser = async (id, rol) => {
    const user = {
        "usuarioUn" : id,
        "rol" : rol
    }
  try {
    await AsynStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const userData = JSON.parse(await AsynStorage.getItem("user"))
  } catch (error) {
   console.log(error); 
  }
};