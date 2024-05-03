import { Multer } from 'multer';
import prismaClient from '../prisma'
import Express, { Response, Request } from 'express';

export class AddProductImageService {
    async execute(request: Request, response: Response) {

        const id = request.query.id
        const requestImage = request.file.buffer.toString('base64');

        try {
            const image = await prismaClient.product.update({
                where: {
                    id: parseInt(id as string)
                },
                data: {
                    img: requestImage
                }
            })
            
            return image


        } catch (error) {
            return response.json('Erro ao salvar a imagem! ' + error)
        }


    }
}