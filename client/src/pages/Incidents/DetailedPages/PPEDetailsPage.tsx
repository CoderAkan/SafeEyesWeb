import { FC, useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar'
import { Incident } from '../../../types'
import { ArrowLeft} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rating, styled } from '@mui/material'
import { instance } from '../../../api/axios.api'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    color: '#e0e0e0', 
  },
  '& .MuiRating-iconFilled': {
    color: '#ffc107', 
  },
});

const PPEDetailsPage: FC = () => {

    const { ppeId } = useParams<{ ppeId: string }>(); 
    const [ppeIncident, setPPEIncident] = useState<Incident>();
    const [loading, setLoading] = useState(true);
  
      useEffect(() => {
        const fetchPPELogs = async () => {
          console.log("PPEId:", ppeId)
          try {
            const resp = await instance.get(`/incident/${ppeId}`);
            console.log("Success")
            console.log(resp.data)
            if (resp.data != null) {
              setPPEIncident(resp.data)
            } else {
              console.log(resp.data);
            }
          }
          catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
        fetchPPELogs();
      }, [])


  const navigate = useNavigate();

  if (loading) {
    return (
        <div className='flex'>
            <SideBar />
            <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
                <div className='my-5'><ArrowLeft onClick={() => {navigate('/ppe')}}/></div>
                <div>PPE incident</div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>Severity:</div>
                </div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>When it happened:</div>
                </div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>Status:</div>
                </div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>Which camera detected:</div>
                </div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>Which person was responsible:</div>
                </div>
                <div className='text-2xl flex mt-10 justify-between'>
                    <div>Which department:</div>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className='flex'>
        <SideBar />
        <div className='ml-auto w-5/6 text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
            <div className='my-5'><ArrowLeft onClick={() => {navigate('/ppe')}}/></div>
            <div>PPE incident</div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Severity:</div>
                <div className="flex"> 
                  <StyledRating name="customized-10 border-1" value={Number(ppeIncident?.severity)} max={3} readOnly />
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>When it happened:</div>
                <div className="flex"> 
                  <p>{ppeIncident?.timestamp.toString()}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Status:</div>
                <div className="flex"> 
                  <p>{ppeIncident?.status}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which camera detected:</div>
                <div className="flex"> 
                  <p>{ppeIncident?.detected_by_camera.location}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which person was responsible:</div>
                <div className="flex"> 
                  <p>{ppeIncident?.worker.full_name}</p>
                </div>
            </div>
            <div className='text-2xl flex mt-10 justify-between'>
                <div>Which department:</div>
                <div className="flex"> 
                  <p>{ppeIncident?.worker.department}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PPEDetailsPage;
