-- Active: 1680637690071@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
DROP Table users;
INSERT INTO users (id, name, email, password)
VALUES
("u001", "Andressa Fernandes", "andressa@mail.com", "andressa14"),
("u002", "Gabriel Boer", "biel@mail.com", "biel11"),
("u003", "Wellington Fernandes", "well@mail.com","well91" ),
("u004", "Antonio Pereira", "antonio@mail.com", "antonio65"),
("u005", "Sonia Maria", "sonia@mail.com", "sonia07");

SELECT * FROM users;

CREATE TABLE posts (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    creator_id TEXT NOT NULL,
    content TEXT,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    updated_at TEXT DEFAULT (DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
DROP TABLE posts;
SELECT * FROM posts;
INSERT INTO posts(id, creator_id, content)
VALUES
("p001", "u001", "Tudo que eu fizer
Eu vou tentar melhor do que já fiz
Esteja o meu destino onde estiver
Eu vou buscar a sorte e ser feliz"),
("p002", "u004", "De que me adianta viver na cidade
Se a felicidade não me acompanhar
Adeus paulistinha do meu coração
Lá pro meu sertão eu quero voltar
Ver a madrugada quando a passarada
Fazendo alvorada começa a cantar"),
("p003", "u001", "Apesar de você
Amanhã há de ser outro dia
Eu pergunto a você onde vai se esconder
Da enorme euforia
Como vai proibir
Quando o galo insistir
Em cantar
Água nova brotando
E a gente se amando sem parar"),
("p004", "u002", "Meu amor, disciplina é liberdade
Compaixão é fortaleza
Ter bondade é ter coragem"),
("p005", "u005", "Enquanto o tempo acelera e pede pressa
Eu me recuso faço hora vou na valsa
A vida tão rara");

CREATE TABLE likes_deslikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
DROP TABLE likes_deslikes;

INSERT INTO likes_deslikes (user_id, post_id, like)
VALUES
("u002", "p001", 1),
("u003", "p001", 1),
("u002", "p002", 1),
("u003", "p002", 1),
("u001", "p003", 1),
("u003", "p003", 0);

UPDATE posts
SET likes = 3
WHERE id = "p004";

CREATE TABLE comments (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT(0),
  dislikes INTEGER DEFAULT(0),
  created_at TEXT DEFAULT(DATETIME()),
  updated_at TEXT DEFAULT(DATETIME()),
  creator_id TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
SELECT * FROM comments;
INSERT INTO comments (id, post_id, content, creator_id) VALUES
  ("c001", "p001", "Teste comentário", "u001"),
  ("c002", "9f912868-cc2d-4af9-aa00-f0946ede240b", "Teste comentário2", "u005");

  CREATE TABLE likes_dislikes_comments (
  user_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE (user_id, comment_id, post_id)
);
