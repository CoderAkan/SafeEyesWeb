import { Check } from 'lucide-react'
import {FC} from 'react'

interface GridCell3Props {
    mainIcon: React.ComponentType<any>,
    title: String,
    subtitle1: String,
    subtitle2: String,
}


const GridCell3: FC<GridCell3Props> = ({mainIcon: MainIcon, title, subtitle1, subtitle2}) => {
  return (
    <div className="flex flex-col bg-white text-slate-900 rounded-md px-4 py-6 gap-y-3">
        <MainIcon className="w-12 h-12"/>
            <h1 className='text-2xl'>{title}</h1>
            <div className='flex text-1xl gap-x-1 items-start'>
                <Check className='text-yellow-400'/>
                <h1>{subtitle1}</h1>
            </div>
            <div className='flex text-1xl gap-x-1 items-start'>
                <Check className='text-yellow-400'/>
                <h1>{subtitle2}</h1>
            </div>
    </div>
  )
}

export default GridCell3
