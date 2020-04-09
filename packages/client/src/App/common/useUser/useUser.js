import qs from "query-string";
import { useLocation } from "react-router-dom";

const useUser = () => {
  const location = useLocation();
  const search = qs.parse(location.search);
  return { id: search.userId };
};

export default useUser;
