import { Response, Request } from 'express';
import { AddProductImageService } from '../services/AddProductImageService';

export class AddProductImageController{
    async handle(request: Request, response: Response) {

        const addProductImageController = new AddProductImageService()
        const image = await addProductImageController.execute(request, response)

        return response.send(image)
    }
}
