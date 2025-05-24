import {FC} from 'react'
import GridCell3 from './GridCell3'
import { ChartNoAxesCombined, ShieldCheck, UserPen } from 'lucide-react'

const ThirdPanel: FC = () => {
  return (
    <div id="third panel" className="min-h-96 flex flex-col justify-evenly items-center pb-8 pt-12">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-light pb-6">Why Choose Us</h1>
            <h2 className="text-2xl font-light justify-center text-center px-20">We commend the safety heroes at WHS aiming for a perfect safety record. Our solution acts as a reliable sidekick, enhancing safety surveillance with an extra vigilant perspective.</h2>
        </div>
            <div className="p-4">
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg">
                    <GridCell3 mainIcon={UserPen} title={"Enhanced Safety Compliance"} subtitle1={"Improve safety compliance by reducing unreported hazards"} subtitle2={"Enable proactive safety with insights from past trends"}/>
                    <GridCell3 mainIcon={ShieldCheck} title={"Reduce Costs"} subtitle1={"Minimize Lost Time Injuries (LTI) and related costs"} subtitle2={"Lower insurance costs by preventing incidents"}/>
                    <GridCell3 mainIcon={ChartNoAxesCombined} title={"Productivity"} subtitle1={"Automate routine safety tasks to free up time for critical issues"} subtitle2={"Make hazard reporting simple and efficient"}/>
                    <GridCell3 mainIcon={UserPen} title={"Maximizing Value"} subtitle1={"Utilize existing CCTV resources"} subtitle2={"Implement a cost-effective solution"}/>
                    <GridCell3 mainIcon={ShieldCheck} title={"Actionable Insights"} subtitle1={"Access event video snippets"} subtitle2={"Obtain precise incident information"}/>
                    <GridCell3 mainIcon={ChartNoAxesCombined} title={"Easy and Configurable"} subtitle1={"Simple setup process"} subtitle2={"Customize notifications to suit your needs"}/>
                </div>
            </div>
        </div>
  )
}

export default ThirdPanel
