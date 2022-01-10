import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const getUsers = async () => {
  const result = await api
    .get("/users")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
  return result;
};

export default api;
