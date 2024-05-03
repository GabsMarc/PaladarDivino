import React, { useEffect, useState, PropsWithChildren, useContext } from "react"
import styled from "styled-components"
import { Footer } from "./Footer"
import { Link, useNavigate } from "react-router-dom"
import Rosa from "../../../image/Rosa.png"
import { api } from "../../services/api"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../../../context"

interface ICardProps {
    TypeOfAccess: boolean
}




export const Card: React.FC<PropsWithChildren<ICardProps>> = ({
    TypeOfAccess,
}) => {
    
    
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [access, setAccess] = useState({
        title: '',
        obs: '',
        link: '',
        toPage: '',
    }
    );

    const { customerLogin, setCustomerLogin } = useContext(LoginContext)


    useEffect(() => {
        Access()
    }, [TypeOfAccess])


    async function HandleLogin() {

        await api.get('/login', {
            params: {
                email: email,
                password: password
            }
        })
            .then(response => {
                navigate('/menu')

                setCustomerLogin(response.data)
                console.log(customerLogin)
            })
            .catch(error => {
                RejectedMessage(error.response.data.error)
            })

    }


    async function RegisterCustumer() {


        await api.post("/register", {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }).then(response => {
            SuccessMessage()
            ClearInput()
            setTimeout(() => {
                
                navigate('/login')
            }, 2000);
        }).catch(error => {
            RejectedMessage(error.response.data.error)
        })



    }


    function ClearInput() {
        setName('')
        setLastname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }



    function Access() {
        if (TypeOfAccess) {
            setAccess({
                title: 'Entrar',
                obs: 'Faça login para acessar o cardapio da Hamburgueria DIVINO',
                link: 'Não tem uma conta?',
                toPage: '/register'
            })
        } else {
            setAccess({
                title: 'Criar conta',
                obs: 'Crie uma conta para acessar o cardapio da Hamburgueria DIVINO',
                link: 'Já tem uma conta?',
                toPage: '/login'
            }
            )
        }
    }


    function FormAccess() {
        if (TypeOfAccess === true) {
            return (
                <Card_Access $heigth={350}>
                    <Form>
                        <span>{access.obs}😊</span>

                        <Input
                            placeholder="Endereço de Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            type="button"
                            onClick={HandleLogin}
                        >Entrar</Button>
                    </Form>
                    <Pages to={`${access.toPage}`}>{access.link}</Pages>
                </Card_Access>
            )
        } else {
            return (
                <Card_Access $heigth={500}>
                    <Form>
                        <span>{access.obs}😊</span>
                        <Input
                            placeholder="Nome"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Sobrenome"
                            type="text"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                        />

                        <Input
                            placeholder="Endereço de Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Input
                            placeholder="Confirmar senha"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword?.(e.target.value)}
                        />
                        <Button
                            type="button"
                            onClick={RegisterCustumer}
                        >Criar conta</Button>
                    </Form>
                    <Pages to={`${access.toPage}`}>{access.link}</Pages>
                </Card_Access>
            )
        }
    }


    function SuccessMessage() {
        toast.success("Cadastro concluído com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }


    function RejectedMessage(info: string) {

        toast.warning(`${info}`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }


    return (
        <Container>
            <Background>
                <Input_Container>
                    <Title>{access.title}</Title>
                    {FormAccess()}
                </Input_Container>

            </Background>
            <ToastContainer />
            <Footer />
        </Container>
    )
}





const Container = styled.div`
    display: flex;
    flex-direction: column;

`


const Background = styled.div`
    background-image: url(${Rosa});
    background-size: cover;
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



const Input_Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`


const Title = styled.h1`
    color: #000000;
    font-family: overpass;
    font-size: 40px;
`


const Card_Access = styled.div<{ $heigth: number }>`
    width: 700px;
    height: ${props => `${props.$heigth}px`};
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 5px #00000016;
    display: flex;
    flex-direction: column;

    @media(max-width: 700px) {
        display: flex;
        justify-content: center;
        width: 600px   
    }

    @media(max-width: 600px) {
        display: flex;
        justify-content: center;
        width: 500px   
    }

    @media(max-width: 500px) {
        display: flex;
        justify-content: center;
        width: 370px   
    }
`

const Pages = styled(Link)`
    font-family: overpass;
    color: #cfcfcf;
    text-decoration: none;
    align-self: flex-end;
    margin-right: 15px;
    font-weight: bold;

    &:hover {
        color: #fa6a8e;
    }
`


const Form = styled.form`
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    span{
        font-family: overpass;
        color: #cfcfcf;

        @media(max-width: 500px) {
        text-align: center;
        }
    }
`

const Input = styled.input`
    height: 40px;
    width: 300px;
    border-radius: 5px;
    border: 0;
    background-color: #cfcfcf;
    margin: 5px;
    padding-left: 15px;
    padding-right: 15px;
    

    &::placeholder{
        color: #a3a3a3;
        font-weight: bold;
    }

    @media(max-width: 650px) {
        width: 300px   
    }

`

const Button = styled.button`
    width: 130px;
    height: 35px;
    border: 0;
    border-radius: 5px;
    font-family: overpass;
    font-size: 17px;
    font-weight: bold;
    background-color: #ffc400;
    color: white;
    margin-left: 270px;
    padding-top: 3px;
    transition: 0.5s;

    &:hover{
        cursor: pointer;
        background-color: #ff9900;
    }

    
    @media(max-width: 500px) {
        margin-right: 50px;
    }

`


