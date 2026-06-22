# Rotas Planejadas da API

## Endpoints da API

### POST /api/usuarios
- **Objetivo:** Cadastro de usuário  
- **Tela que usa:** `cadastro.html`  
- **Corpo:** `nome, email, senha`

### POST /api/login
- **Objetivo:** Autenticação do usuário  
- **Tela que usa:** `login.html`  
- **Corpo:** `email, senha`

### GET /api/cursos
- **Objetivo:** Listar todos os cursos  
- **Tela que usa:** `cursos.html`  
- **Corpo:** —

### GET /api/cursos/{id}
- **Objetivo:** Buscar detalhes de um curso  
- **Tela que usa:** `curso.html`  
- **Corpo:** —

### GET /api/categorias
- **Objetivo:** Listar categorias  
- **Tela que usa:** `cursos.html`  
- **Corpo:** —

### POST /api/inscricoes
- **Objetivo:** Realizar inscrição em um curso  
- **Tela que usa:** `curso.html`  
- **Corpo:** `usuario_id, curso_id`

### GET /api/usuarios/{id}/inscricoes
- **Objetivo:** Listar cursos inscritos pelo usuário  
- **Tela que usa:** `perfil.html` (caso exista)  
- **Corpo:** —
