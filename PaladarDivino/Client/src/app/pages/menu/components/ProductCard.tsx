import React, { FC, PropsWithChildren } from "react"
import styled from "styled-components"


interface IProductCard {
    name?: string,
    value: number,
    img?: string,
    onClick?(value: boolean): void
    onClickImage?(value: boolean): void
}

export const ProductCard: React.FC<PropsWithChildren<IProductCard>> = ({
    name,
    value,
    img,
    onClick,
    onClickImage
}) => {



    return (
        <CardContainer>
            <ImageProduct
                image={`data:image/png;base64,${img}`}
                onClick={() => onClickImage?.(true)} 
            />
            <ProductInfo>
                <Product>
                    <p>{name}</p>
                </Product>
                <Price>
                    <p>R${value.toFixed(2)}</p>
                </Price>
            </ProductInfo>
            <ButtonContainner onClick={() => onClick?.(true)}>
                <span>Adicionar</span>
            </ButtonContainner>
        </CardContainer>
    )
}


export const ProductCardPromo: React.FC<PropsWithChildren<IProductCard>> = ({
    name,
    value,
    img
}) => {



    return (
        <CardContainer>
            <ImageProduct
                image={img}
            />
            <ProductInfo>
                <Product>
                    <p>{name}</p>
                </Product>
                <Price>
                    <p>R${value.toFixed(2)}</p>
                </Price>
            </ProductInfo>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    background-color: #eeeeee;
    width: 300px;
    height: 350px;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 5px #00000057;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: overpass;
`

const ImageProduct = styled.div<{ image: any }>`
    background-image: url(${props => props.image});
    background-size: cover;
    width: 270px;
    height: 160px;
    display: flex;
    border-radius: 10px;
    flex-grow: 1;
    margin: 10px 10px 10px 10px;
    box-shadow: 0px 2px 5px 3px #00000057;
    cursor: pointer;
`

const ProductInfo = styled.div`
    width: 95%;
    display: flex;
    flex-grow: 5;
    flex-direction: column;
    margin: 0px 0px 10px 0px;
`

const Product = styled.div`
    display: flex;
    flex-grow: 1;

    p {
        padding: 5px 5px 0px 5px;
        font-size: 23px;
    }
    
`

const Price = styled.div`
    /* background-color: yellow; */
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: end;
    flex-grow: 1;

    p {
        font-size: 23px;
        font-weight: bold;
    }
`


const ButtonContainner = styled.div`
    background-color: #C00038;
    width: 100%;
    flex-grow: 2;
    display: flex;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: 0.3s;

    span{
        color: white;
        font-size: 20px;
    }


    &:hover{
        background-color: #99002b;
    }
`






