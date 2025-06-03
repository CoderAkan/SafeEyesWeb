import { FC } from 'react'
import logo from '../assets/logo.png'
import {LogOut} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../app/features/user/userSlice'

const SideBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className='h-screen fixed w-1/6 flex bg-white items-center flex-col'>
      <div id="Logo" className='mt-6'>
        <img src={logo} alt="" className='rounded-lg cursor-pointer' width={50} height={50} onClick={() => {navigate('/dashboard')}}/>
      </div>
      <div className='flex flex-col text-slate-900 justify-evenly items-start w-full px-2 h-screen text-3xl'>
        <div className='w-full'>
            <div onClick={() => {navigate('/dashboard')}} className='cursor-pointer pl-2'>
                Dashboard
            </div>
            <div className='w-full mt-4 h-px bg-slate-300'></div>
        </div>
        <div className='w-full'>
            <div onClick={() => {navigate('/cameras')}} className='cursor-pointer pl-2'>
                Cameras
            </div>
            <div className='w-full mt-4 h-px bg-slate-300'></div>
        </div>
        <div className='w-full'>
            <div onClick={() => {navigate('/workers')}} className='cursor-pointer pl-2'>
                Workers
            </div>
            <div className='w-full mt-4 h-px bg-slate-300'></div>
        </div>
        <div className='w-full'>
            <div onClick={() => {navigate('/settings')}} className='cursor-pointer pl-2'>
                Settings
            </div>
            <div className='w-full mt-4 h-px bg-slate-300'></div>
        </div>
        <div className='flex items-center gap-x-2 pl-2 cursor-pointer' onClick={() => {
            navigate('/');
            dispatch(logout());
        }}>
            <LogOut/>
            Log out
        </div>
      </div>
    </div>
  )
}

export default SideBar