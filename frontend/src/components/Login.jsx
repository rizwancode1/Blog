import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input, Logo} from "./compIndex"
import authService from '../BackendService/authService'
import {useForm} from 'react-hook-form'



function Login() {
    const navigate = useNavigate()
    
    const { loginUser } = authService();

    const {register, handleSubmit} = useForm() //handleSubmit k sary inputs ki alag sy state manage karny sy bachega , / hamein sary inputs ko track karna nahi karna paryga
    const [error, setError] = useState('')

        const login = async(data)=> {
            setError("")
            try{
            const response =  await loginUser(data)
                if (response){
                    navigate("/")
                }
            }catch(error){
                setError(error.message)
            }
        }

  return (
    <div className='flex items-center justify-center p-14'>
      <div className={` bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
              <span className='inline-block w-full max-w-[100px]'>
                  <Logo width="100%"/>
              </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create  account</h2>
          {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
          <form onSubmit={handleSubmit(login)}>
              <div className="space-y-5">
        

                  <Input
                      label = "Email"
                      placeholder = "Enter your email"
                      type  = "email"
                      {...register("email", {
                          required: true,
                          validate:{//regexr.com sy validation ki expression leingy
                              matchPatern: (value)=> /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||"Email address must be a valid"
                          }
                      })} //har bar yaha spread karna hoga orr input ko register karna hoga unique name sy warna inputs ki values overwrite ho jaigi, ye compelseri. 
                  />

                  <Input
                      label = "Password"
                      type = "password"
                      name = 'password'
                      placeholder= "Enter your password"
                      {...register("password", {
                          required:true
                      })}
                  />
                  <Button type='submit' className='w-full bg-sky-500 text-white'>Create Account</Button>
              </div>
          </form>
          <div className="">
          <p className="mt-2 text-center text-base">
              Already have any account?&nbsp;
              <Link to='/signup' className='font-medium, font-medium text-lg transition-all duration-200 hover:underline hover:text-sky-600'>
                  Sign up
              </Link>

          </p>
          </div>
      </div>
  </div>   
  )
}

export default Login