import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearAuth()); // Dispatch action to clear authentication state in Redux store
    navigate('/login');
  };

  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:underline flex  hover:text-indigo-500'
      onClick={logoutHandler}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
 Logout
    </button>
  );
}

export default LogoutBtn;
