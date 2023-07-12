import { v4 as uuidv4} from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'
import Biblioteca from 'App/Models/Biblioteca'

import  Application  from "@ioc:Adonis/Core/Application"

export default class LivrosController {
    private validationOptions = {
        type: ['image'],
        size: '2mb',
    }

    public async store({request, response}:HttpContextContract){
        
        const body = request.body()
        const copies = body.available_copies
        if(copies<=0){
            return {messege: 'Número de cópias inválido, insira ao menos um livro.'}
        }
        const library = await Biblioteca.find(body.library_id)
        if(!library){
            return{
                messege:'Biblioteca não cadastrada.'
            }
        }

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
    
    public async update({params, request}: HttpContextContract){

        const body = request.body()

        const livro = await Livro.findOrFail(params.id)

        livro.title = body.title
        livro.description = body.description

        if(livro.image != body.image || !livro.image){
            const image = request.file('image', this.validationOptions)

            if(image){
                const imageName = `${uuidv4()}.${image.extname}`
    
                await image.move(Application.tmpPath('uploads'), {
                    name: imageName,
                })
    
                livro.image = imageName
            }
        }
        await livro.save()
        return{
            messege: "Atualizado com sucesso!",
            data: livro,
        }
    }
}
