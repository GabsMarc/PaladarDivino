import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import { api } from "../../../services/api";
import { LoginContext } from "../../../../context";
import LogoHamburguer from '../../../../image/Logo/Hamburgueria Divino.png'
import { MdDeleteOutline } from "react-icons/md";
import { Bounce, toast } from "react-toastify";


interface IModalProps {
    open: boolean
    closeModal(value: boolean): void
    onClickOrder(value: boolean): void
}

type TypeOrders = {
    id: number
    product: string
    value: number
    amount: string
}


const confirmOrder: Boolean = true
const deleteOne: Boolean = false


export const Modal = ({ open, closeModal, onClickOrder }: IModalProps) => {

    const { customerLogin } = useContext(LoginContext)
    const [order, setOrder] = useState([])
    const [totalAmount, setTotalAmount] = useState('')
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        listOrder()
    }, [open])

    useEffect(() => {
        CalcAmount()
    }, [order])





    async function listOrder() {

        if (open) {
            await api.get('/order', {
                params: {
                    id: parseInt(Object(customerLogin).id)
                }
            }).then((res) => {
                setOrder(res.data)
                CalcAmount()
            })
        }

    }


    async function OrderOption(option: Boolean, id?: Number) {

        if (option === deleteOne) {
            await api.delete('/deleteOrder', {
                params: {
                    id: Object(customerLogin).id,
                    idProduct: id
                }
            })
        } else if (option === confirmOrder) {
            await api.delete('/deleteOrder', {
                params: {
                    id: Object(customerLogin).id
                }
            })
            onClickOrder(true)
        }

        listOrder()
    }


    function CalcAmount() {
        let quantidade: number = 0

        order.forEach((e: TypeOrders) => {

            quantidade += e.value * parseInt(e.amount)

        })

        setTotalAmount((quantidade.toFixed(2)).toString())
    }


    return (
        <>
            {open && (
                <ModalContainer >
                    <ModalCard>
                        <Header>
                            <HeaderTitle>
                                <h1>Seus Pedidos</h1>
                            </HeaderTitle>
                            <HeaderButton>
                                <IIoMdClose onClick={() => { closeModal(false) }} />
                            </HeaderButton>
                        </Header>
                        <Content>
                            <A>
                                <h2>Produtos</h2>
                                <hr />
                                <Order>
                                    {order.map((e: TypeOrders) => {
                                        return (
                                            <Orders id={e.id.toString()}>
                                                <span> - {e.product}</span>
                                                <Value><span>Valor: </span>R${e.value.toFixed(2)}</Value>
                                                <Amount><span>Quantidade:</span> {e.amount}</Amount>
                                                <Delete onClick={() => { OrderOption(false, e.id) }}>
                                                    <MMdDeleteOutline />
                                                </Delete>
                                            </Orders>
                                        )
                                    })}
                                </Order>
                            </A>
                            <B>
                                <Logo src={LogoHamburguer} />
                                <h3>Valor Total: R${totalAmount}</h3>
                                <ConfirmOrder onClick={() => { OrderOption(true) }}>
                                    <p>Confimar Pedido</p>
                                </ConfirmOrder>
                            </B>
                        </Content>
                    </ModalCard>
                </ModalContainer>
            )}
        </>

    )


}

const ModalContainer = styled.div`
    background-color: rgba(49,49,49,0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
`

const ModalCard = styled.div`
    width: 850px;
    min-height: 360px;
    background-color: white;
    position: absolute;
    top: 30%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    background-color: #C00038;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 35px;
    display: flex;
    align-items: center;
`

const HeaderTitle = styled.div`
    flex-grow: 1;
    
    h1{
        font-family: overpass;
        font-size: 25px;
        padding-left: 30px;
        padding-top: 3px;
        color: white;
    }
    
    `

const HeaderButton = styled.div`
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    text-align: end;
    padding-right: 10px;
`

const IIoMdClose = styled(IoMdClose)`
    font-size: 35px;
    color: #000000;
    cursor: pointer;

    :hover{
        color: white;
    }
`


const Content = styled.div`
    flex-grow: 7;
    display: flex;
    padding: 10px;
    font-family: overpass;
`

const A = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 3;
    padding: 10px;
    `

const Order = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-direction: column;
`

const Orders = styled.div`
    display: flex;
    flex-direction: row;
`
const Amount = styled.span`
    position: absolute;
    left: 245px;

    span{
        font-weight: bold;
    }
`

const Value = styled.span`
    position: absolute;
    left: 370px;

    span{
        font-weight: bold;
    }
`

const Delete = styled.div`
    position: absolute;
    left: 490px;
    font-size: 25px;
    color: red;
    cursor: pointer;
    
    :hover{
        background-color: red;
        color: white;
        font-size: 27px;
    }

`

const MMdDeleteOutline = styled(MdDeleteOutline)`
    transition: 0.2s;
    border-radius: 10px;

`

const B = styled.div`
    background-color: #FFC400;
    width: 280px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h3{
        font-size: 23px;
    }
`

const Logo = styled.img`
    width: 230px;
    height: 100px;
    margin-top: 10px;
`

const ConfirmOrder = styled.button`
    width: 190px;
    border-radius: 10px;
    background-color: #C00038;
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    border: none;

    :hover{
        background-color: #910029;
        cursor: pointer;
    }


    p{
        color: white;
        font-size: 22px;
        padding: 10px;
        border-radius: 10px;
    }

`