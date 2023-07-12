import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Biblioteca from 'App/Models/Biblioteca'

export default class BibliotecasController {

    public async store({request, response}:HttpContextContract){

        const body = request.body()

        const biblioteca = await Biblioteca.create(body)

        response.status(201)
        return {
            message: "Biblioteca cadastrado com sucesso!",
            data: biblioteca,
        }
    }
    public async index(){
        const biblioteca = await Biblioteca.all()

        return{
            data: biblioteca,
        }
    }
    public async show({params}: HttpContextContract){

        const biblioteca = await Biblioteca.findOrFail(params.id)

        return{
            data: biblioteca,
        }
    }
    public async destroy({params}: HttpContextContract){

        const biblioteca = await Biblioteca.findOrFail(params.id)

        await biblioteca.delete()

        return{
            messege: "Deletado com sucesso",
            data: biblioteca,
        }
    }
    public async update({params, request}: HttpContextContract){

        const body = request.body()

        const biblioteca = await Biblioteca.findOrFail(params.id)

        biblioteca.title = body.title
        biblioteca.description = body.description

        await biblioteca.save()
        return{
            messege: "Atualizado com sucesso!",
            data: biblioteca,
        }
    }
    public async showLivros ({params}: HttpContextContract) {
        const biblioteca = await Biblioteca.findOrFail(params.id)
        await biblioteca.load('livros')
    
        return biblioteca
      }
}