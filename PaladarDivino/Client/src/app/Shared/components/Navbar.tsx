import styled from "styled-components"
import { Link } from "react-router-dom"
import logo from "../../../image/pixel_hamburguer.png"

 

export const Navbar = (props: { show: boolean }) => {

    function ShowButtons() {
        if (props.show === true) {
            return (
                <Navbar_Buttons $justifycontent={'space-between'}>
                    <Pages to='/Login'>Entrar</Pages>
                    <Pages to='/Register'>Registrar-se</Pages>
                </Navbar_Buttons>
            )
        } else {
            return (
                <Navbar_Buttons $justifycontent={'center'}>
                    <span>Login</span>
                </Navbar_Buttons>
            )
        }
    }

    return (
        <Navbar_Container>
            <Navbar_Logo>
                <img src={logo} height={80} />
            </Navbar_Logo>
            {ShowButtons()}
        </Navbar_Container>
    )
}
 




const Navbar_Container = styled.div`
    height: 130px;
    background-color: #C00038;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border-bottom: 5px solid #ffc400;


`
 



const Navbar_Buttons = styled.div<{ $justifycontent?: string }>`
    width: 200px;
    padding: 5px;
    padding-left: 50px;
    padding-right: 50px;
    border-radius: 100px 100px 0px 0px;
    display: flex;
    justify-content: ${props => `${props.$justifycontent}`};
    background-color: #ffc400;
    align-self: center;
    flex-grow: 1;

    span{
    color: white;
    font-size: 17px;
    text-decoration: none;
    font-family: overpass;
    padding-top: 4px;
    }
`

const Pages = styled(Link)`
    color: white;
    font-size: 20px;
    text-decoration: none;
    font-family: overpass;
    font-weight: bold;
    padding-top: 4px;
    transition: 0.4s;

    &:hover{
        color: #95BBDE;
    }
    
`



const Navbar_Logo = styled.div`
    margin-top: 10px;
    align-self: center;
    flex-grow: 1;
    
`

