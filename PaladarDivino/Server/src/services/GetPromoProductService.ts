import { Request, Response } from "express";
import prismaClient from "../prisma";

export class GetPromoProductService {

    async execute(request: Request, response: Response) {

        const promo = await prismaClient.product.findMany({
            take: 3
        })

        return promo
    }


}