import { Request, Response } from "express";
import { CreateOrderService } from "../services/CreateOrderService";

class CreateOrderController {
    async handle(request: Request, response: Response) {
        try {

            const createOrder = new CreateOrderService()
            const order = await createOrder.execute(request, response)

            response.status(200).json({message: order.product})

        } catch (error) {
            response.status(400).json({ error: 'Erro ao adicionar o pedido' })
        }
    }
}

export { CreateOrderController }