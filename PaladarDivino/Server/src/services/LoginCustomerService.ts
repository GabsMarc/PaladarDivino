import { Request, Response } from 'express';
import prismaClient from '../prisma';
import { Prisma } from '@prisma/client';

class LoginCustomerService {

    async searchCustomer(request: Request, response: Response) {

        const { email, password } = request.query

        try {
            const customerEmail = await prismaClient.customer.findFirst({
                where: {
                    email: email
                } as Prisma.customerWhereUniqueInput
            })

            if (!customerEmail) {
                response.status(404).json({ error: 'Não existe um registro com esse email.' });
            }

        } catch {
            // response.status(400).json({ error: 'Erro ao encontrar o cliente' });
        }


        try {
            const login = await prismaClient.customer.findFirst({
                where: {
                    email: email,
                    password: password
                } as Prisma.customerWhereUniqueInput
            })

            if (!login) {
                response.status(404).json({ error: 'Senha incorreta!' });
            }

            response.send({
                id: login.id,
                name: login.name,
                lastname: login.lastname,
                admin: login.admin
            })

        } catch {
            
        }

    }
}

export { LoginCustomerService }