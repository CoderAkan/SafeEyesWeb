import { FC } from 'react'
import SideBar from '../../../components/SideBar'
import { FireIncident } from '../../../types'
import { Circle, Star } from 'lucide-react'

const FireDetailsPage: FC = () => {

  const incidentDetails: FireIncident = {
    timestamp: new Date,
    severity: 1,
    detected_by_camera: "At the kitchen",
    detected_by_camera_id: 1,
    worker: "Alan J.",
    worker_id: 12,
    status: "Resolved"
  }

  return (
    <div className='flex'>
        <SideBar />
        <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div>Fire incident</div>
            <div className='text-2xl flex justify-between'>
                <div>Severity:</div>
                <div className="flex">     
                    <div className="bg-yellow-400 rounded-lg">.</div>
                    <div className={incidentDetails.severity === 1 ? "bg-gray-400 rounded-lg" : "bg-yellow-400 rounded-lg"}>.</div>
                    <div className={incidentDetails.severity !== 3 ? "bg-gray-400 rounded-lg" : "bg-yellow-400 rounded-lg"}>.</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FireDetailsPage
