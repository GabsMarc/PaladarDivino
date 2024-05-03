import styled from "styled-components"
import { Sidebar } from "./components/Sidebar"
import { ProductCard, ProductCardPromo } from "./components/ProductCard"
import { useContext, useEffect, useState } from "react"
import { Footer } from "../../Shared/components/Footer"
import { LoginContext } from "../../../context"
import { api } from "../../services/api"
import { Bounce, ToastContainer, toast } from 'react-toastify';

import { Modal } from "./components/Modal"
import { ModalAddImage } from "./components/ModalAddImage"
import { ModalProduct } from "./components/ModalProduct"

import PromoBanner from '../../../image/PromoBanner.jpg'
import homeBanner from '../../../image/BannerHome.jpg'

import Hamburguer from '../../../image/tra.webp'
import Bebida from '../../../image/coca.jpeg'
import Salgado from '../../../image/pqueijo.jpg'




export function Menu() {

    const { customerLogin, setCustomerLogin } = useContext(LoginContext)
    const customerName = `${Object(customerLogin).name} ${Object(customerLogin).lastname}`
    const customerAdmin = Object(customerLogin).admin

    const [homePage, setHomePage] = useState(false)
    const [productOption, setProductOption] = useState('')
    const [productCard, setProductCard] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openModalImg, setOpenModalImg] = useState(false)
    const [openModalProduct, setOpenModalProduct] = useState(false)
    const [idProduct, setIdProduct] = useState(0)

    useEffect(() => {
        setHomePage(true)
    }, [])





    async function getProduct(type: string) {

        await api.get('/product', {
            params: {
                type: type
            }
        }).then((response) => {
            setProductCard(response.data)
        })

        ProductOption(type)
        console.log(customerLogin)
    }


    async function addOrder(idProduct: number) {

        const customer = Object(customerLogin).id

        await api.post('/order', {
            idProduct: idProduct.toString(),
            idCustomer: customer.toString()
        }).then((response) => {
            SuccessMessage(`${response.data.message} foi adicionado(a) no carrinho.`)
        })


    }


    async function HandleModal(value: boolean) {

        if (value) {

            await api.get('/order', {
                params: {
                    id: parseInt(Object(customerLogin).id)
                }
            }).then((res) => {
                if (res.data.length === 0) {
                    setOpenModal(false)
                    InfoMessage('Sem pedidos para serem mostrados!')
                } else if (res.data.length != 0) {
                    setOpenModal(true)
                }
            })

        }

    }






    function CardContent() {
        if (homePage) {
            return (
                <HomeContainer>
                    <HomeBanner />
                    <h2>Promoções</h2>
                    <HomePromo>
                        <ProductCardPromo name="tradicional" value={23.99} img={Hamburguer} />
                        <ProductCardPromo name="Pão de Queijo" value={5.00} img={Salgado} />
                        <ProductCardPromo name="Coca-Cola" value={8.99} img={Bebida} />
                    </HomePromo>
                </HomeContainer>
            )
        } else {
            return (
                <Cards>
                    {CardOption()}
                </Cards>
            )
        }
    }


    function OpenModalImage(id: number, value: boolean) {
        if (value && customerAdmin) {
            setIdProduct(id)
            setOpenModalImg(value)

        } else if (customerAdmin === false) {
            setIdProduct(id)
            setOpenModalProduct(value)
        }
    }


    function OrderConfirm(value: boolean) {
        if (value === true) {
            SuccessMessage('O Pedido foi confirmado e será entregue!')

            setTimeout(() => {
                setOpenModal(false)
            }, 1500);
        }
    }


    function CardOption() {
        switch (productOption) {
            case 'L':
                return (productCard.map((product: any) => {
                    return <ProductCard
                        key={product.id}
                        name={product.product}
                        value={product.value}
                        img={product.img}
                        onClickImage={(value) => { OpenModalImage(product.id, value) }}
                        onClick={() => { addOrder(product.id) }} />
                }))
                break;
            case 'B':
                return (productCard.map((product: any) => {
                    return <ProductCard
                        key={product.id}
                        name={product.product}
                        value={product.value}
                        img={product.img}
                        onClickImage={(value) => { OpenModalImage(product.id, value) }}
                        onClick={() => { addOrder(product.id) }} />
                }))
                break;
            case 'H':
                return (productCard.map((product: any) => {
                    return <ProductCard
                        key={product.id}
                        name={product.product}
                        value={product.value}
                        img={product.img}
                        onClickImage={(value) => { OpenModalImage(product.id, value) }}
                        onClick={() => { addOrder(product.id) }} />
                }))
                break;
        }
    }


    function ProductOption(option: string) {
        setHomePage(false)
        setProductOption(option)
    }


    function SuccessMessage(message: string) {
        toast.success(message, {
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

    function InfoMessage(message: string) {
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
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
        <MenuPage>
            <Modal
                open={openModal}
                onClickOrder={(value) => { OrderConfirm(value) }}
                closeModal={(value) => { setOpenModal(value) }}
            />
            <ModalAddImage
                open={openModalImg}
                id={idProduct}
                closeModal={(value) => { setOpenModalImg(value) }}
            />
            <ModalProduct
                open={openModalProduct}
                id={idProduct}
                closeModal={(value) => { setOpenModalProduct(value) }}
            />
            <Sidebar
                onClickHomePage={setHomePage}
                onClickOrder={(value) => { HandleModal(value) }} />
            <MenuContainer>
                <Page>
                    <Customer>
                        <h1>
                            {`Bem vindo(a) ${customerName}`}
                        </h1>
                    </Customer>
                    <Banner />
                    <Options>
                        <span onClick={() => getProduct('L')}>Salgados</span>
                        <span onClick={() => getProduct('H')}>Hamburguers</span>
                        <span onClick={() => getProduct('B')}>Bebidas</span>
                    </Options>
                    <CardContainer>
                        {CardContent()}
                    </CardContainer>
                    <Footer />
                </Page>
                <ToastContainer />
            </MenuContainer>
        </MenuPage>
    )
}






const MenuPage = styled.div`
    height: 100%;
    background-color: #eeeeee;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`

const Page = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 130px;

`

const Customer = styled.div`
    display: flex;
    justify-content: center;
    font-family: overpass;
    margin: 20px 0px 0px 0px;
    
    h1 {
        background-color: #F74D85;
        color: #FFF;
        border-radius: 10px;
        padding: 10px;
        font-size: 30px;
        box-shadow: 5px 5px 5px 5px #00000057;
    }

`

const Banner = styled.div`
    margin: 30px 0px 30px 0px;
    width: 90vw;
    height: 400px;
    background-image: url(${homeBanner});
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 5px #00000057;
    align-self: center;
`

const Options = styled.div`
        display: flex;
        flex-direction: row;
        gap: 60px;
        background-color: #C00038;
        justify-content: center;
        padding-top: 5px;
        border-radius: 10px;
        margin-bottom: 30px;
        box-shadow: 0px 10px 10px 5px #00000057;
        
        span {
            transition: 0.3s;
            font-size: 23px;
            cursor: pointer;
            font-family: overpass;
            font-weight: bold;
            color: white;
        }

        span:hover{
            color: #F74D85;
        }
    
`


const CardContainer = styled.div`
    display: flex;
    width: 90vw;
    padding: 20px 20px 50px 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 5px #00000057;
    margin-bottom: 40px;
`

const Cards = styled.div`
    display: flex;
    gap: 47px;
    flex-wrap: wrap;
    justify-content: flex-start;
`


const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    
    h2{
        align-self: center;
        font-family: overpass;
        margin: 15px 0px 15px 0px;
        color: #FF677E;
        font-size: 40px;
        
    }
`

const HomeBanner = styled.div`
    background-image: url(${PromoBanner});
    background-size: cover;
    width: 100%;
    height: 400px;
    border-radius: 10px;
    
`

const HomePromo = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
`








