import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { LoginFormData, RegistrationFormData } from '../types';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { login } from '../app/features/user/userSlice'
import Header from '../components/Header';
import Footer from '../components/Footer';

const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const form = useForm<RegistrationFormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onHandler = async (data: RegistrationFormData) => {
    try {
      let resp;
      if (isLogin) {
        const loginData: LoginFormData = {
          email: data.email,
          password: data.password
        };
        resp = await authService.login(loginData);
      } else {
        let perms = [];
        if (data.role) {
          if (data.role === "Business owner" || data.role === "Admin" || data.role === "Manager") {
            perms.push("Camera");
            perms.push("Notifications");
            perms.push("Workers");
          } else {
            perms.push("No camera");
            perms.push("Notifications");
            perms.push("Worker");
          }
        }
        const registrationData: RegistrationFormData = {
          ...data,
          access_permissions: perms
        }
        resp = await authService.registration(registrationData);
      }
      
      if (resp) {
        dispatch(login(resp));
        navigate('/dashboard');
      }
    } catch (err: any) {
      const error = err.response?.data?.message || 'An error occurred during authentication';
      console.log(error);
    }
  }



  return (
    <div>
    <Header />
    <div className='mt-40 mb-12 flex flex-col items-center justify-start h-screen bg-slate-900 text-white'>
      <h1 className='text-center text-3xl mb-10'>{isLogin ? "Login" : "Registration"}</h1>
      <form className='flex w-1/3 flex-col mx-auto' onSubmit={handleSubmit(onHandler)} noValidate>
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

        {!isLogin && (
          <div>
            <div>
              <div className='flex flex-col gap-y-2'>
               <label htmlFor="full_name">Full Name</label>
               <input 
                type="text" 
                id='full_name' 
                className='bg-white rounded-md text-slate-900 px-2 py-1'
                {...register("full_name", {
                  required: {
                    value: true,
                    message: "Full Name is required"},
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Invalid full name format"
                  }
                 })}
                />
              </div>
              <p className='text-red-500 mt-2 mb-5'>{errors.full_name?.message}</p>
            </div>

            <div>
             <div className='flex flex-col gap-y-2'>
              <label htmlFor="emergency_contact">KZ Emergrency Contact</label>
              <input 
                type="text" 
                id='emergency_contact' 
                className='bg-white rounded-md text-slate-900 px-2 py-1'
                {...register("emergency_contact", {
                  pattern: {
                    value: /^\+7\s\d{3}\s\d{3}\s\d{4}$/,
                    message: "Invalid emergency contact format"
                  }
                  })}
                />
              </div>
              <p className='text-red-500 mt-2 mb-5'>{errors.emergency_contact?.message}</p>
            </div>

            <div>
              <div className='flex flex-col gap-y-2'>
              <label htmlFor="role">Role / Occupation</label>
              <select 
                id='role' 
                className='bg-white rounded-md text-slate-900 px-2 py-1'
                {...register("role", {
                  required: {
                    value: true,
                    message: "Please select a role"
                  }
                })}
              >
                <option value="">Select a role/occupation...</option>
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Business owner">Business owner</option>
               </select>
              </div>
              <p className='text-red-500 mt-2 mb-5'>{errors.role?.message}</p>
            </div>

            <div>
              <div className='flex flex-col gap-y-2'>
              <label htmlFor="department">Department</label>
              <input 
                type="text" 
                id='department' 
                className='bg-white rounded-md text-slate-900 px-2 py-1'
                {...register("department")}
                />
              </div>
              <p className='text-red-500 mt-2 mb-5'>{errors.department?.message}</p>
            </div>
          </div>
        )}

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

        <p onClick={() => {setIsLogin(!isLogin)}} className='flex justify-end text-blue-400'>{isLogin ? "I don't have an account" : "I already have an account"}</p>

        <button className='mt-5 mb-12 rounded-md border-white border-1 px-2 py-2 hover:bg-white hover:text-slate-900'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
    <Footer />
    </div>
  )
}

export default AuthPage
