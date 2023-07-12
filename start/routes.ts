import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource("/livros", "LivrosController").apiOnly()
  Route.resource("/bibliotecas", "BibliotecasController").apiOnly()
  Route.get('/bibliotecas/:id/livros', 'BibliotecasController.showLivros')
  Route.post('/bibliotecas/:id/transferir-livro', 'BibliotecasController.transferirLivro')
  Route.resource("/pessoas", "PessoasController").apiOnly()
  Route.get('/pessoas/:id/livros', 'PessoasController.showLivros')

}).prefix('/api')

Route.group(() => {
  Route.post('/pessoas/:pessoaId/emprestimo_livros', 'EmprestimoLivrosController.store')
  Route.patch('/pessoas/:pessoa_id/livros/:livro_id/emprestimo_livros', 'EmprestimoLivrosController.update')
}).prefix('api/v1')