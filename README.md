<h1>Projeto Adonis TypeScript </h1>
<p>Este repositório contém um projeto em TypeScript para gerenciar bibliotecas, livros, empréstimos de livros e informações de pessoas. Nele é uma API RESTful desenvolvida em TypeScript, usando o framework Adonis.js. Ele oferece uma série de endpoints que seguem os princípios do HTTP para a comunicação entre sistemas. Os controllers, incluindo BibliotecasController, EmprestimoLivrosController, EmprestimoLivrosController, e PessoasController, definem operações como criação, listagem, visualização, atualização e exclusão de recursos, como bibliotecas, empréstimos de livros e informações de pessoas. Esses recursos podem ser acessados através de URLs e métodos HTTP, como GET, POST, PUT e DELETE. Isso torna o projeto altamente adequado para ser consumido por diferentes tipos de aplicativos, incluindo aplicativos da web e móveis, através de requisições HTTP. Em resumo, este é um projeto de API RESTful que facilita a interação e comunicação entre sistemas.
</p>

<div>
  <h2>BibliotecasController</h2>
    <p>O BibliotecasController é responsável por gerenciar as bibliotecas, permitindo a criação, listagem, visualização, atualização, exclusão, transferência de livros e exibição de         livros em uma biblioteca específica. Abaixo estão os principais métodos implementados neste controlador:
    </p>
  <ul>
    <li>Criação de uma Biblioteca</li>
    <p>Método: store <br>
      Descrição: Este método permite criar uma nova biblioteca.
    </p>
    <li>Listagem de Todas as Bibliotecas</li>
      <p>Método: index 
      Descrição: Este método lista todas as bibliotecas cadastradas. 
    </p>
    <li>Atualização de uma Biblioteca</li>
      <p>
        Método: update
        Descrição: Este método permite atualizar os detalhes de uma biblioteca.
      </p>
    <li>Exclusão de uma Biblioteca</li>
    <p>
      Método: destroy
      Descrição: Este método permite excluir uma biblioteca.
    </p>
    <li>Transferência de Livros para Outra Biblioteca</li>
    <p>
      Método: transferirLivro
      Descrição: Este método permite transferir livros de uma biblioteca para outra.
    </p>
    <li>Exibição de Livros em uma Biblioteca</li>
    <p>Método: showLivros
    Descrição: Este método exibe todos os livros disponíveis em uma biblioteca.</p>
  </ul>
</div>

<div>
  <h2>EmprestimoLivrosController</h2>
  <p>
    O EmprestimoLivrosController é responsável por gerenciar o empréstimo e devolução de livros. Abaixo estão os principais métodos implementados neste controlador:
  </p>
  <ul>
    <li>Criação de Empréstimo de Livro</li>
    <p>
      Método: store
      Descrição: Este método permite criar um novo empréstimo de livro.
    </p>
    <li>Devolução de Livro</li>
    <p>
      Método: update
      Descrição: Este método permite que um livro seja devolvido.
    </p>
  </ul>
</div>

<div>
  <h2>PessoasController</h2>
  <p>
    O PessoasController é responsável por gerenciar informações de pessoas, permitindo a criação, listagem, visualização, atualização e exclusão de informações de pessoas. Além disso, ele permite o upload de imagens de perfil para as pessoas. Abaixo estão os principais métodos implementados neste controlador:
  </p>
  <ul>
    <li>Criação de Informações de Pessoa</li>
    <p>
      Método: store
      Descrição: Este método permite criar informações de uma nova pessoa, incluindo o upload de uma imagem de perfil.
    </p>
    <li>Listagem de Todas as Informações de Pessoas</li>
    <p>
      Método: index
      Descrição: Este método lista todas as informações de pessoas cadastradas.
    </p>
    <li>Visualização de Informações de Pessoa</li>
    <p>
      Método: show
      Descrição: Este método permite visualizar os detalhes das informações de uma pessoa específica.
    </p>
    <li>Atualização de Informações de Pessoa</li>
    <p>
      Método: update
      Descrição: Este método permite atualizar as informações de uma pessoa, incluindo o upload de uma nova imagem de perfil.
    </p>
    <li>Exclusão de Informações de Pessoa</li>
    <p>
      Método: destroy
      Descrição: Este método permite excluir as informações de uma pessoa, incluindo a imagem de perfil associada.
    </p>
  </ul>
</div>
