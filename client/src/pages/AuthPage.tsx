import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { LoginFormData } from '../types';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const form = useForm<LoginFormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onLoginHandler = async (data: LoginFormData) => {
    try {
      const resp = await authService.login(data)
      if (resp) {
        navigate('/mycompany')
      }
    }
    catch (err: any) {
      const error = err.response?.data?.message || 'An error occurred during login'
      console.log(error)
      // toast.error(error.toString()) 
    }
  }


  return (
    <div className='mt-40 flex flex-col items-center justify-center bg-slate-900 text-white'>
      <h1 className='text-center text-3xl mb-10'>{"Login"}</h1>
      <form className='flex w-1/3 flex-col mx-auto' onSubmit={handleSubmit(onLoginHandler)} noValidate>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id='email' 
            className='bg-white rounded-md text-slate-900 px-2 py-1'
            {...register("email", {
              required: {
                value: true,
                message: "Email is required"},
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format"
              }
            })}
          />
        </div>
        <p className='text-red-500 mt-2 mb-5'>{errors.email?.message}</p>

        <div className='flex flex-col gap-y-2'>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id='password' 
            className='bg-white rounded-md text-slate-900 px-2 py-1'
            {...register("password", {
              required: {
                value: true,
                message: "Password is required"
              }
            })}  
          />
        </div>
        <p className='text-red-500 mt-2 mb-5'>{errors.password?.message}</p>

        <button className='mt-5 rounded-md border-white border-1 px-2 py-2 hover:bg-white hover:text-slate-900'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default AuthPage
