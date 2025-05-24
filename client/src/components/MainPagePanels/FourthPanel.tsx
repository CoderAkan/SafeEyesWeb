import { Dot, Network, HardDrive, ScrollText, CircleCheckBig, ThumbsUp} from 'lucide-react'
import {FC} from 'react'

const FourthPanel: FC = () => {
  return (
    <div id="fourth panel" className="min-h-96 bg-white  text-slate-900 flex flex-col justify-evenly items-center pb-12 pt-12 px-12">
        <h1 className="text-3xl font-bold mb-12">Our Approach</h1>
        <div className="flex flex-col bg-gray-300 p-6 rounded-md w-full px-12 pl-20">
            <div className="grid grid-cols-5 items-center text-2xl font-bold justify-evenly">
                <div className="flex items-center justify-start mr-auto">
                    <Dot className="w-12 h-12"/>
                    <h1>Connect</h1>
                </div>
                <div className="flex items-center justify-start mr-auto">
                    <Dot className="w-12 h-12"/>
                    <h1>Configure</h1>
                </div>
                <div className="flex items-center justify-start mr-auto">
                    <Dot className="w-12 h-12"/>
                    <h1>Capture</h1>
                </div>
                <div className="flex items-center justify-start mr-auto">
                    <Dot className="w-12 h-12"/>
                    <h1>Check</h1>
                </div>
                <div className="flex items-center justify-start mr-auto">
                    <Dot className="w-12 h-12"/>
                    <h1>Correct</h1>
                </div>
            </div>
            <div className='h-2 bg-white mt-6 mb-12 rounded-md'>
            </div>
            <div className='grid grid-cols-5 gap-4  justify-evenly mb-6'>
                <div className='flex flex-col gap-y-12'>
                    <Network className='bg-white text-slate-900 rounded-md w-40 h-40 p-4'/>
                    <h1 className='bg-white rounded-md px-4 py-2 w-40 text-1xl h-full'>
                        Begin by linking your camera feeds with the location details to our solution for continuous site monitoring.
                    </h1>
                </div>
                <div className='flex flex-col gap-y-12'>
                    <HardDrive className='bg-white text-slate-900 rounded-md w-40 h-40 p-4 '/>
                    <h1 className='bg-white rounded-md px-4 py-2 w-40 text-1xl h-full'>
                        Set up and configure the system to align with your site’s operations and safety requirements you would like to monitor.                    
                    </h1>
                </div>
                <div className='flex flex-col gap-y-12'>
                    <ScrollText className='bg-white text-slate-900 rounded-md w-40 h-40 p-4'/>
                    <h1 className='bg-white rounded-md px-4 py-2 w-40 text-1xl h-full'>
                        Our solution continuously analyzes real-time video footage to identify potential hazards, incidents and near misses.                    
                    </h1>
                </div>
                <div className='flex flex-col gap-y-12'>
                    <CircleCheckBig className='bg-white text-slate-900 w-40 h-40 rounded-md p-4'/>
                    <h1 className='bg-white rounded-md px-4 py-2 w-40 text-1xl h-full'>
                        Regularly review alerts to stay informed about the safety status and any incidents on your site and generate reports for further investigation.                   
                    </h1>
                </div>
                <div className='flex flex-col gap-y-12'>
                    <ThumbsUp className='bg-white text-slate-900 rounded-md w-40 h-40 p-4'/>
                    <h1 className='bg-white rounded-md px-4 py-2 w-40 text-1xl h-full'>
                        Implement necessary safety measures based on the insights provided, taking proactive steps to address and mitigate identified risks.                    
                    </h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FourthPanel