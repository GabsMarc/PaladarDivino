import { Request, Response } from "express";
import prismaClient from "../prisma";

class DeleteOrderService {



    async execute(request: Request, response: Response) {


        const { id } = request.query

        const order = await prismaClient.order.deleteMany({
            where: {
                id_custumer: parseInt(id as string)
            }
        })

        return order.count


    }




    async deleteOne(request: Request, response: Response) {

        const { id, idProduct } = request.query


        const getId = await prismaClient.order.findFirst({
            where: {
                id_custumer: parseInt(id as string),
                id_product: parseInt(idProduct as string) 
            }
        })


        const order = await prismaClient.order.delete({
            where: {
                id: getId.id,
                id_custumer: parseInt(id as string),
                id_product: parseInt(idProduct as string) 
            }
        })


    }



}

export { DeleteOrderService }