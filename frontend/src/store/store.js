import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { useDispatch } from 'react-redux';
import { setAuthTokens, setUser } from './authSlice';

//store main humein reducers banany hoty hein 
const store =  configureStore({
    reducer : {
        auth : authSlice,
    }
})

// Load state from local storage


const savedAuthState = JSON.parse(localStorage.getItem('auth'));
if (savedAuthState) {
  store.dispatch(setAuthTokens(savedAuthState.authTokens));
  store.dispatch(setUser(savedAuthState.user));
}

// Subscribe to store changes to persist state to local storage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('auth', JSON.stringify({
    authTokens: state.auth.authTokens,
    user: state.auth.user,
  }));
});


export default store