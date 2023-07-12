import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'
import Pessoa from 'App/Models/Pessoa'
import EmprestimoLivro from 'App/Models/EmprestimoLivro'

export default class EmprestimoLivrosController {
  public async store({ request, response }: HttpContextContract) {
  try {
    const { livroId, pessoaId } = request.body()

    const livro = await Livro.find(livroId)
    const pessoa = await Pessoa.find(pessoaId)
    if(!livro){
      return response.badRequest('Livro não cadastrado.')
    }
    if(!pessoa){
      return response.badRequest('Usuário não cadastrado.')
    }
    if (livro.available_copies <= 0) {
      return response.badRequest('O livro não está disponível para empréstimo.')
    }

    pessoa.book_id = livroId
    await pessoa.save()

    const emprestimoLivro = new EmprestimoLivro()
    emprestimoLivro.livroId = livroId
    emprestimoLivro.pessoaId = pessoaId

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

      const emprestimoLivro = await EmprestimoLivro.find(livroId)
      if(!emprestimoLivro){
        console.log(emprestimoLivro)
        return response.badRequest('O livro não encontra-se emprestado')
      }
      const emprestimoPessoa = await EmprestimoLivro.find(pessoaId)
      if(!emprestimoPessoa){
        return response.badRequest('Usuário não possui emprestimos de livros.')
      }

      const livro = await Livro.findOrFail(emprestimoLivro.livroId)

      livro.available_copies += 1
      await livro.save()

      return response.noContent()
    } catch (error) {
      return response.internalServerError('Erro ao retornar o livro.')
    }
  }
}