import { FC } from 'react'
import SideBar from '../components/SideBar'

const Settings: FC = () => {
  return (
    <div className='flex'>
        <SideBar />
        <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div>Settings</div>
        </div>
    </div>
  )
}

export default Settings
