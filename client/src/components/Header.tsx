import {FC} from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import {FaSignOutAlt} from 'react-icons/fa'

const Header: FC = () => {
    const isAuth = false;
    return (
        <header className='flex items-center min-w-screen fixed justify-between p-4 shadow-sm bg-white backdrop-blue-sm'> 
            <Link to='/'>
                <img src={logo} alt="Logo" width={50} height={50}/>
            </Link>
            {/* Menu */}
            {
                isAuth && (
                    <nav className='ml-auto mr-10'>
                        <ul className='flex items-center gap-5 text-slate-900'>
                            <li>
                                <NavLink to={'/'} className={({ isActive }: { isActive: boolean }) => isActive ? 'text-slate-900' : 'text-slate-400'}> Главная </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/company'} className={({ isActive }: { isActive: boolean }) => isActive ? 'text-slate-900' : 'text-slate-400'}> Моя компания </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/personnel'} className={({ isActive }: { isActive: boolean }) => isActive ? 'text-slate-900' : 'text-slate-400'}> Работники </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/cameras'} className={({ isActive }: { isActive: boolean }) => isActive ? 'text-slate-900' : 'text-slate-400'}> Камеры </NavLink>
                            </li>
                        </ul>
                    </nav>
                ) 
            }
            {/* Actions */}
            {
                isAuth ? (
                    <button className='flex gap-2 items-center text-white py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 bg-rose-900 hover:bg-rose-800'>
                        <span>Выйти</span>    
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <Link className="py-2 text-slate-600 hover:text-slate-900" to={'/auth'}>
                        Войти
                    </Link>
                )
            }
        </header>
    )
}

export default Header
