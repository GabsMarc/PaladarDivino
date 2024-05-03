import Express, { Request, Response } from 'express'
import { CreateCustomerController } from './controllers/CreateCustumerController';
import { LoginCustomerController } from './controllers/LoginCustomerController';
import { ListProductController } from './controllers/ListProductController';
import { CreateOrderController } from './controllers/CreateOrderController';
import { DeleteOrderController } from './controllers/DeleteOrderController';
import { ListOrderController } from './controllers/listOrderController';
import { AddProductImageController } from './controllers/AddProductImageController';
import path from 'path';



import uploadsConfig from "./config/multer";
import multer from 'multer';
import { GetPromoProductController } from './controllers/GetPromoProductController';


const router = Express.Router()

// const upload = multer(uploadsConfig);
const upload = multer({storage:multer.memoryStorage()});



router.get('/teste', (request: Request, response: Response) => {
    return console.log(response.send('Entrou no TESTE!'))
})


router.get('/login', async (request: Request, response: Response) => {
    return await new LoginCustomerController().handle(request, response);
})


router.get('/product', async (request: Request, response: Response) => {
    return await new ListProductController().handle(request, response)
})

router.get('/order', async (request: Request, response: Response) => {
    return await new ListOrderController().handle(request, response)
})

router.get('/promo', async (request: Request, response: Response) => {
    return await new GetPromoProductController().handle(request, response)
})










router.put('/ProductImage', upload.single('image'), async (request: Request, response: Response) => {
    return await new AddProductImageController().handle(request, response)
})









router.post('/register', async (request: Request, response: Response) => {
    return await new CreateCustomerController().handle(request, response);
})

router.post('/order', async (request: Request, response: Response) => {
    return await new CreateOrderController().handle(request, response)
})








router.delete('/deleteOrder', async (request: Request, response: Response) => {
    return await new DeleteOrderController().handle(request, response)
})


export { router }



