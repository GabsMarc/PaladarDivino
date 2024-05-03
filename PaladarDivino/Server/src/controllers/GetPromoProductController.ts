import { GetPromoProductService } from './../services/GetPromoProductService';
import { Request, Response } from "express";

export class GetPromoProductController {

    async handle(request: Request, response: Response) {

        const getPromoProductService = new GetPromoProductService()
        const promo = await getPromoProductService.execute(request, response)

        return response.send(promo)
    }

}