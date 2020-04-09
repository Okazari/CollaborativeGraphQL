import qs from "query-string";
import { useLocation } from "react-router-dom";

const useUsername = () => {
  const location = useLocation();
  const search = qs.parse(location.search);
  return search.username;
};

export default useUsername;
