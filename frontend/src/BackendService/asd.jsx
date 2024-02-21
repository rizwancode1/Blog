import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuthTokens, setUser } from '../store/authSlice'; // Import the authSlice actions
import { useSelector } from 'react-redux';

const baseUrl = `http://localhost:8000/accounts`;


class AuthService {
    constructor() {
        this.dispatch = useDispatch();
      }
    
      loginUser = async ({ email, password }) => {
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        };
        try {
          const response = await fetch(`${baseUrl}/token/`, options);
          const data = await response.json();
          if (response.status === 200) {
            console.log('logged in');
            this.dispatch(setAuthTokens(data)); // Dispatch action to set tokens in Redux store
            this.dispatch(setUser(jwtDecode(data.access))); // Dispatch action to set user in Redux store
            // localStorage.setItem('authTokens', JSON.stringify(data));
            return true
          } else {
            console.log(response.status);
            alert('Something went wrong: ' + response.status);
            return false
          }
        } catch (error) {
          console.log('Error:: loginUser :: ', error);
        }
      };

    registerUser = async ({ email, username, password, password2 }) => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username, password, password2 })
        };
        try {
            const response = await fetch(`${baseUrl}/register/`, options);
            if (response.status === 201) {
               console.log("Success")
               return true
            } else {
                console.log(response.status);
                console.log('Here was a server issue');
                return false
            }
        } catch (error) {
            console.log('Error:: registerUser :: ', error);
            return false
            // alert('An error occurred while registering');
        }
    };

    // logoutUser = async () => {
    //     try{
    //         this.setAuthTokens(null);
    //         this.setUser(null);
    //         localStorage.removeItem("authTokens");
    //         return true
    //     }catch(error){
    //         return false
    //         console.log('Error:: logoutUser :: ', error);
    //     }
    // };

    getCurrentUser = async () => {
        try {
          const user = useSelector(state => state.auth.user); // Access user state from Redux store
          return user;
        } catch (error) {
          console.log('Error:: getCurrentUser :: ', error);
          return null
        }
      };

    // setAuthTokens = (data) => {
    //     this.authTokens = data;
    // };

    // setUser = (userData) => {
    //     this.user = userData;
    // };
}
const authService = new AuthService();

export default authService
