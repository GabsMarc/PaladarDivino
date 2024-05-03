import { FaHome, FaShoppingCart } from "react-icons/fa"
import { TbLogout2 } from "react-icons/tb";
import styled from "styled-components"
import logoPixel from '../../../../image/pixel_hamburguer.png'
import { Link, useNavigate } from "react-router-dom";
import React, { PropsWithChildren } from "react";


interface ISidebar {
    onClickHomePage?: (value: boolean) => void
    onClickOrder?: (value: boolean) => void
}


export const Sidebar: React.FC<PropsWithChildren<ISidebar>> = ({
    onClickHomePage,
    onClickOrder
}) => {

    const navigate = useNavigate()

    function Access(logout: boolean) {

        navigate('/pagina-inicial')
    }

    return (
        <Sidebar_Container>
            <Sidebar_Options>
                <Link to={'/pagina-inicial'}><Logo src={logoPixel} /></Link>
                <Options>
                    <Buttons>
                        <Li onClick={() => onClickHomePage?.(true)}>
                            <span><FaHome /></span>
                            <p>Página inicial</p>
                        </Li>

                        <Li onClick={() => onClickOrder?.(true)}>
                            <span><FaShoppingCart /></span>
                            <p>Pedidos</p>
                        </Li>

                        <Li style={{ marginTop: 560 }} onClick={() => Access(true)}>
                            <span><TbLogout2 /></span>
                            <p>Desconectar</p>
                        </Li>
                    </Buttons>
                </Options>
            </Sidebar_Options>
        </Sidebar_Container>
    )
}


const Sidebar_Container = styled.div`
    background-color: #C00038;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100px;
    transition: 0.4s;
    position: fixed;
    font-family: overpass;
    box-shadow: 5px 0px 10px 5px #00000034;
    
    &:hover{
        width: 300px;
    
        p{
            display: block;
        }

        img{
            width: 90px;
            height: 70px;
        }

    }

`

const Sidebar_Options = styled.div`
    display: flex;
    flex-direction: column;

`

const Logo = styled.img`
    width: 80px;
    height: 60px;
    padding-top: 10px;
    transition: 0.7s;
`

const Options = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 20px;
    margin-top: 100px;
`

const Buttons = styled.ul`
    list-style-type: none;
    text-decoration: none;
`

const Li = styled.li`
    display: flex;
    gap: 30px;
    transition: 0.3s;
    border-radius: 20px;
    margin-top: 10px;
    padding: 0px 15px;
    padding-top: 18px;
    color: white;
    cursor: pointer;

    span {
        font-size: 35px;
        color: white;
        padding-bottom: 3px;
    }

    p {
        display: none;
        font-size: 27px; 
        white-space: nowrap;
    }

    &:hover{
        background-color: #00000060;
    }

`

