import { Request, Response } from 'express';
import { CreateCustomerService } from '../services/CreateCustumerService';


class CreateCustomerController {
    async handle(request: Request, response: Response) {

        try {
            const customerService = new CreateCustomerService();     
            const customer = await customerService.execute(request, response);

            response.send(customer);
        } catch (error) {
            // return response.status(200).json({error: 'Houve um problema ao cadastrar o cliente'});
        }
    }
}

export { CreateCustomerController };
