import { v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Livro from 'App/Models/Livro'

import  Application  from "@ioc:Adonis/Core/Application"

export default class LivrosController {
    private validationOptions = {
        type: ['image'],
        size: '2mb',
    }

    public async store({request, response}:HttpContextContract){
        
        const body = request.body()

        const image = request.file('image', this.validationOptions)

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName,
            })

            body.image = imageName

        }

        const livro = await Livro.create(body)

        response.status(201)
        return {
            message: "Livro cadastrado com sucesso!",
            data: livro,
        }
    }

    public async index(){
        const livro = await Livro.all()

        return{
            data: livro,
        }
    }

    public async show({params}: HttpContextContract){

        const livro = await Livro.findOrFail(params.id)

        return{
            data: livro,
        }
    }

    public async destroy({params}: HttpContextContract){

        const livro = await Livro.findOrFail(params.id)

        await livro.delete()

        return{
            messege: "Deletado com sucesso",
            data: livro,
        }
    }
}
