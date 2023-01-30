import { useEffect, useState } from "react";
import { getAllBillings } from "../helpers/api_helpers";

const useCountFunction = () => {
  // get the token from authUser
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser")) || {};
    const token = user?.token;
    setToken(token);
  }, [token]);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    getAllBillings().then((res) => {
      const current = res.data.reduce((a, b) => a + b.payable, 0);
      setTotalAmount(current);
    });
  }, [totalAmount, token]);

  return {
    totalAmount,
    setTotalAmount,
  };
};

export default useCountFunction;
