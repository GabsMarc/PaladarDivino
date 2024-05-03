import express from 'express'
import cors from 'cors'
import { router } from './routes'
import path from 'path'


const app = express()


app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, "..", "uploads")))

app.use(router)


app.listen(8080, () => {
    console.log(`O servidor está rodando na porta 8080`)
})



