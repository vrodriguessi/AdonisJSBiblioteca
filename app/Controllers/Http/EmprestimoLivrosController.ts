import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'
import EmprestimoLivro from 'App/Models/EmprestimoLivro'

export default class EmprestimoLivrosController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { livroId, pessoaId } = request.body()

      const livro = await Livro.findOrFail(livroId)
      if (livro.availableCopies <= 0) {
        return response.badRequest('O livro não está disponível para empréstimo.')
      }

      const emprestimoLivro = new EmprestimoLivro()
      emprestimoLivro.livroID = livroId
      emprestimoLivro.pessoaID = pessoaId

      await emprestimoLivro.save()

      livro.availableCopies -= 1
      await livro.save()

      return response.created(emprestimoLivro)
    } catch (error) {
      console.log(error)
      return response.internalServerError('Erro ao criar o empréstimo de livro.')
    }
  }

  public async update({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      const emprestimoLivro = await EmprestimoLivro.findOrFail(id)

      const livro = await Livro.findOrFail(emprestimoLivro.livroID)
      livro.availableCopies += 1
      await livro.save()

      await emprestimoLivro.delete()

      return response.noContent()
    } catch (error) {
      return response.internalServerError('Erro ao retornar o livro.')
    }
  }
}
