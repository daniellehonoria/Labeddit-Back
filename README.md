# Labeddit- Backend

Banco de dados da rede social Labeddit. <br/>
O Labeddit é uma rede social com o objetivo de promover a conexão e interação entre pessoas.  <br/>
Quem se cadastrar no aplicativo poderá criar e curtir publicações. <br/>

## FrontEnd
### :link: [Repositório Front]("https://github.com/daniellehonoria/Labeddit-Front")

## :link: Índice
- <a href="#funcionalidades">Funcionalidades do projeto</a>
- <a href="#tecnologias">Tecnologias utilizadas</a>
- <a href="#endpoints">Endpoints e performance</a>
- <a href="#documentacao">Documentação</a>
- <a href="#deploy">Deploy</a>

### :gear: Funcionalidades do projeto

  - [x] Login do usuário cadastrado
  - [x] Criação de novos posts
  - [x] Edição de posts pelo id do post e token do usuário
  - [x] Deleção do post pelo id do post e token do usuário
  - [x] Curtir e comentar posts de outros usuários
  - [x] Curtir e comentários de outros usuários
  - [x] Descurtir posts e comentários de outros usuários

### :hammer_and_wrench: Tecnologias utilizadas

- Typescript
- Express
- Node
- SQL
- SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento

### :chains: Endpoints e performance

  1. Signup -  para cadastrar usuário:
    - name
    - e-mail
    - password
   
2. Login:
  - e-mail
  - password
  
3. Get all posts - busca todos os posts dos usuários da rede:
  - id
  - content
  - likes
  - dislikes
  - createdAt
  - updatedAt
  - creator
  
4. Edit post- edita texto do post a partir de seu id e do token do usuário:
- content

5. Delete post - Deleta post a partir de seu id e do token do usuário

6. Like or Dislike Post

### :link: [Documentação](https://documenter.getpostman.com/view/24460604/2s93Xu3kwW)
### :link: [Deploy](https://labeddit-back.onrender.com)






