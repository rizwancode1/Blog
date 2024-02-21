import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './compIndex';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../BackendService/authService';

function Signup() {
  const navigate = useNavigate();
  const { registerUser } = authService();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [error, setError] = useState('');

  const create = async (data) => {
    setError('');
    try {
      const response = await registerUser(data);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center bg-black p-6'>
      <div className={`bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>

        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i
              })}
            />
            {errors.email && <p className='text-red-600 mt-1'>Please enter a valid email address</p>}
            <Input
              label="Username"
              name = 'username'
              placeholder="Enter your Username"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Password"
              type="password"
              name='password'
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 8
              })}
            />
            {errors.password && <p className='text-red-600 mt-1'>Password must be at least 8 characters long</p>}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Enter your password again!"
              name='password2'
              {...register("password2", {
                required: true,
                validate: (value) => value === getValues("password") || "The passwords do not match"
              })}
            />
            {errors.password2 && <p className='text-red-600 mt-1'>{errors.password2.message}</p>}
            <Button type='submit' className='w-full bg-sky-500 text-white'>Create Account</Button>
          </div>
        </form>
        <div className="">
          <p className="mt-2 text-center text-base">
            Already have an account?&nbsp;
            <Link to='/login' className='font-medium, font-medium text-lg transition-all duration-200 hover:underline hover:text-sky-600'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
