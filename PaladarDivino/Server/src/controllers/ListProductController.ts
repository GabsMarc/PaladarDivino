import { Request, Response } from 'express';
import { ListProductService } from '../services/ListProductService';

class ListProductController {
    async handle(request: Request, response: Response) {

        const type = request.query.type
        const id = request.query.id

        const listProductService = new ListProductService()

        if (type) {
            const product = await listProductService.execute(request, response)
            return response.send(product)

        } else if (id) {
            await listProductService.productInfo(request, response)

        }




    }
}

export { ListProductController }