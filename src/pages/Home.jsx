import PartnersCarousel from "../components/PartnersCarousel.jsx"
import Content from "../components/Content"
import Groups from "../components/Groups.jsx"
import Topics from "../components/Topics.jsx"
import Description from "../components/Description.jsx"
import Recommendations from "../components/Recommendations.jsx"


export default function Home() {

    return (
        <>
            <Content />
            <PartnersCarousel />
            <Groups />
            <Description />
            <Topics />
            <Recommendations />
        </>
    )


}