import {FC} from 'react'

const FirstPanel: FC = () => {
  return (
    <div id="first panel" className="h-72 flex justify-evenly items-center">
        <div className="flex flex-col gap-y-4">
            <h1 className="font-bold text-4xl">Start Your 30-Day Free Trial</h1>
            <h1 className="font-bold text-2xl text-yellow-300">Exclusive offer</h1>
            <h1 className="font-light text-xl">Simple, Affordable Subscription for Enhanced Safety</h1>
        </div>
        <div className="font-bold bg-yellow-300 text-3xl rounded-md px-10 py-2 text-slate-900">
            Sign up now
        </div>
    </div>
  )
}

export default FirstPanel
