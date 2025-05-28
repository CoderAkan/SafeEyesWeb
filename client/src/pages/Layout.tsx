import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  return (
    <div className='flex flex-col min-h-screen bg-slate-900 font-roboto text-white'>
      <div className='flex-grow min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
