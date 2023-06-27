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

}
