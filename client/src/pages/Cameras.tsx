import {FC} from 'react'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom';

const Cameras: FC = () => {
  const navigate = useNavigate();

  const cameras = [
    {number: 1, state: "Active", rtspURL: ""},
    {number: 2, state: "Active", rtspURL: ""},
    {number: 3, state: "Not active", rtspURL: ""},
    {number: 4, state: "Not active", rtspURL: ""}
  ]
  return (
    <div className='flex'>
          <SideBar />
          <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div>
              Cameras
            </div>
            <div className='grid grid-cols-2'>
              {cameras.map((camera) => (
                <div onClick={() => {navigate(`/camera/${camera.number}`)}} key={camera.number} className="mb-10">
                    <p className="px-6 py-3">{camera.number}</p>
                    <p className="px-6 py-3">{camera.state}</p>
                    <div className='w-96 h-56 bg-white'>

                    </div>
                </div>
              ))}
            </div>
          </div>

    </div>
  )
}

export default Cameras
