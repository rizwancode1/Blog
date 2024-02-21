import React from 'react'
import { useDispatch } from 'react-redux';
import { clearAuth, setAuthTokens, setUser } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';

function authService() {
    const dispatch = useDispatch();
    const baseUrl = `http://localhost:8000/accounts`;


    const loginUser = async ({ email, password }) => {
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
              dispatch(setAuthTokens(data)); // Dispatch action to set tokens in Redux store
              dispatch(setUser(jwtDecode(data.access))); // Dispatch action to set user in Redux store
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

    const registerUser = async ({ email, username, password, password2 }) => {
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


  
    const logoutUser = async () => {
      dispatch(clearAuth()); // Dispatch action to clear auth state
      return true
    };
  
    // Other auth-related methods...
  
    return { loginUser, logoutUser  , registerUser };
}

export default authService