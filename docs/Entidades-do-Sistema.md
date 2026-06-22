# Entidades do Sistema

## Usuários

A entidade usuários serve para armazenar os dados de acesso das pessoas que utilizam o sistema. Nela ficam informações como e-mail, senha, cargo e foto de perfil.

Campos:
- id (INT): identificador do usuário.
- email (VARCHAR(100)): e-mail usado para login.
- senha (VARCHAR(100)): senha do usuário.
- cargo (ENUM): pode ser Aluno, Professor ou Administrador.
- foto (VARCHAR(255)): foto de perfil do usuário.

## Categorias

A entidade categorias serve para organizar os cursos por áreas de conhecimento.

Campos:
- id (INT): identificador da categoria.
- nome (VARCHAR(100)): nome da categoria.

## Cursos

A entidade cursos armazena as informações dos cursos cadastrados pelos professores.

Campos:
- id (INT): identificador do curso.
- usuario_id (INT): professor responsável pelo curso.
- categoria_id (INT): categoria do curso.
- nome (VARCHAR(100)): nome do curso.
- modalidade (ENUM): presencial ou online.
- descricao (TEXT): descrição do curso.
- capa (VARCHAR(255)): imagem de capa do curso.

## Matrículas

A entidade matrículas registra os usuários inscritos nos cursos.

Campos:
- id (INT): identificador da matrícula.
- usuario_id (INT): usuário matriculado.
- curso_id (INT): curso em que o usuário está matriculado.
- data_matricula (TIMESTAMP): data da matrícula.

# Relacionamentos

- Categorias e Cursos: uma categoria pode ter vários cursos, mas um curso pertence a apenas uma categoria (1:N).

- Usuários e Cursos: um professor pode cadastrar vários cursos, mas um curso pertence a apenas um professor (1:N).

- Usuários e Matrículas: um usuário pode realizar várias matrículas (1:N).

- Cursos e Matrículas: um curso pode possuir várias matrículas (1:N).

- Usuários e Cursos: um usuário pode estar matriculado em vários cursos e um curso pode ter vários usuários matriculados. Esse relacionamento acontece através da tabela Matrículas (N:N).


