import { useSelector } from "react-redux";

const useUser = () => {
    const { user, isAuthenticated, token } = useSelector((state) => state.user);

    return [user, isAuthenticated, token];
};

export default useUser;
