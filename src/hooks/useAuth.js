import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/AuthSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode(token);
        const { name, email, roles, id } = decoded.UserInfo;

        return { isLogged: true, name, email, roles, id};
    }

    return { isLogged: false, name: '', email: '', roles: [], id:'' };
};

export default useAuth;