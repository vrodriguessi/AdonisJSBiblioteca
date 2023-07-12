import { v4 as uuidv4} from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from 'App/Models/Pessoa'
import  Application  from "@ioc:Adonis/Core/Application"

export default class PessoasController {
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
        const pessoa = await Pessoa.create(body)
        response.status(201)
        return {
            message: "Usuário cadastrado com sucesso!",
            data: pessoa,
        }
    }
    public async index(){
        const pessoa = await Pessoa.all()

        return{
            data: pessoa,
        }
    }
    public async show({params}: HttpContextContract){

        const pessoa = await Pessoa.findOrFail(params.id)

        return{
            data: pessoa,
        }
    }
    public async destroy({params}: HttpContextContract){

        const pessoa = await Pessoa.findOrFail(params.id)

        await pessoa.delete()

        return{
            messege: "Deletado com sucesso",
            data: pessoa,
        }
    }
    public async update({params, request}: HttpContextContract){

        const body = request.body()

        const pessoa = await Pessoa.findOrFail(params.id)

        pessoa.title = body.title
        pessoa.description = body.description

        if(pessoa.image != body.image || !pessoa.image){
            const image = request.file('image', this.validationOptions)

            if(image){
                const imageName = `${uuidv4()}.${image.extname}`
    
                await image.move(Application.tmpPath('uploads'), {
                    name: imageName,
                })
    
                pessoa.image = imageName
            }
        }
        await pessoa.save()
        return{
            messege: "Atualizado com sucesso!",
            data: pessoa,
        }
    }
}