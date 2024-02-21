import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthTokens, setUser } from '../store/authSlice';

const baseUrl = 'http://localhost:8000';


const useAxios = () => {
    

    // Ensure hooks are called within the body of a function component
    const authTokens = useSelector((state) => state.auth.authTokens);
    const userData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    // Create the axios instance
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${authTokens.access}` },
    });

    // Add interceptors for token refresh
    axiosInstance.interceptors.request.use(
        async (config) => {
            const user = userData;
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
            if (!isExpired) {
                config.headers.Authorization = `Bearer ${authTokens.access}`;
                return config;
            }
    
            const refreshToken = { refresh: authTokens.refresh };
            try {
                const response = await axios.post(`${baseUrl}/accounts/token/refresh`, refreshToken);
                dispatch(setAuthTokens(response.data));
                dispatch(setUser(jwtDecode(response.data.access)));
                config.headers.Authorization = `Bearer ${response.data.access}`;
                return config;
            } catch (error) {
                console.error('Token refresh failed:', error);
                throw error;
            }
        },
        (error) => {
            console.error('Request error:', error);
            return Promise.reject(error);
        }
    );
    
    return axiosInstance;
};

export default useAxios;
