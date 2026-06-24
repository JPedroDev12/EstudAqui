DROP DATABASE IF EXISTS EstudAqui;
CREATE DATABASE EstudAqui;
USE EstudAqui;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    cargo ENUM('Aluno', 'Professor', 'Administrador') DEFAULT 'Aluno',
    foto VARCHAR(255) DEFAULT NULL
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    modalidade ENUM('Presencial', 'Online') NOT NULL,
    descricao TEXT,
    capa VARCHAR(255) DEFAULT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (usuario_id)   REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id)   REFERENCES cursos(id)
);