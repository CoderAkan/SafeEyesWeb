import {FC} from 'react'
import { Link } from 'react-router-dom'

const FifthPanel: FC = () => {
  return (
    <div className='flex bg-slate-900 min-h-72 items-center justify-center'>
        <Link to={'/auth'} className='bg-white/50 text-slate-900 rounded-md px-12 py-6 text-2xl font-semibold hover:bg-white'>Try Free Today</Link>
    </div>
  )
}

export default FifthPanel
