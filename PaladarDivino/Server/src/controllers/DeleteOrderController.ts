import { Request, Response } from "express";
import { DeleteOrderService } from "../services/DeleteOrderService";
import prismaClient from "../prisma";


class DeleteOrderController {
    async handle(request: Request, response: Response) {
        try {

            const { id, idProduct } = request.query


            if (!id) {
                response.status(400).json('Identificador necessário!')
            }

            const deleteOrder = new DeleteOrderService()






            if (id && idProduct) {             

                const order = await deleteOrder.deleteOne(request, response)
                return response.json('Pedido Deletado')

            } else if (id && !idProduct) {

                const order = await deleteOrder.execute(request, response)
                return response.json(order + ` registros excluidos.`)
            }



        } catch (error) {
            // response.status(400).json('Não foi possivel deletar o registro.')
        }
    }
}

export { DeleteOrderController }