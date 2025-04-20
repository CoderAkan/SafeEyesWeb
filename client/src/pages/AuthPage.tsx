import {FC, useState} from 'react'

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className='mt-40 flex flex-col items-center justify-center bg-slate-900 text-white'>
      <h1 className='text-center text-xl mb-10'>{isLogin ? "Войти" : "Регистрация"}</h1>
      <form className='flex w-1/3 flex-col mx-auto gap-5'>
        <input type="text" className='' placeholder=''/>
      </form>
    </div>
  )
}

export default AuthPage
