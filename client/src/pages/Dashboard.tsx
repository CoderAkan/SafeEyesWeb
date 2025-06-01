import {FC} from 'react'
import SideBar from '../components/SideBar'
import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';

const Dashboard: FC = () => {
  const fire = 1;
  const ppe = 0;
  const phone = 1;

  const navigate = useNavigate();

  return (
    <div className='flex'>
      <SideBar />
      <div className='w-full text-4xl px-4 pt-2 gap-y-10 justify-evenly items-center'>
        <div>
          Dashboard
        </div>
        <div className='flex flex-col justify-between mt-10 h-fit'>
          <div className='flex justify-between mb-10'>
            <div id='Fire incidents' className='w-fit bg-white text-slate-900 rounded-md px-4 py-2' onClick={() => {navigate('/fire')}}>
              <p>Fire incidents:</p>
              <p>{fire}</p>
            </div>

            <div id='PPE incidents' className='w-fit bg-white text-slate-900 rounded-md px-4 py-2' onClick={() => {navigate('/ppe')}}>
              <p>PPE incidents:</p>
              <p>{ppe}</p>
            </div>

            <div id='Phone incidents' className='w-fit bg-white text-slate-900 rounded-md px-4 py-2' onClick={() => {navigate('/phone')}}>
              <p>Phone incidents:</p>
              <p>{phone}</p>
            </div>
          </div>
          
          <div className='w-full bg-white rounded-md text-slate-900 px-4 py-2'>
            Number of incidents in 2025:
            <BarChart
              series={[
                {data: [30, 25, 23, 18, 18, 2]},
              ]} 
              height={290}
              xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
