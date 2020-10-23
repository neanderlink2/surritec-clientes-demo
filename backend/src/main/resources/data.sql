-- drop table if exists tb_endereco_cliente;
-- drop table if exists tb_telefone_cliente;
-- drop table if exists tb_email_cliente;
-- drop table if exists tb_clientes;

CREATE TABLE if not exists tb_roles (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  description varchar(255) DEFAULT NULL,
  role varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE if not exists tb_usuarios (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  primeiro_nome varchar(255) NOT NULL,
  ultimo_nome varchar(255) NOT NULL,
  senha varchar(255) NOT NULL,
  nome_usuario varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE if not exists tb_role_usuario (
  id_usuario bigint(20) NOT NULL,
  id_role bigint(20) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id),
  FOREIGN KEY (id_role) REFERENCES tb_roles(id)
);

create table if not exists tb_clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(250) NOT NULL
);

create table if not exists tb_email_cliente(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    email VARCHAR(250) NOT NULL,    
    foreign key (id_cliente) references tb_clientes(id)
);

-- alter table tb_email_cliente 
--     add primary key (id_cliente, email);

create table if not exists tb_telefone_cliente(    
    id_cliente BIGINT NOT NULL,
    telefone VARCHAR(20) NOT NULL,   
    tipo_telefone VARCHAR(20) NOT NULL,
    primary key (id_cliente, telefone),
    foreign key (id_cliente) references tb_clientes(id)
);

-- alter table tb_telefone_cliente 
--     add primary key (id_cliente, telefone);

create table if not exists tb_endereco_cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(300) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(120) NOT NULL,
    uf VARCHAR(50) NOT NULL,
    complemento VARCHAR(250) NOT NULL,
    foreign key (id_cliente) references tb_clientes(id)
);