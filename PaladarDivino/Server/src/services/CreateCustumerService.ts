import prismaClient from '../prisma'
import { Response, Request } from 'express';


class CreateCustomerService {
    async execute(request: Request, response: Response) {

        try {

            const { name, lastname, email, password, confirmPassword } = request.body;

            if (!name || !lastname || !email || !password || !confirmPassword) {
                return response.status(400).json({ error: 'Todos os campos precisam ser preenchidos!' })
            }

            if (password.localeCompare(confirmPassword) !== 0) {
                return response.status(400).json({ error: 'As senhas precisam ser iguais!' })
            }


            const exist = await prismaClient.customer.findFirst({
                where: {
                    email: email
                }
            })


            if (exist) {
                return response.status(400).json({ error: 'Cliente já cadastrado!' })
            }


            const customer = await prismaClient.customer.create({
                data: {
                    name,
                    lastname,
                    email,
                    password
                }
            });

            return customer;

        } catch (error) {
            return response.status(400).json({ error: "Erro ao criar cliente: " });
        }
    }

}

export { CreateCustomerService }




