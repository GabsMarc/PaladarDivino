import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import styled from "styled-components"
import { api } from "../../../services/api"


interface IModalProps {
    open: boolean
    closeModal(value: boolean): void
    id: number
}


export function ModalProduct({ open, closeModal, id }: IModalProps) {

    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('')
    const [value, setValue] = useState(0)


    async function getProduct() {
        if (open) {
            await api.get('/product', {
                params: {
                    id: id
                }
            }).then((response) => {
                setNameProduct(response.data.product)
                setDescription(response.data.description)
                setImg(response.data.img)
                setValue(response.data.value)

            })
        }
    }

    useEffect(() => {
        getProduct()
    }, [open])


    return (
        <>
            {open && (
                <ModalContainer>
                    <ModalCard>
                        <Header>
                            <HeaderTitle>
                                <h1>Descrição</h1>
                            </HeaderTitle>
                            <HeaderButton>
                                <IIoMdClose onClick={() => { closeModal(false) }} />
                            </HeaderButton>
                        </Header>
                        <Content>
                            <ContentContainer>
                                <NameH2>{`${nameProduct}`}</NameH2>
                                <hr />
                                <Order>
                                    <DescriptionSpan>{description}</DescriptionSpan>
                                    <ValueSpan>{`R$${value.toFixed(2)}`}</ValueSpan>
                                </Order>
                            </ContentContainer>
                            <ImageContainer image={`data:image/png;base64,${img}`}>
                                {/* <Img image={`data:image/png;base64,${img}`} /> */}
                            </ImageContainer>
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
    width: 800px;
    min-height: 320px;
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

const ContentContainer = styled.div`
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

const ValueSpan = styled.span`
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    bottom: 20px;
    color: green;
`

const NameH2 = styled.h2`
    font-size: 23px;
    font-weight: bold;
`

const DescriptionSpan = styled.span`
    font-size: 23px;
    /* font-weight: bold; */
    padding-top: 10px;
`



const ImageContainer = styled.div<{ image: any }>`
    background-image: url(${props => props.image});
    background-size: cover;
    background-color: #FFC400;
    width: 420px;
    height: 250px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`





