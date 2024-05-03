import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prismaClient from "../prisma";

class ListProductService {
    async execute(request: Request, response: Response) {

        const type = request.query.type

        try {
            const product = await prismaClient.product.findMany({
                where: {
                    type: type as string
                }
            })

            return product

        } catch (error) {
            return response.status(400).json({ error: "Erro ao encontrar os produtos" })
        }
    }

    async productInfo(request: Request, response: Response) {

        const id = request.query.id

        try {
            const product = await prismaClient.product.findFirst({
                where: {
                    id: parseInt(id as string)
                }
            })

            response.send({
                product: product.product,
                description: product.description,
                img: product.img,
                value: product.value
            })


        } catch (error) {
            return response.status(400).json({ error: "Erro ao encontrar o produto" })
        }
    }
}

export { ListProductService }