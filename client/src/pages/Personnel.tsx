import {FC} from 'react'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom';

const Personnel: FC = () => {
  const navigate = useNavigate();

  const workers = [
    {name: "Alan J.", age: 25, photo: 'Alan.jpg', status: "At work"},
    {name: "Maksat K.", age: 42, photo: 'Maksat.jpg', status: "At work"},
    {name: "Mark R.", age: 32, photo: 'MarkR.jpg', status: "Not at work"},
    {name: "Mark J.", age: 33, photo: 'MarkJ.jpg', status: "Not at work"},
    {name: "Akan K.", age: 24, photo: 'Akan.jpg', status: "At work"},
    {name: "Gulim N.", age: 30, photo: 'Gulim.jpg', status: "At work"},
    {name: "Machambet Z.", age: 27, photo: 'Macha.jpg', status: "Not at work"},
    {name: "Kozha R.", age: 27, photo: 'Kozha.jpg', status: "At work"},
  ]
  return (
    <div className='flex'>
          <SideBar />
          <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div>Workers</div>
            <div className='grid grid-cols-3 text-2xl'>
              {workers.map((worker) => (
                <div onClick={() => {navigate(`/camera/${worker.name}`)}} key={worker.name} className="mb-10">
                    <p className="px-6 py-3">{worker.name}</p>
                    <p className="px-6 py-3">{worker.status}</p>
                    <img src={worker.photo}/>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default Personnel
