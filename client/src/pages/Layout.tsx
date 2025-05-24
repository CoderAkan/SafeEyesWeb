import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout: FC = () => {
  return (
    <div className='flex flex-col min-h-screen bg-slate-900 font-roboto text-white'>
      <Header />
      <div className='flex-grow min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
