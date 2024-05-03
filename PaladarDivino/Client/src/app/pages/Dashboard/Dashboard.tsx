import { Navbar } from "../../Shared/components/Navbar"
import styled from "styled-components"
import { Footer } from "../../Shared/components/Footer"
import BannerDashboard from "../../../image/BannerDashboard.png"
import Logo from "../../../image/Logo/Hamburgueria Divino.png"




export const Dashboard = () => {

    return (
        <DashboardContainer>
            <Navbar show={true} />
            <Banner>
                <BannerHome src={BannerDashboard} />
                <LogoHome>
                    <img src={Logo} />
                </LogoHome>
            </Banner>
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </DashboardContainer>
    )

}


const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #C00038;
    width: 100%;
    height: 100vh;
`

const Banner = styled.div`

`

const BannerHome = styled.img`
    width: 100%;
    height: 80vh;  
    margin-top: 10px; 
    margin-bottom: 10px;
    display: block;

    @media(max-width: 650px){
        display: none;
    }
`


const LogoHome = styled.div`
    display: flex;
    justify-content: center;
    display: none;
    
    img{
        margin-top: 30%;
        margin-bottom: 10px; 
        
        @media(max-width: 650px){
            width: 80%;
            height: 200px;
            display: block;
        }
    }


    @media(max-width: 650px){
        height: 80vh;  
        display: flex;
        justify-content: center;
    }
       
`

const FooterContainer = styled.div`
    display: flex;
    width: 100vw;
` 