import { Request, Response } from "express";
import prismaClient from "../prisma";
import { Prisma, order } from "@prisma/client";



class ListOrderService {
    async execute(request: Request, response: Response) {

        try {

            const { id } = request.query

            const pedidos = await prismaClient.order.groupBy({
                by: ["id_product"],
                where: {
                    id_custumer: parseInt(id as string)
                },
                _count: {
                    id_product: true
                },

            })


            const produto = await prismaClient.product.findMany()


            const produtosComQuantidade = produto.map(produto => {
                const pedido = pedidos.find(qtd => qtd.id_product === produto.id);
                return {
                    ...produto,
                    amount: pedido ? pedido._count.id_product : 0
                };
            }).filter(produto => produto.amount !== 0);



            response.json(produtosComQuantidade)

        } catch (error) {
            console.log('Não foi possível listar os pedidos.')
        }
    }
}

export { ListOrderService }