import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'
import Pessoa from 'App/Models/Pessoa'
import EmprestimoLivro from 'App/Models/EmprestimoLivro'

export default class EmprestimoLivrosController {
  public async store({ request, response }: HttpContextContract) {
  try {
    const { livroId, pessoaId } = request.body()

    const livro = await Livro.findOrFail(livroId)
    const pessoa = await Pessoa.find(pessoaId)
    
    console.log(livro)
    if (livro.available_copies <= 0) {
      return response.badRequest('O livro não está disponível para empréstimo.')
    }

    const emprestimoLivro = new EmprestimoLivro()
    emprestimoLivro.livroID = livroId
    emprestimoLivro.pessoaID = pessoaId

    await emprestimoLivro.save()

    livro.available_copies = livro.available_copies - 1

    await livro.save()

    return response.created(emprestimoLivro)
  } catch (error) {
    console.log(error.message)
    return response.internalServerError('Erro ao criar o empréstimo de livro.')
  }
}


  public async update({ params, response }: HttpContextContract) {
    try {
      const { livroId, pessoaId } = params

      const emprestimoLivro = await EmprestimoLivro.findOrFail(livroId)

      const livro = await Livro.findOrFail(emprestimoLivro.livroID)
      livro.available_copies += 1
      await livro.save()

      return response.noContent()
    } catch (error) {
      return response.internalServerError('Erro ao retornar o livro.')
    }
  }
}