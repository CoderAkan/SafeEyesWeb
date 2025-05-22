import { FC } from "react";
import { FaHelmetSafety, FaPersonFallingBurst } from "react-icons/fa6";
import { MdConstruction, MdBlock } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import { PiThermometerHotLight, PiDeviceMobileSlash } from "react-icons/pi";
import { GiCrane } from "react-icons/gi";







const Home: FC = () => {
    return (
        <div>
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
            <div id="second panel" className="h-fit flex flex-col bg-white text-slate-900">
                <div className="flex w-full items-center px-5 py-5 justify-between">
                    <div className="flex flex-col mx-3 gap-y-4">
                        <h1 className="text-4xl font-bold">What We Do</h1>
                        <h1 className="font-light text-xl max-w-[40ch] break-words">Using CCTV, we detect safety hazards, near misses, incidents and help you with alerts in the following areas depending on the nature of your operations and site conditions:</h1>
                    </div>
                    <iframe className="rounded-md" width="505" height="300" src="https://www.youtube.com/embed/NvcNyBn2UL4?si=27gm7hjr4Ip7qDit" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="grid grid-rows-2 grid-cols-4 gap-4">
                    <div>
                        <FaHelmetSafety />
                        <h1>Missing PPE</h1>
                    </div>
                    <div>
                        <FaPersonFallingBurst />
                        <h1>Falls</h1>
                    </div>
                    <div>
                        <MdConstruction />
                        <h1>Mobile Plant Works</h1>
                    </div>
                    <div>
                        <GoArrowSwitch />
                        <h1>Signage</h1>
                    </div>
                    <div>
                        <MdBlock />
                        <h1>Exclusion Zones</h1>
                    </div>
                    <div>
                        <PiThermometerHotLight />
                        <h1>Hot Works</h1>
                    </div>
                    <div>
                        <PiDeviceMobileSlash />
                        <h1>Mobile Phones</h1>
                    </div>
                    <div>
                        <GiCrane />
                        <h1>Site Conditions</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;