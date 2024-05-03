import { Request, Response } from "express";
import { ListOrderService } from "../services/ListOrderService";


class ListOrderController {
    async handle(request: Request, response: Response) {

        try {

            const listOrderController = new ListOrderService()
            const order = await listOrderController.execute(request, response)

            response.send(order)

        } catch (error) {
            console.log('Não foi possível listar os pedidos.')
        }



    }
}

export { ListOrderController }