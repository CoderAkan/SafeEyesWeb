import { FC } from "react";

import FirstPanel from "../components/MainPagePanels/FirstPanel";
import SecondPanel from "../components/MainPagePanels/SecondPanel";
import ThirdPanel from "../components/MainPagePanels/ThirdPanel";
import FourthPanel from "../components/MainPagePanels/FourthPanel";
import FifthPanel from "../components/MainPagePanels/FifthPanel";

const Home: FC = () => {
    return (
        <div>
            <FirstPanel />
            <SecondPanel />
            <ThirdPanel />
            <FourthPanel />
            <FifthPanel />
        </div>
    )
}

export default Home;