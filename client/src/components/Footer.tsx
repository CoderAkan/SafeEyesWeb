import {FC} from 'react'
import logo from '../assets/logo.png'

const Footer: FC = () => {
    return (
        <div className="bg-white flex flex-col lg:flex-row h-full text-slate-900 py-6 text-center items-center lg:justify-evenly">
            <div className="flex flex-col justify-start items-center">
                <div className="flex flex-col items-center">
                    <img src={logo} alt="LOGO" width={50} height={50}/>
                    <h1 className="black font-bold text-2xl mb-10 lg:mb-5 mt-2">SafeEyes</h1>
                </div>
                <div>
                    <h6 className="">© 2025 ТОО «SafeEyes». </h6>
                    <h6 className="mt-2 lg:mt-0">Все права защищены.</h6>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start mt-10 lg:mt-0">
                <h4 className="mb-5 lg:mb-10">Контакты</h4>
                <h4 className="">safeeyes@gmail.com</h4>
                <h4 className="mt-2">Актау, 33 мкр, НИШ</h4>
                <h4 className="mt-4">8 701 770 0633</h4>
            </div>
            <div className="flex flex-col justify-center bg- items-center lg:items-start mt-4 lg:mt-0">
                <h4 className="justify-start">Оставьте свой email и мы свяжемся с вами:</h4>
                <input className="w-fit rounded-md px-3 py-2 mt-4 text-black border border-slate-300 focus:outline-none focus:ring-0 focus:border-slate-900" type="text" placeholder="Ваш email:"/>
                <div className="w-fit mt-4 h-fit px-5 py-3 bg-slate-900 text-white rounded-full">Отправить</div>
            </div>
        </div>
    )
}

export default Footer;
