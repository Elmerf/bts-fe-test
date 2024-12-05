import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, LOCAL_KEYS } from "../constant";
import { readItem, writeItem } from "../utils/localStorage";

const useAuth = () => {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      const token = response.data?.data?.token;
      writeItem("token", token);

      navigate("/");
    } catch (error) {
      console.error("There was an error logging in!", error);
      toast("There was an error logging in!", { type: "error" });
    }
  };

  const logout = () => {};

  const isAuthenticated = useCallback(() => {
    return readItem(LOCAL_KEYS.TOKEN) !== null;
  }, []);

  return {
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
