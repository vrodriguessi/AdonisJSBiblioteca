import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'
import Pessoa from 'App/Models/Pessoa'
import EmprestimoLivro from 'App/Models/EmprestimoLivro'

export default class EmprestimoLivrosController {
  public async store({ request, response }: HttpContextContract) {
  try {
    const { livro_id, pessoa_id } = request.body()

    const livro = await Livro.find(livro_id)
    const pessoa = await Pessoa.find(pessoa_id)
    if(!livro){
      return response.badRequest('Livro não cadastrado.')
    }
    if(!pessoa){
      return response.badRequest('Usuário não cadastrado.')
    }
    if (livro.available_copies <= 0) {
      return response.badRequest('O livro não está disponível para empréstimo.')
    }

    pessoa.book_id = livro_id
    await pessoa.save()

    const emprestimoLivro = new EmprestimoLivro()
    emprestimoLivro.livro_id = livro_id
    emprestimoLivro.pessoa_id = pessoa_id

    await emprestimoLivro.save()

    livro.available_copies = livro.available_copies - 1

    await livro.save()

    return response.created(emprestimoLivro)
  } catch (error) {
    return response.internalServerError('Erro ao criar o empréstimo de livro.')
  }
}

  public async update({ params, response }: HttpContextContract) {
    try {
      const { livro_id, pessoa_id } = params

      const emprestimoDoLivro = await EmprestimoLivro.query().where('livro_id', livro_id).first()
      if(!emprestimoDoLivro){
        return response.badRequest('O livro não encontra-se emprestado')
      }
      const emprestimoPessoa = await EmprestimoLivro.find(pessoa_id)
      if(!emprestimoPessoa){
        return response.badRequest('Usuário não possui emprestimos de livros.')
      }

      const livro = await Livro.findOrFail(emprestimoDoLivro.livro_id)

      livro.available_copies += 1
      await livro.save()

      return response.noContent()
    } catch (error) {
      return response.internalServerError('Erro ao retornar o livro.')
    }
  }
}