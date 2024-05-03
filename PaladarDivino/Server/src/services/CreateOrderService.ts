import { Request, Response } from "express";
import prismaClient from "../prisma";

class CreateOrderService {
    async execute(request: Request, response: Response) {

        try {
  
            const{ idProduct, idCustomer } = request.body

            if (!idProduct || !idCustomer) {
                response.json({ error: 'Infomações necessárias!' })
            }

            const order = await prismaClient.order.create({
                data: {
                    id_product:  parseInt(idProduct),
                    id_custumer: parseInt(idCustomer)
                }
            })

            const product = await prismaClient.product.findFirst({
                where: {
                    id: parseInt(idProduct)
                }
            })



            return product

        } catch (error) {
            response.json({error: "Não foi possível registrar um novo pedido."})
        }
    }
}

export { CreateOrderService }