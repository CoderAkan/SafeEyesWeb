import {FC} from 'react'
import { 
    Shield, 
    UserX, 
    HardHat, 
    ArrowUpDown, 
    Ban, 
    Thermometer, 
    Smartphone, 
    Construction,
  } from 'lucide-react';

const SecondPanel: FC = () => {
  return (
    <div id="second panel" className="min-h-96 flex flex-col bg-white text-slate-900 pb-8">
        <div className="flex w-full items-center px-5 py-5 justify-between">
            <div className="flex flex-col mx-3 gap-y-4">
                <h1 className="text-4xl font-bold">What We Do</h1>
                <h1 className="font-light text-xl max-w-[40ch] break-words">Using CCTV, we detect safety hazards, near misses, incidents and help you with alerts in the following areas depending on the nature of your operations and site conditions:</h1>
            </div>
            <iframe className="rounded-md" width="505" height="300" src="https://www.youtube.com/embed/NvcNyBn2UL4?si=27gm7hjr4Ip7qDit" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="p-4">
            <div className="grid grid-cols-4 gap-4 p-4 rounded-lg">
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Missing PPE</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <UserX className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Falls</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <HardHat className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Mobile Plant Works</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <ArrowUpDown className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Signage</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <Ban className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Exclusion Zones</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Hot Works</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <Smartphone className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Mobile Phones</h3>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-md">
                    <Construction className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <h3 className="text-sm font-semibold text-gray-800">Site Conditions</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondPanel
