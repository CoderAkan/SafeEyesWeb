import { FC } from "react";

import FirstPanel from "../components/MainPagePanels/FirstPanel";
import SecondPanel from "../components/MainPagePanels/SecondPanel";
import ThirdPanel from "../components/MainPagePanels/ThirdPanel";
import FourthPanel from "../components/MainPagePanels/FourthPanel";
import FifthPanel from "../components/MainPagePanels/FifthPanel";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: FC = () => {
    const { access_token } = useSelector((state: RootState) => state.user);
    const isAuth = !!access_token;
    return (
        <div>
            <Header />
            <FirstPanel />
            <SecondPanel />
            <ThirdPanel />
            <FourthPanel />
            {!isAuth && <FifthPanel />}
            <Footer />
        </div>
    )
}

export default Home;