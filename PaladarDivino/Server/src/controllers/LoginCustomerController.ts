import { Request, Response } from 'express-serve-static-core';
import { LoginCustomerService } from '../services/LoginCustomerService';

class LoginCustomerController {
    async handle(request: Request, response: Response) {

        const email = request.query.email
        const password = request.query.password
        

        if (!email || !password) {
            response.status(400).json({ error: 'Todos os campos precisam ser preenchidos!' });
        }

        try {
            const loginCustomerService = new LoginCustomerService()
            const customer = await loginCustomerService.searchCustomer(request, response)
         
            response.send(customer)

        } catch (error) {
            // response.send(error)
        }
    }
}

export { LoginCustomerController }