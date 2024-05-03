import styled from "styled-components"
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import LogoApp from "../../../image/Logo/Hamburgueria Divino.png"
import Rosa from "../../../image/Rosa.png"
import { useNavigate } from "react-router-dom";

export const Footer = () => {

    const navigate =  useNavigate()

    return (
        <Footer_Container>
            <Footer_Content>
                <Logo>
                    <Img src={LogoApp} onClick={() => {navigate('/pagina-inicial')}}/>
                </Logo>
                <Social>
                    <a target="_blank" href="https://www.linkedin.com/in/gabriel-marcucci-3ab386208/"><FaLinkedin /></a>
                    <a target="_blank" href="https://github.com/GabsMarc"><FaGithubSquare /></a>
                </Social>
            </Footer_Content>
        </Footer_Container>
    )
}

const Footer_Container = styled.div`
    width: 100%;
    height: 230px;
    background-color: #ececec;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 

`

const Footer_Content = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;

`


const Logo = styled.div`
    display: flex;
    flex-grow: 5;
    justify-self: center;
    align-self: center;
    justify-content: center;


`

const Img = styled.img`
    width: 150px;
    height: 50px;
    cursor: pointer;
`

const Social = styled.div`
    display: flex;
    flex-grow: 6;
    justify-content: right;
    align-items: center;
    gap: 10px;
    justify-content: center;

    a{
        color: #d82a47;        
        font-size: 35px;
    }

`
