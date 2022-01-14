import axios from "axios";
import { Audit } from "../util/types";

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

export const getCards = async () => {
  const result = await api
    .get("/cards")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
  return result;
};

export const updateCard = async (card: any) => {
  const result = await api
    .put(`/cards/${card.id}`, card)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
  return result;
};

export const createAudit = async (audit: Audit) => {
  const result = await api
    .post("/audits", audit)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
  return result;
};

export default api;
