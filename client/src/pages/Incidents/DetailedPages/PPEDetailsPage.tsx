import { FC } from 'react'
import SideBar from '../../../components/SideBar'
import { FireIncident } from '../../../types'
import { ArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Rating, styled } from '@mui/material'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    color: '#e0e0e0', 
  },
  '& .MuiRating-iconFilled': {
    color: '#ffc107', 
  },
});

const PPEDetailsPage: FC = () => {

  const incidentDetails: FireIncident = {
    timestamp: new Date,
    severity: 1,
    detected_by_camera: {
      id: 1,
      location: "main hall right side",
      status: "offline",
      last_maintenance: new Date(),
      rtsp_address: "rtsp://admin:password@192.168.1.100:554/live",
      resolution: "FULL HD",
      responsible_person_id: 8,
      responsible_person: {
            id: 8,
            email: "akan123@gmail.com",
            password: "$argon2id$v=19$m=65536,t=3,p=4$Sg4YPMzgNINa0fQBp2V9zA$8XBhOz84TAEIteF6Z1kMW6P0IWZW3697Go749QIGDB4",
            full_name: "Kaiyrbay Akanseri",
            emergency_contact: "+7 777 777 7777",
            role: "ADMIN",
            department: "IT",
            refresh_token: "$argon2id$v=19$m=65536,t=3,p=4$IL8zQiDwbGbskreyzsYJiQ$2NRcT1pCVZC+t152TtDVwOmpovMgKQnJwIdUO7QJqhk",
            boss_id: null,
            access_permissions: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
    detected_by_camera_id: 1,
    worker: {
      id: 8,
      email: "akan123@gmail.com",
      password: "$argon2id$v=19$m=65536,t=3,p=4$Sg4YPMzgNINa0fQBp2V9zA$8XBhOz84TAEIteF6Z1kMW6P0IWZW3697Go749QIGDB4",
      full_name: "Kaiyrbay Akanseri",
      emergency_contact: "+7 777 777 7777",
      role: "ADMIN",
      department: "IT",
      refresh_token: "$argon2id$v=19$m=65536,t=3,p=4$IL8zQiDwbGbskreyzsYJiQ$2NRcT1pCVZC+t152TtDVwOmpovMgKQnJwIdUO7QJqhk",
      boss_id: null,
      access_permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    worker_id: 8,
    status: "Resolved"
  }

  const navigate = useNavigate();

  return (
    <div className='flex'>
        <SideBar />
        <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div className='my-5'><ArrowLeft onClick={() => {navigate('/fire')}}/></div>
            <div>PPE incident</div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Severity:</div>
                <div className="flex"> 
                  <StyledRating name="customized-10 border-1" defaultValue={Number(incidentDetails.severity)} max={3} readOnly />
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>When it happened:</div>
                <div className="flex"> 
                  <p>{incidentDetails.timestamp.toString()}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Status:</div>
                <div className="flex"> 
                  <p>{incidentDetails.status}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which camera detected:</div>
                <div className="flex"> 
                  <p>{incidentDetails.detected_by_camera.location}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which person was responsible:</div>
                <div className="flex"> 
                  <p>{incidentDetails.worker.full_name}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which department:</div>
                <div className="flex"> 
                  <p>{incidentDetails.worker.department}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PPEDetailsPage;
