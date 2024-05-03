import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import styled from "styled-components"
import { api } from "../../../services/api"


interface IModalProps {
    open: boolean
    closeModal(value: boolean): void
    id: number
}


export function ModalAddImage({ open, closeModal, id }: IModalProps) {

    const [file, setFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    function handleFileChange(e: any) {
        const selectedFile = e.target.files[0];

        setFile(e.target.files[0]);
        const imageUrl = URL.createObjectURL(selectedFile);
        setImageUrl(imageUrl)
    };

    useEffect(() => {
        setImageUrl('')
    }, [open])


    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file as File);

        api.put('/ProductImage', formData, {
            params: {
                id: id
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
    }


    return (
        <>
            {open && (
                <ModalContainer>
                    <ModalCard>
                        <Header>
                            <HeaderTitle>
                                <h1>Defina a imagem do produto</h1>
                            </HeaderTitle>
                            <HeaderButton>
                                <IIoMdClose onClick={() => { closeModal(false) }} />
                            </HeaderButton>
                        </Header>
                        <Content>
                            <A>
                                <h2>Informe a imagem abaixo</h2>
                                <hr />
                                <Order>
                                    <form encType="multipart/form-data">
                                        <input type="file" name="image" onChange={handleFileChange} />
                                        <ConfirmOrder type="button" onClick={handleUpload}>
                                            Enviar Imagem
                                        </ConfirmOrder>
                                    </form>
                                </Order>
                            </A>
                            <B>
                                <Img src={imageUrl as string} />
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
    width: 800px;
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

const B = styled.div`
    background-color: #FFC400;
    width: 280px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3{
        font-size: 23px;
    }
`

const ConfirmOrder = styled.button`
    border-radius: 10px;
    background-color: #C00038;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 460px;
    color: white;
    font-size: 22px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;

`

const Img = styled.img`
    max-width: 270px;
    max-height: 300px;
`