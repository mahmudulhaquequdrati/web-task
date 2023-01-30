import { useContext } from "react";
import { CountContext } from "../context/TotalCountProvider";

const useCount = () => {
  const count = useContext(CountContext);
  return count;
};
export default useCount;
