import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Pessoa from 'App/Models/Pessoa'

export default class PessoasController {

    public async store({request, response}:HttpContextContract){
        
        const body = request.body()

        const pessoa = await Pessoa.create(body)

        response.status(201)
        return {
            message: "Usuário cadastrado com sucesso!",
            data: pessoa,
        }
    }
}